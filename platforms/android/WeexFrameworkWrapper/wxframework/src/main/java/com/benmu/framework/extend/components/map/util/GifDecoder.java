package com.benmu.framework.extend.components.map.util;

/**
 * Created by budao on 2017/2/10.
 */


import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class GifDecoder {
  private static final String TAG = GifDecoder.class.getSimpleName();
  private final GifDecoder self = this;

  // File read status: No errors.
  public static final int STATUS_OK = 0;
  // File read status: Error decoding file (may be partially decoded)
  public static final int STATUS_FORMAT_ERROR = 1;
  // File read status: Unable to open source.
  public static final int STATUS_OPEN_ERROR = 2;
  // Trailer
  private static final byte TRR_CODE = (byte) 0x3B;
  // Image Block
  private static final byte IMG_CODE = (byte) 0x2C;
  // Extension
  private static final byte EXT_CODE = (byte) 0x21;
  // Graphic Control Extension
  private static final byte GC_EXT = (byte) 0xF9;
  // Application Extension
  private static final byte APP_EXT = (byte) 0xFF;
  // Comment Extension
  private static final byte CMT_EXT = (byte) 0xFE;
  // Plain Text Extension
  private static final byte TXT_EXT = (byte) 0x01;

  private static final int MIN_DELAY = 100;
  private static final int MIN_DELAY_ENFORCE_THRESHOLD = 20;

  protected int mStatus;
  protected int mWidth; // full mCurrentImage mWidth
  protected int mHeight; // full mCurrentImage mHeight
  protected Bitmap mCurrentImage; // current frame
  protected Bitmap mLastImage; // previous frame
  protected int mDispose = 0; // 0=no action; 1=leave in place; 2=restore to bg; 3=restore to prev
  protected int mLastDispose = 0;
  protected int mDelay = 0; // mDelay in milliseconds
  protected ArrayList<GifFrame> mGifFrames; // mGifFrames read from current file
  protected int mFrameCount;

  private int mOffset = 0;

  private GifHeader mGifHeader;
  private GraphicControlExtension mGcExt;
  private ImageBlock mImageBlock;

  private static class GifFrame {
    public GifFrame(Bitmap im, int del) {
      image = im;
      delay = del;
    }

    public Bitmap image;
    public int delay;
  }

  /**
   * Gets display duration for specified frame.
   *
   * @param n int index of frame
   * @return delay in milliseconds
   */
  public int getDelay(int n) {
    mDelay = -1;
    if ((n >= 0) && (n < mFrameCount)) {
      mDelay = mGifFrames.get(n).delay;
      if (mDelay < MIN_DELAY_ENFORCE_THRESHOLD) {
        mDelay = MIN_DELAY;
      }
    }
    return mDelay;
  }

  /**
   * Gets the number of GifFrames read from file.
   *
   * @return frame count
   */
  public int getFrameCount() {
    return mFrameCount;
  }

  /**
   * Gets the first (or only) image read.
   *
   * @return BufferedBitmap containing first frame, or null if none.
   */
  public Bitmap getBitmap() {
    return getFrame(0);
  }

  /**
   * Gets the image contents of frame n.
   *
   * @return BufferedBitmap representation of frame, or null if n is invalid.
   */
  public Bitmap getFrame(int n) {
    if (mFrameCount <= 0)
      return null;
    n = n % mFrameCount;
    return (mGifFrames.get(n)).image;
  }

  /**
   * Reads GIF image from stream
   *
   * @param is containing GIF file.
   * @return read status code (0 = no errors)
   */

  public int read(InputStream is) throws IOException {
    init();
    if (is != null) {
      byte[] buffer = streamToBytes(is);
      mGifHeader = new GifHeader(buffer, mOffset);
      mOffset += mGifHeader.size;
      mWidth = mGifHeader.getWidth();
      mHeight = mGifHeader.getHeight();
      if (!mGifHeader.getSignature().equals("GIF")) {
        return STATUS_FORMAT_ERROR;
      }
      while (buffer[mOffset] != TRR_CODE) {
        if (buffer[mOffset] == IMG_CODE) {
          // ImageBlock
          mImageBlock = new ImageBlock(buffer, mOffset);
          mOffset += mImageBlock.size;

          mFrameCount++;
          // create new image to receive frame data
          mCurrentImage = extractImage();
          if (mLastDispose > 0) {
            if (mLastDispose == 3) {
              // use image before last
              int n = mFrameCount - 2;
              if (n > 0) {
                mLastImage = getFrame(n - 1);
              } else {
                mLastImage = null;
              }
            }
          }
          mGifFrames.add(new GifFrame(mCurrentImage, mDelay)); // add image to frame
          resetFrame();
        } else if (buffer[mOffset] == EXT_CODE) {
          if (buffer[mOffset + 1] == GC_EXT) {
            //GraphicControlExtension
            mGcExt = new GraphicControlExtension(buffer, mOffset);
            mOffset += mGcExt.size;
            mDispose = mGcExt.getDisposalMothod(); // disposal method
            if (mDispose == 0) {
              mDispose = 1; // elect to keep old image if discretionary
            }
            mDelay = mGcExt.getDelayTime() * 10; // delay in milliseconds
          } else if (buffer[mOffset + 1] == APP_EXT) {
            //ApplicationExtension
            ApplicationExtension appExt = new ApplicationExtension(buffer, mOffset);
            mOffset += appExt.size;
          } else if (buffer[mOffset + 1] == CMT_EXT) {
            //CommentExtension
            CommentExtension cmtExt = new CommentExtension(buffer, mOffset);
            mOffset += cmtExt.size;
          } else if (buffer[mOffset + 1] == TXT_EXT) {
            //PlainTextExtension
            PlainTextExtension txtExt = new PlainTextExtension(buffer, mOffset);
            mOffset += txtExt.size;
          } else {
            throw new IOException();
          }
        } else {
          throw new IOException();
        }
      }
    } else {
      mStatus = STATUS_OPEN_ERROR;
    }
    return mStatus;
  }

  /**
   * Initializes or re-initializes reader
   */
  protected void init() {
    mStatus = STATUS_OK;
    mFrameCount = 0;
    mGifFrames = new ArrayList<GifFrame>();
  }

  /**
   * Resets frame state for reading next image.
   */
  protected void resetFrame() {
    mLastDispose = mDispose;
    mLastImage = mCurrentImage;
    mDispose = 0;
    mDelay = 0;
  }

  /**
   * Extract new image
   *
   * @return image
   */
  private Bitmap extractImage() {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    try {
      outputStream.write(mGifHeader.bytes);
      if (mGcExt != null) {
        if ((mWidth != mImageBlock.getImageWidth() || mHeight != mImageBlock.getImageHeight()) &&
            mGcExt.getTransparentColorFlag() == 0) {
          mGcExt.setTransparentColorFlagTrue();
        }
        outputStream.write(mGcExt.bytes);
      }
      outputStream.write(mImageBlock.bytes);
      outputStream.write((byte) 0x3B);
      outputStream.flush();

      BitmapFactory.Options options = new BitmapFactory.Options();
      options.inMutable = true;
      options.inPreferredConfig = Bitmap.Config.ARGB_8888;
      Bitmap newBitmap = BitmapFactory.decodeStream(new BufferedInputStream(new ByteArrayInputStream(outputStream.toByteArray())));
      if (newBitmap != null) {
        if (mLastImage == null) {
          return newBitmap;
        } else {
          Bitmap bitmap = Bitmap.createBitmap(mWidth, mHeight, Bitmap.Config.ARGB_8888);
          Canvas canvas = new Canvas(bitmap);
          canvas.drawBitmap(mLastImage, 0, 0, null);
          canvas.drawBitmap(newBitmap, 0, 0, null);
          return bitmap;
        }
      } else {
        if (mLastImage != null) {
          return mLastImage;
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        outputStream.close();
      } catch (IOException e) {
        e.printStackTrace();
      }

    }
    return null;
  }

  private class GifHeader {
    public byte[] bytes;
    public int size;

    public GifHeader(byte[] bytes, int offset) {
      boolean globalColorTableFlag = (bytes[offset + 0x0A] & 0x80) != 0x00;
      int globalColorTableSize = (bytes[offset + 0x0A] & 0x07);

      // get size
      size = 0x0D;
      if (globalColorTableFlag) {
        size += Math.pow(2, (globalColorTableSize + 1)) * 3;
      }

      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }

    public String getSignature() {
      return new String(bytes, 0, 3);
    }

    public String getVersion() {
      return new String(bytes, 3, 3);
    }

    public int getWidth() {
      return (bytes[6] & 0xFF) + ((bytes[7] & 0xFF) << 8);
    }

    public int getHeight() {
      return (bytes[8] & 0xFF) + ((bytes[9] & 0xFF) << 8);
    }

    public int getGlobalColorTableFlag() {
      return (bytes[10] & 0x80) >> 7;
    }

    public int getColorResolution() {
      return (bytes[10] & 0x70) >> 4;
    }

    public int getSortFlag() {
      return (bytes[10] & 0x08) >> 3;
    }

    public int getSizeOfGlobalColorTable() {
      return (bytes[10] & 0x07);
    }

    public int getBackgroundColorIndex() {
      return bytes[11] & 0xFF;
    }

    public int getPixelAspectRatio() {
      return bytes[12];
    }

    public int[] getGlobalColorTable() {
      if (getGlobalColorTableFlag() == 0) {
        return new int[0];
      }
      int[] colors = new int[(int) Math.pow(2, getSizeOfGlobalColorTable() + 1)];
      for (int i = 0; i < colors.length; i++) {
        colors[i] = ((bytes[13 + (i * 3)] & 0xFF) << 16) + ((bytes[13 + (i * 3) + 1] & 0xFF) << 8) + (bytes[13 + (i * 3) + 2] & 0xFF);
      }
      return colors;
    }
  }

  private class ImageBlock {
    public byte[] bytes;
    public int size;

    public ImageBlock(byte[] bytes, int offset) {
      int blockSize;
      boolean localColorTableFlag = (bytes[offset + 0x09] & 0x80) != 0x00;
      int localColorTableSize = (bytes[offset + 0x09] & 0x07);

      //get size
      size = 0x0A;
      if (localColorTableFlag) {
        size += Math.pow(2, (localColorTableSize + 1)) * 3;
      }
      size += 1; //LZW Minimum Code Size

      //ImageData
      blockSize = bytes[offset + size] & 0xFF;
      size += 1;
      while (blockSize != 0x00) {
        size += blockSize;
        blockSize = bytes[offset + size] & 0xFF;
        size += 1;
      }

      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }

    public int getImageSeparator() {
      return bytes[0] & 0xFF;
    }

    public int ImageLeftPosition() {
      return (bytes[1] & 0xFF) + ((bytes[2] & 0xFF) << 8);
    }

    public int getImageTopPosition() {
      return (bytes[3] & 0xFF) + ((bytes[4] & 0xFF) << 8);
    }

    public int getImageWidth() {
      return (bytes[5] & 0xFF) + ((bytes[6] & 0xFF) << 8);
    }

    public int getImageHeight() {
      return (bytes[7] & 0xFF) + ((bytes[8] & 0xFF) << 8);
    }

    public int getLocalColorTableFlag() {
      return (bytes[9] & 0x80) >> 7;
    }

    public int getInterlaceFlag() {
      return (bytes[9] & 0x40) >> 6;
    }

    public int getSortFlag() {
      return (bytes[9] & 0x20) >> 5;
    }

    public int getReserved() {
      return (bytes[9] & 0x18) >> 2;
    }

    public int getSizeOfLocalColorTable() {
      return bytes[9] & 0x03;
    }

    public int[] getLocalColorTable() {
      if (getLocalColorTableFlag() == 0) {
        return new int[0];
      }
      int[] colors = new int[(int) Math.pow(2, getSizeOfLocalColorTable() + 1)];
      for (int i = 0; i < colors.length; i++) {
        colors[i] = ((bytes[10 + (i * 3)] & 0xFF) << 16) + ((bytes[10 + (i * 3) + 1] & 0xFF) << 8) + (bytes[10 + (i * 3) + 2] & 0xFF);
      }
      return colors;
    }

    public int getLZWMinimumCodeSize() {
      if (getLocalColorTableFlag() == 0) {
        return bytes[10] & 0xFF;
      } else {
        return bytes[10 + (int) Math.pow(2, getSizeOfLocalColorTable() + 1) * 3] & 0xFF;
      }
    }
  }

  private class ApplicationExtension {
    public byte[] bytes;
    public int size;

    public ApplicationExtension(byte[] bytes, int offset) {
      int blockSize;
      // get size
      size = 0x0E;

      blockSize = bytes[offset + size] & 0xFF;
      size += 1;
      while (blockSize != 0x00) {
        size += blockSize;
        blockSize = bytes[offset + size] & 0xFF;
        size += 1;
      }

      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }

    public int getExtensionIntroducer() {
      return bytes[0] & 0xFF;
    }

    public int getExtensionLabel() {
      return bytes[1] & 0xFF;
    }

    public int getBlockSize1() {
      return bytes[2] & 0xFF;
    }

    public String getApplicationIdentifier() {
      return new String(bytes, 3, 8);
    }

    public String getApplicationAuthenticationCode() {
      return new String(bytes, 11, 3);
    }
  }

  private class GraphicControlExtension {
    public byte[] bytes;
    public int size;

    public GraphicControlExtension(byte[] bytes, int offset) {
      size = 8;
      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }

    public int getExtensionIntroducer() {
      return bytes[0] & 0xFF;
    }

    public int getGraphicControlLabel() {
      return bytes[1] & 0xFF;
    }

    public int getBlockSize() {
      return bytes[2] & 0xFF;
    }

    public int getReserved() {
      return (bytes[3] & 0xE0) >> 5;
    }

    public int getDisposalMothod() {
      return (bytes[3] & 0x1C) >> 2;
    }

    public int getUserInputFlag() {
      return (bytes[3] & 0x02) >> 1;
    }

    public int getTransparentColorFlag() {
      return (bytes[3] & 0x01);
    }

    public int getDelayTime() {
      return (bytes[4] & 0xFF) + ((bytes[5] & 0xFF) << 8);
    }

    public int getTransparentColorIndex() {
      return bytes[6];
    }

    public void setTransparentColorFlagTrue() {
      int value = getReserved() | getDisposalMothod() | getUserInputFlag() | 0x01;
      bytes[3] = (byte) Integer.parseInt(toHex(value, 2), 16);
    }
  }

  private class CommentExtension {
    public byte[] bytes;
    public int size;

    public CommentExtension(byte[] bytes, int offset) {
      int blockSize;
      // get size
      size = 0x02;

      blockSize = bytes[offset + size] & 0xFF;
      size += 1;
      while (blockSize != 0x00) {
        size += blockSize;
        blockSize = bytes[offset + size] & 0xFF;
        size += 1;
      }

      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }
  }

  private class PlainTextExtension {
    public byte[] bytes;
    public int size;

    public PlainTextExtension(byte[] bytes, int offset) {
      int blockSize;
      // get size
      size = 0x0F;

      blockSize = bytes[offset + size] & 0xFF;
      size += 1;
      while (blockSize != 0x00) {
        size += blockSize;
        blockSize = bytes[offset + size] & 0xFF;
        size += 1;
      }

      this.bytes = new byte[size];
      System.arraycopy(bytes, offset, this.bytes, 0, size);
    }
  }

  public static String toHex(int value, int length) {
    String hex = Integer.toHexString(value);
    hex = hex.toUpperCase();

    if (hex.length() < length) {
      while (hex.length() < length)
        hex = "0" + hex;
    } else if (hex.length() > length) {
      hex = hex.substring(hex.length() - length);
    }
    return hex;
  }

  public static byte[] streamToBytes(InputStream stream) throws IOException,
      OutOfMemoryError {
    byte[] buff = new byte[1024];
    int read;
    ByteArrayOutputStream bao = new ByteArrayOutputStream();
    while ((read = stream.read(buff)) != -1) {
      bao.write(buff, 0, read);
    }
    try {
      stream.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
    return bao.toByteArray();
  }
}

