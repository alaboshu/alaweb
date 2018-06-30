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

public class WXSvgRect extends WXSvgPath {
  private String mX = "0";

  private String mY = "0";

  private String mW = "0";

  private String mH = "0";

  private String mRx = "0";

  private String mRy = "0";

  public WXSvgRect(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }


  @WXComponentProp(name = "x")
  public void setX(String x1) {
    mX = x1;
  }

  @WXComponentProp(name = "y")
  public void setY(String y1) {
    mY = y1;
  }

  @WXComponentProp(name = "rx")
  public void setRx(String x1) {
    mRx = x1;
  }

  @WXComponentProp(name = "ry")
  public void setRy(String y1) {
    mRy = y1;
  }

  @WXComponentProp(name = "width")
  public void setW(String width) {
    mW = width;
  }

  @WXComponentProp(name = "height")
  public void setH(String height) {
    mH = height;
  }

  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    mPath = getPath(canvas, paint);
    super.draw(canvas, paint, opacity);
  }

  @Override
  protected Path getPath(Canvas canvas, Paint paint) {
    Path path = new Path();
    float x = ParserHelper.fromPercentageToFloat(mX, mCanvasWidth, 0, mScale);
    float y = ParserHelper.fromPercentageToFloat(mY, mCanvasHeight, 0, mScale);
    float w = ParserHelper.fromPercentageToFloat(mW, mCanvasWidth, 0, mScale);
    float h = ParserHelper.fromPercentageToFloat(mH, mCanvasHeight, 0, mScale);
    float rx = ParserHelper.fromPercentageToFloat(mRx, mCanvasWidth, 0, mScale);
    float ry = ParserHelper.fromPercentageToFloat(mRy, mCanvasHeight, 0, mScale);

    if (rx != 0 || ry != 0) {
      if (rx == 0) {
        rx = ry;
      } else if (ry == 0) {
        ry = rx;
      }

      if (rx > w / 2) {
        rx = w / 2;
      }

      if (ry > h / 2) {
        ry = h / 2;
      }
      path.addRoundRect(new RectF(x, y, x + w, y + h), rx, ry, Path.Direction.CW);
    } else {
      path.addRect(x, y, x + w, y + h, Path.Direction.CW);
    }
    return path;
  }
}
