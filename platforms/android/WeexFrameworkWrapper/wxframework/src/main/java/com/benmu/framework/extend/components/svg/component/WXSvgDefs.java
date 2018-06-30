package com.benmu.framework.extend.components.svg.component;

import android.graphics.Canvas;
import android.graphics.Paint;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Created by budao on 2017/3/2.
 */

public class WXSvgDefs extends WXSvgAbsComponent {
  public WXSvgDefs(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
    super(instance, dom, parent);
  }
  @Override
  public void draw(Canvas canvas, Paint paint, float opacity) {
    int count = saveAndSetupCanvas(canvas);
    clip(canvas, paint);

    for (int i = 0; i < getChildCount(); i++) {
      if (!(getChild(i) instanceof WXSvgAbsComponent)) {
        continue;
      }

      WXSvgAbsComponent child = (WXSvgAbsComponent) getChild(i);
      child.saveDefinition();
    }

    restoreCanvas(canvas, count);
  }
}
