package com.benmu.framework.event.router;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.RouterManager;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventRefresh {
    public void refresh(Context context, JSCallback jscallback) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        boolean result = routerManager.refresh(context);

//        if (activity != null && activity instanceof AbsWeexActivity) {
//            AbsWeexActivity target = (AbsWeexActivity) activity;
//            if (target.mUrl != null) {
//                target.refresh();
//                if (jscallback != null) {
//                    BaseResultBean bean = new BaseResultBean();
//                    bean.resCode = 0;
//                    bean.msg = activity.getClass().getSimpleName() + "刷新成功";
//                    jscallback.invoke(bean);
//                }
//            }
//        }
    }
}
