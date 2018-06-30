package com.benmu.framework.extend.components.svg.component;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.extend.components.svg.ISvgDrawable;
import com.benmu.framework.extend.components.svg.SvgBrush;
import com.benmu.framework.extend.components.svg.view.WXSvgView;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXViewUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by budao on 2017/2/21.
 */

public class WXSvgContainer extends WXVContainer<WXSvgView> implements ISvgDrawable {
  private static final Map<String, WXSvgAbsComponent> mDefinedClipPaths = new HashMap<>();
  private static final Map<String, WXSvgAbsComponent> mDefinedTemplates = new HashMap<>();
  private static final Map<String, SvgBrush> mDefinedBrushes = new HashMap<>();
  private int mWidth;
  private int mHeight;
  private int mViewBoxX = 0;
  private int mViewBoxY = 0;
  private int mviewBoxWidth = 0;
  private int mviewBoxHeight = 0;
  private WXDomObject mDom;
  private float mScale;

  public WXSvgContainer(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
    mDom = dom;
    Log.v("WXSvgContainer", mDom.getAttrs().values().toString());
    if (mDom.getStyles().get(Constants.Name.HEIGHT) == null) {
      mDom.getStyles().put(Constants.Name.HEIGHT, "0");
    }
    if (mDom.getStyles().get(Constants.Name.WIDTH) == null) {
      mDom.getStyles().put(Constants.Name.WIDTH, "0");
    }
    mScale = (float) (WXViewUtils.getScreenWidth(parent.getContext()) * 1.0 / dom.getViewPortWidth());
  }

  @Override
  protected WXSvgView initComponentHostView(@NonNull Context context) {
    WXSvgView host = new WXSvgView(context);
    host.setWillNotDraw(false);
    host.setSvgDrawable(this);
    host.setTag(getDomObject().getRef());
    return host;
  }

  @WXComponentProp(name = Constants.Name.WIDTH)
  public void setWidth(int width) {
    mWidth = width;
    getHostView().getLayoutParams().width = (int) WXViewUtils.getRealPxByWidth(width, 750);
  }

  @WXComponentProp(name = Constants.Name.HEIGHT)
  public void setHeight(int height) {
    mHeight = height;
    getHostView().getLayoutParams().height = (int) WXViewUtils.getRealPxByWidth(height, 750);
  }

  @WXComponentProp(name = "viewBox")
  public void setViewBox(String viewBox) {
    String box = viewBox;
    Log.v("WXSvgContainer", "box is " + box);
    if (!TextUtils.isEmpty(box)) {
      String[] p = box.split(" ");
      if (p != null && p.length == 4) {
        mViewBoxX = Integer.valueOf(p[0]);
        mViewBoxY = Integer.valueOf(p[1]);
        mviewBoxWidth = Integer.valueOf(p[2]);
        mviewBoxHeight = Integer.valueOf(p[3]);
      }
    }
  }

  private void drawElements(Canvas canvas) {
    Paint paint = new Paint();
    processChildren(canvas, paint);
  }

  public synchronized void processChildren(Canvas canvas, Paint paint) {
    for (int i = 0; i < getChildCount(); i++) {
      if (!(getChild(i) instanceof ISvgDrawable)) {
        continue;
      }

      ISvgDrawable child = (ISvgDrawable) getChild(i);
      child.draw(canvas, paint, 1f);
    }
  }

  @Override
  protected void onFinishLayout() {
    super.onFinishLayout();
    //getHostView().invalidate();
  }

  protected Path getPath(Canvas canvas, Paint paint) {
    return null;
  }

  public void defineClipPath(WXSvgAbsComponent clipPath, String clipPathRef) {
    mDefinedClipPaths.put(clipPathRef, clipPath);
  }

  public WXSvgAbsComponent getDefinedClipPath(String clipPathRef) {
    return mDefinedClipPaths.get(clipPathRef);
  }

  public void defineTemplate(WXSvgAbsComponent template, String templateRef) {
    mDefinedTemplates.put(templateRef, template);
  }

  public WXSvgAbsComponent getDefinedTemplate(String templateRef) {
    return mDefinedTemplates.get(templateRef);
  }

  public void defineBrush(SvgBrush brush, String brushRef) {
    mDefinedBrushes.put(brushRef, brush);
  }

  public SvgBrush getDefinedBrush(String brushRef) {
    return mDefinedBrushes.get(brushRef);
  }


  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    if (mviewBoxHeight == 0 || mviewBoxWidth == 0) {
      mviewBoxHeight = mHeight;
      mviewBoxWidth = mWidth;
    }

    RectF vbRect = new RectF(mViewBoxX * mScale, mViewBoxY * mScale, (mViewBoxX + mviewBoxWidth) * mScale, (mViewBoxY + mviewBoxHeight) * mScale);
    RectF eRect = new RectF(0, 0, mWidth * mScale, mHeight * mScale);
    Matrix mViewBoxMatrix = getTransform(vbRect, eRect, "none", MOS_NONE, false);
    canvas.concat(mViewBoxMatrix);
    drawElements(canvas);
  }

  private static final int MOS_MEET = 0;
  private static final int MOS_SLICE = 1;
  private static final int MOS_NONE = 2;

  private static Matrix getTransform(RectF vbRect, RectF eRect, String align, int meetOrSlice, boolean fromSymbol) {
    // based on https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform

    // Let vb-x, vb-y, vb-width, vb-height be the min-x, min-y, width and height values of the viewBox attribute respectively.
    float vbX = vbRect.left;
    float vbY = vbRect.top;
    float vbWidth = vbRect.width();
    float vbHeight = vbRect.height();

    // Let e-x, e-y, e-width, e-height be the position and size of the element respectively.
    float eX = eRect.left;
    float eY = eRect.top;
    float eWidth = eRect.width();
    float eHeight = eRect.height();


    // Initialize scale-x to e-width/vb-width.
    float scaleX = eWidth / vbWidth;

    // Initialize scale-y to e-height/vb-height.
    float scaleY = eHeight / vbHeight;

    // Initialize translate-x to vb-x - e-x.
    // Initialize translate-y to vb-y - e-y.
    float translateX = vbX - eX;
    float translateY = vbY - eY;

    // If align is 'none'
    if (meetOrSlice == MOS_NONE) {
      // Let scale be set the smaller value of scale-x and scale-y.
      // Assign scale-x and scale-y to scale.
      float scale = scaleX = scaleY = Math.min(scaleX, scaleY);

      // If scale is greater than 1
      if (scale > 1) {
        // Minus translateX by (eWidth / scale - vbWidth) / 2
        // Minus translateY by (eHeight / scale - vbHeight) / 2
        translateX -= (eWidth / scale - vbWidth) / 2;
        translateY -= (eHeight / scale - vbHeight) / 2;
      } else {
        translateX -= (eWidth - vbWidth * scale) / 2;
        translateY -= (eHeight - vbHeight * scale) / 2;
      }
    } else {
      // If align is not 'none' and meetOrSlice is 'meet', set the larger of scale-x and scale-y to the smaller.
      // Otherwise, if align is not 'none' and meetOrSlice is 'slice', set the smaller of scale-x and scale-y to the larger.

      if (!align.equals("none") && meetOrSlice == MOS_MEET) {
        scaleX = scaleY = Math.min(scaleX, scaleY);
      } else if (!align.equals("none") && meetOrSlice == MOS_SLICE) {
        scaleX = scaleY = Math.max(scaleX, scaleY);
      }

      // If align contains 'xMid', minus (e-width / scale-x - vb-width) / 2 from transform-x.
      if (align.contains("xMid")) {
        translateX -= (eWidth / scaleX - vbWidth) / 2;
      }

      // If align contains 'xMax', minus (e-width / scale-x - vb-width) from transform-x.
      if (align.contains("xMax")) {
        translateX -= eWidth / scaleX - vbWidth;
      }

      // If align contains 'yMid', minus (e-height / scale-y - vb-height) / 2 from transform-y.
      if (align.contains("yMid")) {
        translateY -= (eHeight / scaleY - vbHeight) / 2;
      }

      // If align contains 'yMax', minus (e-height / scale-y - vb-height) from transform-y.
      if (align.contains("yMax")) {
        translateY -= eHeight / scaleY - vbHeight;
      }

    }

    // The transform applied to content contained by the element is given by
    // translate(translate-x, translate-y) scale(scale-x, scale-y).
    Matrix transform = new Matrix();
    transform.postTranslate(-translateX * (fromSymbol ? scaleX : 1), -translateY * (fromSymbol ? scaleY : 1));
    transform.postScale(scaleX, scaleY);
    return transform;
  }

  @Override
  protected boolean setProperty(String key, Object param) {
    switch (key) {
      case Constants.Name.WIDTH:
      case Constants.Name.HEIGHT:
        if (mDom != null) {
          mDom.getStyles().put(key, param.toString());
        }
        return false;
      default:
        return super.setProperty(key, param);
    }
  }

  @Override
  public void updateProperties(Map<String, Object> props) {
    super.updateProperties(props);
    invalidate();
  }


  public void addChild(WXComponent child, int index) {
    super.addChild(child, index);
    //invalidate();
  }

//  private Bitmap drawBitmap() {
//    WXSvgView host = getHostView();
//    if (host != null) {
//      int width = host.getWidth();
//      int height = host.getHeight();
//      Log.v("WXSvgAbsComponent", "width is " + width + ", height is " + height);
//      Bitmap bitmap = Bitmap.createBitmap(
//          Math.max(1, width),
//          Math.max(1, height),
//          Bitmap.Config.ARGB_8888);
//      Canvas canvas = new Canvas(bitmap);
//      Paint paint = new Paint();
//      processChildren(canvas, paint);
//      return bitmap;
//    }
//    return null;
//  }

  public void invalidate() {
    getHostView().setWillNotDraw(false);
    getHostView().postInvalidate();
    Log.v("WXSvgAbsComponent", "invalidate " + getRef());
  }
}
