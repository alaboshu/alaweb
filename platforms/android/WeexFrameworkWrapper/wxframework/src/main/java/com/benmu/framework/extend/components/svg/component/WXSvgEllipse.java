package com.benmu.framework.extend.components.svg.component;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;

import com.benmu.framework.extend.components.svg.ParserHelper;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Created by budao on 2017/3/1.
 */

public class WXSvgEllipse extends WXSvgPath {
  private String mCx;

  private String mCy;

  private String mRx = "0";

  private String mRy = "0";

  public WXSvgEllipse(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }


  @WXComponentProp(name = "cx")
  public void setCx(String x1) {
    mCx = x1;
  }

  @WXComponentProp(name = "cy")
  public void setCy(String y1) {
    mCy = y1;
  }

  @WXComponentProp(name = "rx")
  public void setRx(String x1) {
    mRx = x1;
  }

  @WXComponentProp(name = "ry")
  public void setRy(String y1) {
    mRy = y1;
  }

  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    mPath = getPath(canvas, paint);
    super.draw(canvas, paint, opacity);
  }

  @Override
  protected Path getPath(Canvas canvas, Paint paint) {
    Path path = new Path();
    float cx = ParserHelper.fromPercentageToFloat(mCx, mCanvasWidth, 0, mScale);
    float cy = ParserHelper.fromPercentageToFloat(mCy, mCanvasHeight, 0, mScale);
    float rx = ParserHelper.fromPercentageToFloat(mRx, mCanvasWidth, 0, mScale);
    float ry = ParserHelper.fromPercentageToFloat(mRy, mCanvasHeight, 0, mScale);
    RectF oval = new RectF(cx - rx, cy - ry, cx + rx, cy + ry);
    path.addOval(oval, Path.Direction.CW);
    return path;
  }
}
