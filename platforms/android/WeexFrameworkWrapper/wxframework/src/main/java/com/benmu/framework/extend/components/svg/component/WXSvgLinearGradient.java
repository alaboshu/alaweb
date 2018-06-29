package com.benmu.framework.extend.components.svg.component;

import android.graphics.Color;
import android.text.TextUtils;

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

public class WXSvgLinearGradient extends WXSvgDefs {
  private String mX1 = "0%";

  private String mY1 = "0%";

  private String mX2 = "100%";

  private String mY2 = "0%";

  public WXSvgLinearGradient(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @WXComponentProp(name = "id")
  public void setName(String id) {
    mName = id;
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
  protected void saveDefinition() {
    if (mName != null) {
      ArrayList points = new ArrayList<String>();
      points.add(mX1);
      points.add(mY1);
      points.add(mX2);
      points.add(mY2);

      ArrayList<Integer> stopColors = new ArrayList<>();
      ArrayList<Float> stops = new ArrayList<>();
      for (int i = 0; i < childCount(); i++) {
        if (getChild(i) instanceof WXSvgStop) {
          ImmutableDomObject domObject = getChild(i).getDomObject();
          int color = Color.TRANSPARENT;
          if (!TextUtils.isEmpty((CharSequence) domObject.getAttrs().get("stopColor"))) {
            color = SvgParser.parseColor((String) domObject.getAttrs().get("stopColor"));
          }
          if (!TextUtils.isEmpty((CharSequence) domObject.getStyles().get("stopColor"))) {
            color = SvgParser.parseColor((String) domObject.getStyles().get("stopColor"));
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
          .LINEAR_GRADIENT, points, positions, colors);
      getSvgComponent().defineBrush(brush, mName);
    }
  }
}
