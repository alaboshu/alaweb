package com.benmu.framework.extend.components.svg.component;

import android.graphics.Color;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.extend.components.svg.ParserHelper;
import com.benmu.framework.extend.components.svg.SvgBrush;
import com.benmu.framework.extend.components.svg.SvgParser;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.ImmutableDomObject;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

import java.util.ArrayList;

/**
 * Created by budao on 2017/3/2.
 */

public class WXSvgRadialGradient extends WXSvgDefs {
  public WXSvgRadialGradient(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  private String mCx = "50%";

  private String mCy = "50%";

  private String mRx = "50%";

  private String mRy = "50%";

  private String mFx = "50%";

  private String mFy = "50%";

  @WXComponentProp(name = "id")
  public void setName(String id) {
    mName = id;
  }

  @WXComponentProp(name = "cx")
  public void setCx(String cx) {
    mCx = cx;
  }

  @WXComponentProp(name = "cy")
  public void setCy(String cy) {
    mCy = cy;
  }

  @WXComponentProp(name = "fx")
  public void setFx(String fx) {
    mFx = fx;
  }

  @WXComponentProp(name = "fy")
  public void setFy(String y2) {
    mFy = y2;
  }

  @WXComponentProp(name = "rx")
  public void setRx(String fx) {
    mRx = fx;
  }

  @WXComponentProp(name = "ry")
  public void setRy(String ry) {
    mRy = ry;
  }

  @WXComponentProp(name = "r")
  public void setR(String r) {
    mRy = r;
    mRx = r;
  }

  @Override
  protected void saveDefinition() {
    if (mName != null) {
      ArrayList<String> points = new ArrayList<String>();
      points.add(mFx);
      points.add(mFy);
      points.add(mRx);
      points.add(mRy);
      points.add(mCx);
      points.add(mCy);

      ArrayList<Integer> stopColors = new ArrayList<>();
      ArrayList<Float> stops = new ArrayList<>();
      for (int i = 0; i < childCount(); i++) {
        if (getChild(i) instanceof WXSvgStop) {
          ImmutableDomObject domObject = getChild(i).getDomObject();
          int color = Color.TRANSPARENT;
          String stopColor = (String) domObject.getAttrs().get("stopColor");
          if (!TextUtils.isEmpty(stopColor) && stopColor.length() > 0) {
            Log.v("WXSvgRadialGradient", "stop color is " + stopColor);
            color = SvgParser.parseColor(stopColor);
          }
          stopColor = (String) domObject.getStyles().get("stopColor");
          if (!TextUtils.isEmpty(stopColor) && stopColor.length() > 0) {
            color = SvgParser.parseColor(stopColor);
          }
          float offset = ParserHelper.fromPercentageToFloat(
              (String) domObject.getAttrs().get("offset"), 1, 0, 1);
          stops.add(offset);
          stopColors.add(color);
        }
      }

      int[] colors = new int[stopColors.size()];
      for (int i = 0; i < colors.length; i++) {
        colors[i] = stopColors.get(i);
      }
      float[] positions = new float[stops.size()];
      for (int i = 0; i < positions.length; i++) {
        positions[i] = stops.get(i);
      }

      SvgBrush brush = new SvgBrush(SvgBrush.GradientType
          .RADIAL_GRADIENT, points, positions, colors);
      getSvgComponent().defineBrush(brush, mName);
    }
  }
}
