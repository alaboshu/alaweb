package com.benmu.framework.event.router;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.RouterManager;
import com.benmu.framework.model.RouterModel;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventGetBackParams {
    public void getBackParams(Context context, JSCallback jscallback) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        RouterModel routerModel = routerManager.getParams(context);
        if (routerModel != null && jscallback != null) {
            jscallback.invoke(routerModel.params);
        }
    }
}
