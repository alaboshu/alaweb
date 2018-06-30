package com.benmu.widget.view;

import android.content.Context;
import android.content.res.Resources;
import android.content.res.TypedArray;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

import com.benmu.R;
import com.benmu.widget.utils.BaseCommonUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * seekBar like wechat fontsizeSelector Created by Carry on 2017/6/30.
 */

public class BMSimpleSeekBar extends View {
    private int mHeight;
    private int mWidth;
    private Paint mLinePaint;
    private Paint mTextPaint;
    private int mPaintWidth = 2;
    //距两边的距离
    private int mMargenLine = 30;
    //小球半径
    private int mSeekBarRadius = 60;
    //刻度数
    private int mMarkCount = 5;

    private float[] markers;

    private int distanceX;

    private int mMarkHeight = 20;

    private int mTextMargin = 100;

    private List<Marker> markerList;

    private Context mContext;

    private int mSeekBarId;

    private float mDesigenRaduis;

    private Bitmap mSeekBar;

    private int mCurrentSeekBarPosition;

    private boolean mFollow;

    private float mSeekBarOffset;

    private int mPreviousPosition;

    private OnPositionChangedListener mListener;


    public BMSimpleSeekBar(Context context) {
        this(context, null);
    }

    public BMSimpleSeekBar(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public BMSimpleSeekBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        mContext = context;
        TypedArray t = null;
        mLinePaint = new Paint();
        mTextPaint = new Paint();
        mTextPaint.setAntiAlias(true);
        mLinePaint.setAntiAlias(true);
        markerList = new ArrayList<>();

        try {
            t = context.obtainStyledAttributes(attrs, R.styleable.BMSimpleSeekBar,
                    0, defStyleAttr);
            int lineColor = t.getColor(R.styleable.BMSimpleSeekBar_lineColor,
                    getResources().getColor(android.R.color.holo_blue_light));
            mLinePaint.setColor(lineColor);
            int textColor = t.getColor(R.styleable.BMSimpleSeekBar_textColor,
                    getResources().getColor(android.R.color.holo_blue_light));
            mTextPaint.setColor(textColor);
            mSeekBarId = t.getResourceId(R.styleable.BMSimpleSeekBar_seekBar, R.drawable.bg_black);
            mDesigenRaduis = t.getDimension(R.styleable.BMSimpleSeekBar_raduis, 0);
            mMargenLine = Math.round(t.getDimension(R.styleable.BMSimpleSeekBar_margin_line, 0));
        } finally {
            if (t != null) {
                t.recycle();
            }
        }

    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        mHeight = h;
        mWidth = w;
    }


    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        //draw line
        drawLine(canvas);
        //draw mark
        drawMark(canvas);
        //draw text
        drawText(canvas);
        //draw seekbar
        drawSeekBar(canvas);
    }


    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                float startX = event.getX();
                //if down action x smaller than raduis
                mFollow = Math.abs(startX - mSeekBarOffset) <= mDesigenRaduis;
                if (!mFollow) {
                    int position = (int) ((event.getX() - mMargenLine) / (distanceX / 2));
                    mCurrentSeekBarPosition = (position + 1) / 2;
                    changePosition();
                }

                break;
            case MotionEvent.ACTION_MOVE:
                //if follow mode change seekBar position
                if (mFollow) {
                    // in case out of edge
                    if (event.getX() >= mMargenLine && event.getX() <= (mWidth - mMargenLine)) {
                        int position = (int) ((event.getX() - mMargenLine) / (distanceX / 2));
                        mCurrentSeekBarPosition = (position + 1) / 2;
                        changePosition();
                    }
                }
                break;
            case MotionEvent.ACTION_UP:
                break;
        }
        return true;
    }

    private void changePosition() {
        if (mCurrentSeekBarPosition < markers.length) {
            mSeekBarOffset = markers[mCurrentSeekBarPosition];
            invalidate();
        }
        if (mCurrentSeekBarPosition != mPreviousPosition) {
            if (mListener != null) {
                mListener.onPositionChanged(mCurrentSeekBarPosition, markerList.get
                        (mCurrentSeekBarPosition));
            }
            mPreviousPosition = mCurrentSeekBarPosition;
        }

    }

    private void drawSeekBar(Canvas canvas) {
        if (mSeekBar == null) {
            initBitmap();
        }
        if (mSeekBar == null) return;
        if (mCurrentSeekBarPosition < markers.length) {
            canvas.drawBitmap(mSeekBar, mSeekBarOffset - mDesigenRaduis,
                    mHeight / 2 - mDesigenRaduis,
                    mTextPaint);
        }
    }

    private void initBitmap() {
        Resources resources = mContext.getResources();
        if (mDesigenRaduis != 0) {
            //zoom
            Bitmap bitmap = BitmapFactory.decodeResource(resources, mSeekBarId);
            mSeekBar = zoomImage(bitmap, mDesigenRaduis * 2, mDesigenRaduis * 2);
        }
        if (mCurrentSeekBarPosition < markers.length) {
            mSeekBarOffset = markers[mCurrentSeekBarPosition];
        }
        if (mPreviousPosition != mCurrentSeekBarPosition) {
            mPreviousPosition = mCurrentSeekBarPosition;
        }
    }


    private Bitmap zoomImage(Bitmap bitmap, float targetWidth, float targetHeight) {
        if (bitmap == null) {
            return null;
        }
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();

        if (width > 0 && height > 0) {
            float widthScale = targetWidth / width;
            float heightScale = targetHeight / height;
            Matrix matrix = new Matrix();
            matrix.postScale(widthScale, heightScale);
            return Bitmap.createBitmap(bitmap, 0, 0, width, height,
                    matrix,
                    true);

        }
        return null;
    }


    private void drawText(Canvas canvas) {
        for (int i = 0; i < markerList.size(); i++) {
            float x = markers[i];
            Marker marker = markerList.get(i);
            if (!TextUtils.isEmpty(marker.getMarkerText())) {
                if (marker.getTextColor() != 0) {
                    mTextPaint.setColor(marker.getTextColor());
                }
                int textPixelSize = marker.getTextPixelSize();
                if (textPixelSize != 0) {
                    mTextPaint.setTextSize(BaseCommonUtil.dp2px(mContext, textPixelSize / 2));
                }
                mTextPaint.setFakeBoldText(true);
                float textWidth = mTextPaint.measureText(marker.getMarkerText());
                canvas.drawText(marker.getMarkerText(), x - textWidth / 2, mHeight / 2 -
                                mTextMargin,
                        mTextPaint);
            }

        }
    }

    private void drawMark(Canvas canvas) {
        mMarkCount = markerList.size();
        markers = new float[mMarkCount];
        distanceX = (mWidth - mMargenLine * 2) / (mMarkCount - 1);
        for (int i = 0; i < mMarkCount; i++) {
            markers[i] = i * distanceX + mMargenLine;
        }
        for (float x : markers) {
            canvas.drawLine(x, mHeight / 2 - mMarkHeight / 2, x, mHeight / 2 + mMarkHeight / 2,
                    mLinePaint);
        }
    }

    private void drawLine(Canvas canvas) {
        mLinePaint.setStyle(Paint.Style.FILL);
        mLinePaint.setStrokeWidth(BaseCommonUtil.dp2px(getContext(), mPaintWidth/2));
        canvas.drawLine(getPaddingLeft() + mMargenLine, mHeight / 2, mWidth - mMargenLine -
                getPaddingRight(), mHeight / 2, mLinePaint);

    }

    public void setOnPositionChangedListner(OnPositionChangedListener listner) {
        this.mListener = listner;
    }

    /**
     * ser markers
     */
    public void setMarkers(List<Marker> list) {
        markerList.clear();
        markerList.addAll(list);
    }

    /**
     * set origin position
     */
    public void setOriginPosition(int originPosition) {
        mCurrentSeekBarPosition = originPosition;
        mPreviousPosition = originPosition;
    }

    /**
     * set left and right marigin
     */
    public void setMariginLine(int mariginLine) {
        this.mMargenLine = mariginLine;
    }


    public static class Marker {
        private String markerText;
        private int textColor;
        private int textPixelSize;

        public Marker(String markerText, int textColor) {
            this.markerText = markerText;
            this.textColor = textColor;
        }

        public Marker(String markerText, int textColor, int textPixelSize) {
            this.markerText = markerText;
            this.textColor = textColor;
            this.textPixelSize = textPixelSize;
        }

        public int getTextPixelSize() {
            return textPixelSize;
        }

        public void setTextPixelSize(int textPixelSize) {
            this.textPixelSize = textPixelSize;
        }

        public String getMarkerText() {
            return markerText;
        }

        public void setMarkerText(String markerText) {
            this.markerText = markerText;
        }

        public int getTextColor() {
            return textColor;
        }

        public void setTextColor(int textColor) {
            this.textColor = textColor;
        }
    }

    public interface OnPositionChangedListener {
        void onPositionChanged(int position, Marker maker);
    }
}
