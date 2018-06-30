package com.benmu.framework.event.nav;

import com.benmu.framework.adapter.DefaultNavigationAdapter;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/13.
 */

public class EventRightItem {

    public void setRightItem(String params, JSCallback jscallback) {
        DefaultNavigationAdapter.setRightItem(params,jscallback);
    }
}
