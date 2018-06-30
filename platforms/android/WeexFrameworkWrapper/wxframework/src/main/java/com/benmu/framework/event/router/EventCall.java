package com.benmu.framework.event.router;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.RouterManager;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventCall {
    public void call(String params, Context context) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        routerManager.dialing(context,params);
    }
}
