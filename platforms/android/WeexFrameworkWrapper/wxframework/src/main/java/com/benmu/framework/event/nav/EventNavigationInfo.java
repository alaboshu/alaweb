package com.benmu.framework.event.nav;

import android.content.Context;

import com.benmu.framework.adapter.DefaultNavigationAdapter;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/13.
 */

public class EventNavigationInfo {

    public void setNavigationInfo(String params, Context context, JSCallback jscallback) {
        DefaultNavigationAdapter.setNavigationInfo(params, jscallback);
    }
}
