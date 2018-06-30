package com.benmu.framework.extend.components.svg.component;

import android.support.annotation.Nullable;
import android.util.Log;

import com.benmu.framework.extend.components.svg.SvgParser;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;


/**
 * Created by budao on 2017/3/1.
 */

public class WXSvgPolygon extends WXSvgPath {

  private static final String TAG = "WXSvgPolygon";

  public WXSvgPolygon(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @WXComponentProp(name = "points")
  public void setPoints(@Nullable String points) {
    mD = SvgParser.parsePoints(points);
    Log.v(TAG, "svg point is " + SvgParser.parsePoints(points));
    setupPath();
  }

}
