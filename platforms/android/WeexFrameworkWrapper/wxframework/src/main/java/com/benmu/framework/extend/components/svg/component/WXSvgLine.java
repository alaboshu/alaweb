package com.benmu.framework.extend.components.svg.component;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;

import com.benmu.framework.extend.components.svg.ParserHelper;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.ComponentCreator;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by budao on 2017/2/21.
 */

public class WXSvgLine extends WXSvgPath {
  private String mX1;

  private String mY1;

  private String mX2;

  private String mY2;

  public WXSvgLine(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }


  @WXComponentProp(name = "x1")
  public void setX1(String x1) {
    mX1 = x1;
  }

  @WXComponentProp(name = "y1")
  public void setY1(String y1) {
    mY1 = y1;
  }

  @WXComponentProp(name = "x2")
  public void setX2(String x2) {
    mX2 = x2;
  }

  @WXComponentProp(name = "y2")
  public void setY2(String y2) {
    mY2 = y2;
  }

  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    mPath = getPath(canvas, paint);
    super.draw(canvas, paint, opacity);
  }

  @Override
  protected Path getPath(Canvas canvas, Paint paint) {
    Path path = new Path();
    float x1 = ParserHelper.fromPercentageToFloat(mX1, mCanvasWidth, 0, mScale);
    float y1 = ParserHelper.fromPercentageToFloat(mY1, mCanvasHeight, 0, mScale);
    float x2 = ParserHelper.fromPercentageToFloat(mX2, mCanvasWidth, 0, mScale);
    float y2 = ParserHelper.fromPercentageToFloat(mY2, mCanvasHeight, 0, mScale);

    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    return path;
  }

  public static class Creator implements ComponentCreator {
    public Creator() {
    }

    public WXComponent createInstance(WXSDKInstance instance, WXDomObject node, WXVContainer parent) throws IllegalAccessException, InvocationTargetException, InstantiationException {
      return new WXSvgLine(instance, node, parent);
    }
  }
}
