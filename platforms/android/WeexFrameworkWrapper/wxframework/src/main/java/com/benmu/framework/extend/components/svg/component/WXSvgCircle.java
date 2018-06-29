/**
 * Copyright (c) 2015-present, Horcrux.
 * All rights reserved.
 * <p>
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


package com.benmu.framework.extend.components.svg.component;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;

import com.benmu.framework.extend.components.svg.ParserHelper;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;


/**
 * Shadow node for virtual RNSVGPath view
 */
public class WXSvgCircle extends WXSvgPath {

  private String mCx;

  private String mCy;

  private String mR;

  public WXSvgCircle(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @WXComponentProp(name = "cx")
  public void setCx(String cx) {
    mCx = cx;

  }

  @WXComponentProp(name = "cy")
  public void setCy(String cy) {
    mCy = cy;
  }

  @WXComponentProp(name = "r")
  public void setR(String r) {
    mR = r;
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

    float r;
    if (ParserHelper.isPercentage(mR)) {
      r = ParserHelper.fromPercentageToFloat(mR, 1, 0, 1);
      float powX = (float) Math.pow((mCanvasWidth * r), 2);
      float powY = (float) Math.pow((mCanvasHeight * r), 2);
      r = (float) Math.sqrt(powX + powY) / (float) Math.sqrt(2);
    } else {
      r = Float.parseFloat(mR) * mScale;
    }

    path.addCircle(cx, cy, r, Path.Direction.CW);
    return path;
  }
}
