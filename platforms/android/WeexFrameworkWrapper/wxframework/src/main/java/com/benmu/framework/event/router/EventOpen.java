package com.benmu.framework.event.router;

import android.content.Context;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.RouterManager;
import com.taobao.weex.bridge.JSCallback;

import java.util.List;

/**
 * Created by Carry on 2017/8/21.
 */

public class EventOpen {
    public void open(String params, Context context, List<JSCallback> callbacks) {
        JSCallback backCallback = null;
        JSCallback resultCallback = null;
        if (callbacks.size() > 1) {
            backCallback = callbacks.get(0);
            resultCallback = callbacks.get(1);
        } else if (callbacks.size() > 0) {
            backCallback = callbacks.get(0);
        }

        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        boolean result = routerManager.open(context, params, backCallback);

        if (resultCallback != null) {
            resultCallback.invoke(result ? WXConstant.OPEN_PAGE_SUCCESS : WXConstant
                    .OPNE_PAGE_FAILED);
        }
    }

    public void open(String params, Context context, JSCallback backCallback) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        routerManager.open(context, params, backCallback);
    }

    public void open(String params, Context context) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        routerManager.open(context, params, null);
    }
}
