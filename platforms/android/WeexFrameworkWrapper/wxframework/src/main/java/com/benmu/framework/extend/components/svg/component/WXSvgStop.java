package com.benmu.framework.extend.components.svg.component;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Created by budao on 2017/3/2.
 */

public class WXSvgStop extends WXSvgAbsComponent {
  private String mOffset;
  private String mStopColor;

  public WXSvgStop(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }

  @WXComponentProp(name = "offset")
  public void setOffset(String offset) {
    mOffset = offset;
  }

  @WXComponentProp(name = "stopColor")
  public void setStopColor(String stopColor) {
    mStopColor = stopColor;
  }
}
