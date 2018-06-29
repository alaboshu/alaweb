package com.benmu.framework.extend.components;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXBasicComponentType;
import com.taobao.weex.ui.component.WXDiv;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Created by lfg on 2018/2/27.
 */

public class WXScrollerHeaderComponent extends WXDiv {
    public WXScrollerHeaderComponent(WXSDKInstance instance, WXDomObject node, WXVContainer parent) {
        super(instance, node, parent);
        if (WXBasicComponentType.SCROLLER.equals(parent.getDomObject().getType())) {
            setSticky(Constants.Value.STICKY);
        }
    }
}
