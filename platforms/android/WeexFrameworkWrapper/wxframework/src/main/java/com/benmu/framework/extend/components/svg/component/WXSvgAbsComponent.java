/**
 * Copyright (c) 2015-present, Horcrux.
 * All rights reserved.
 * <p>
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


package com.benmu.framework.extend.components.svg.component;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Rect;
import android.graphics.Region;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;

import com.benmu.framework.extend.components.svg.ISvgDrawable;
import com.benmu.framework.extend.components.svg.SvgParser;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXDiv;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.view.WXFrameLayout;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.Map;


public class WXSvgAbsComponent extends WXVContainer<FrameLayout> implements ISvgDrawable {
  private static final String TAG = "WXSvgAbsComponent";

  protected static final float MIN_OPACITY_FOR_DRAW = 0.01f;

  private static final float[] sMatrixData = new float[9];
  private static final float[] sRawMatrix = new float[9];
  private static final String PATH_CMD_Z = "Z";
  private static final String PATH_CMD_C = "C";
  private static final String PATH_CMD_L = "L";
  private static final String PATH_CMD_M = "M";
  private static final String PATH_CMD_H = "H";
  private static final String PATH_CMD_V = "V";
  private static final String PATH_CMD_S = "S";
  private static final String PATH_CMD_A = "A";

  private static final String PATH_CMD_CLOSE_LOWERCASE = "z";
  private static final String PATH_CMD_C_LOWERCASE = "c";
  private static final String PATH_CMD_L_LOWERCASE = "l";
  private static final String PATH_CMD_M_LOWERCASE = "m";
  private static final String PATH_CMD_H_LOWERCASE = "h";
  private static final String PATH_CMD_V_LOWERCASE = "v";
  private static final String PATH_CMD_S_LOWERCASE = "s";
  private static final String PATH_CMD_A_LOWERCASE = "a";

  private static final int CLIP_RULE_EVENODD = 0;
  private static final int CLIP_RULE_NONZERO = 1;
  protected float mScale = 1.0f;
  protected float mOpacity = 1.0f;
  protected Matrix mMatrix = new Matrix();
  protected
  @Nullable
  Path mClipPath;
  protected
  @Nullable
  String mClipPathRef;
  protected boolean mResponsible = false;
  protected int mCanvasX;
  protected int mCanvasY;
  protected int mCanvasWidth;
  protected int mCanvasHeight;
  protected String mName;
  private ArrayList<SvgParser.PathCmd> mClipData;
  private int mClipRule = CLIP_RULE_NONZERO;
  private boolean mClipRuleSet;
  private boolean mClipDataSet;
  private WXSvgContainer mSvgShadowNode;

  public WXSvgAbsComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
    mScale = (float) (WXViewUtils.getScreenWidth(parent.getContext()) * 1.0 / dom.getViewPortWidth());
  }

  @Override
  protected FrameLayout initComponentHostView(@NonNull Context context) {
    WXFrameLayout wxFrameLayout = new WXFrameLayout(context);
    wxFrameLayout.setWillNotDraw(false);
    return wxFrameLayout;
  }
  @Override
  protected void addSubView(View child, int index) {

  }

  public void draw(Canvas canvas, Paint paint, float opacity) {

  }

  /**
   * Sets up the transform matrix on the canvas before an element is drawn.
   * <p>
   * NB: for perf reasons this does not apply opacity, as that would mean creating a new canvas
   * layer (which allocates an offscreen bitmap) and having it composited afterwards. Instead, the
   * drawing code should apply opacity recursively.
   *
   * @param canvas the canvas to set up
   */
  protected final int saveAndSetupCanvas(Canvas canvas) {
    final int count = canvas.save();
    canvas.concat(mMatrix);
    return count;
  }

  public boolean isVirtualComponent(){
    return true;
  }
  /**
   * Restore the canvas after an element was drawn. This is always called in mirror with
   * {@link #saveAndSetupCanvas}.
   *
   * @param canvas the canvas to restore
   */
  protected void restoreCanvas(Canvas canvas, int count) {
    canvas.restoreToCount(count);
  }

  @WXComponentProp(name = "clipPath")
  public void setClipPath(@Nullable String clipPath) {
    mClipData = SvgParser.parserPath(clipPath);
    mClipDataSet = true;
    setupClip();
  }

  @WXComponentProp(name = "name")
  public void setName(String name) {
    mName = name;
  }


  @WXComponentProp(name = "clipPathRef")
  public void setClipPathRef(String clipPathRef) {
    mClipPathRef = clipPathRef;

  }

  @WXComponentProp(name = "clipRule")
  public void setClipRule(int clipRule) {
    mClipRule = clipRule;
    mClipRuleSet = true;
    setupClip();

  }

  @WXComponentProp(name = "opacity")
  public void setOpacity(float opacity) {
    mOpacity = opacity;

  }

//  @WXComponentProp(name = "matrix")
//  public void setMatrix(@Nullable ReadableArray matrixArray) {
//    if (matrixArray != null) {
//      int matrixSize = PropHelper.toFloatArray(matrixArray, sMatrixData);
//      if (matrixSize == 6) {
//        setupMatrix();
//      } else if (matrixSize != -1) {
//        throw new JSApplicationIllegalArgumentException("Transform matrices must be of size 6");
//      }
//    } else {
//      mMatrix = null;
//    }
//
//  }

  private void setupClip() {
    if (mClipDataSet && mClipRuleSet) {
      mClipPath = new Path();

      switch (mClipRule) {
        case CLIP_RULE_EVENODD:
          mClipPath.setFillType(Path.FillType.EVEN_ODD);
          break;
        case CLIP_RULE_NONZERO:
          break;
        default:
          Log.v(TAG, "clipRule " + mClipRule + " unrecognized");
      }
      createPath(mClipData, mClipPath);
    }
  }

  protected void setupMatrix() {
    sRawMatrix[0] = sMatrixData[0];
    sRawMatrix[1] = sMatrixData[2];
    sRawMatrix[2] = sMatrixData[4] * mScale;
    sRawMatrix[3] = sMatrixData[1];
    sRawMatrix[4] = sMatrixData[3];
    sRawMatrix[5] = sMatrixData[5] * mScale;
    sRawMatrix[6] = 0;
    sRawMatrix[7] = 0;
    sRawMatrix[8] = 1;
    mMatrix.setValues(sRawMatrix);
  }

  /**
   * Returns the floor modulus of the float arguments. Java modulus will return a negative remainder
   * when the divisor is negative. Modulus should always be positive. This mimics the behavior of
   * Math.floorMod, introduced in Java 8.
   */
  private float modulus(float x, float y) {
    float remainder = x % y;
    float ret = remainder;
    if (remainder < 0) {
      ret += y;
    }
    return ret;
  }

  protected void createPath(ArrayList<SvgParser.PathCmd> cmds, Path path) {
    float lastX = 0;
    float lastY = 0;
    float lastX1 = 0;
    float lastY1 = 0;
    float subPathStartX = 0;
    float subPathStartY = 0;
    path.moveTo(0, 0);
    int i = 0;

    while (i < cmds.size()) {
      String cmd = cmds.get(i).mCmd;
      float[] data = cmds.get(i).mValue;
      boolean wasCurve = false;
      switch (cmd) {
        case PATH_CMD_M:
        case PATH_CMD_M_LOWERCASE: {
          float x = data[0] * mScale;
          float y = data[1] * mScale;
          if (cmd.equals(PATH_CMD_M_LOWERCASE)) {
            subPathStartX += x;
            subPathStartY += y;
            path.rMoveTo(x, y);
            lastX += x;
            lastY += y;
          } else {
            subPathStartX = x;
            subPathStartY = y;
            path.moveTo(x, y);
            lastX = x;
            lastY = y;
          }
          break;
        }
        case PATH_CMD_Z:
        case PATH_CMD_CLOSE_LOWERCASE:
          path.close();
          path.moveTo(subPathStartX, subPathStartY);
          lastX = subPathStartX;
          lastY = subPathStartY;
          lastX1 = subPathStartX;
          lastY1 = subPathStartY;
          wasCurve = true;
          break;
        case PATH_CMD_L:
        case PATH_CMD_L_LOWERCASE: {
          float x = data[0] * mScale;
          float y = data[1] * mScale;
          if (cmd.equals(PATH_CMD_L_LOWERCASE)) {
            path.rLineTo(x, y);
            lastX += x;
            lastY += y;
          } else {
            path.lineTo(x, y);
            lastX = x;
            lastY = y;
          }
          break;
        }
        case PATH_CMD_H:
        case PATH_CMD_H_LOWERCASE: {
          float x = data[0] * mScale;
          if (cmd.equals(PATH_CMD_H_LOWERCASE)) {
            path.rLineTo(x, 0);
            lastX += x;
          } else {
            path.lineTo(x, lastY);
            lastX = x;
          }
          break;
        }
        case PATH_CMD_V:
        case PATH_CMD_V_LOWERCASE: {
          float y = data[0] * mScale;
          if (cmd.equals(PATH_CMD_V_LOWERCASE)) {
            path.rLineTo(0, y);
            lastY += y;
          } else {
            path.lineTo(lastX, y);
            lastY = y;
          }
          break;
        }
        case PATH_CMD_C:
        case PATH_CMD_C_LOWERCASE: {
          wasCurve = true;
          float x1 = data[0] * mScale;
          float y1 = data[1] * mScale;
          float x2 = data[2] * mScale;
          float y2 = data[3] * mScale;
          float x = data[4] * mScale;
          float y = data[5] * mScale;
          if (cmd.equals(PATH_CMD_C_LOWERCASE)) {
            x1 += lastX;
            x2 += lastX;
            x += lastX;
            y1 += lastY;
            y2 += lastY;
            y += lastY;
          }
          path.cubicTo(x1, y1, x2, y2, x, y);
          lastX1 = x2;
          lastY1 = y2;
          lastX = x;
          lastY = y;
          break;
        }

        case PATH_CMD_S:
        case PATH_CMD_S_LOWERCASE: {
          wasCurve = true;
          float x2 = data[0] * mScale;
          float y2 = data[1] * mScale;
          float x = data[2] * mScale;
          float y = data[3] * mScale;
          if (cmd.equals(PATH_CMD_S_LOWERCASE)) {
            x2 += lastX;
            x += lastX;
            y2 += lastY;
            y += lastY;
          }
          float x1 = 2 * lastX - lastX1;
          float y1 = 2 * lastY - lastY1;
          path.cubicTo(x1, y1, x2, y2, x, y);
          lastX1 = x2;
          lastY1 = y2;
          lastX = x;
          lastY = y;
          break;
        }
        case PATH_CMD_A:
        case PATH_CMD_A_LOWERCASE: {
          float rx = data[0] * mScale;
          float ry = data[1] * mScale;
          float theta = data[2];
          int largeArc = (int) (data[3]);
          int sweepArc = (int) (data[4]);
          float x = data[5] * mScale;
          float y = data[6] * mScale;
          if (cmd.equals(PATH_CMD_A_LOWERCASE)) {
            x += lastX;
            y += lastY;
          }
          SvgParser.drawArc(path, lastX, lastY, x, y, rx, ry, theta, largeArc, sweepArc);
          lastX = x;
          lastY = y;
          break;
        }
        default:
          Log.v(TAG, "Unrecognized drawing instruction " + cmd);
      }
      if (!wasCurve) {
        lastX1 = lastX;
        lastY1 = lastY;
      }
      i++;
    }
  }

  protected
  @Nullable
  Path getClipPath(Canvas canvas, Paint paint) {
    Path clip = mClipPath;
    if (clip == null && mClipPathRef != null) {
      WXSvgAbsComponent node = getSvgComponent().getDefinedClipPath(mClipPathRef);
      clip = node.getPath(canvas, paint);
    }

    return clip;
  }

  protected void clip(Canvas canvas, Paint paint) {
    Path clip = getClipPath(canvas, paint);

    if (clip != null) {
      canvas.clipPath(clip, Region.Op.REPLACE);
    }
  }

  public boolean isResponsible() {
    return mResponsible;
  }

  @WXComponentProp(name = "responsible")
  public void setResponsible(boolean responsible) {
    mResponsible = responsible;

  }

  protected Path getPath(Canvas canvas, Paint paint) {
    return null;
  }

  protected WXSvgContainer getSvgComponent() {
    if (mSvgShadowNode != null) {
      return mSvgShadowNode;
    }

    WXComponent parent = getParent();

    while (!(parent instanceof WXSvgContainer)) {
      if (parent == null) {
        return null;
      } else {
        parent = parent.getParent();
      }
    }
    mSvgShadowNode = (WXSvgContainer) parent;
    return mSvgShadowNode;
  }

  protected void setupDimensions(Canvas canvas) {
    Rect mCanvasClipBounds = canvas.getClipBounds();
    mCanvasX = mCanvasClipBounds.left;
    mCanvasY = mCanvasClipBounds.top;
    mCanvasWidth = canvas.getWidth();
    mCanvasHeight = canvas.getHeight();
  }

  protected void setupDimensions(Rect rect) {
    mCanvasX = rect.left;
    mCanvasY = rect.top;
    mCanvasWidth = rect.width();
    mCanvasHeight = rect.height();
  }

  protected void saveDefinition() {
    if (mName != null) {
      Log.v(TAG, "saveDefinition " + mName);
      getSvgComponent().defineTemplate(this, mName);
    }
  }

  @Override
  protected boolean setProperty(String key, Object param) {
    switch (key) {
      case Constants.Name.WIDTH:
      case Constants.Name.HEIGHT:
        return false;
      default:
        return super.setProperty(key, param);
    }
  }

  @Override
  public void updateProperties(Map<String, Object> props) {
    super.updateProperties(props);
    if (getSvgComponent() != null) {
      getSvgComponent().invalidate();
    }
  }
}
