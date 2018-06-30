package com.benmu.framework.event.nav;

import com.benmu.framework.adapter.DefaultNavigationAdapter;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/13.
 */

public class EventLeftItem {

    public void setLeftItem(String params, JSCallback jscallback) {
        DefaultNavigationAdapter.setLeftItem(params,jscallback);
    }
}
