package com.benmu.framework.event;

import android.content.Context;

import com.alibaba.fastjson.JSON;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.CommunicationManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.AxiosResultBean;
import com.squareup.otto.Subscribe;
import com.taobao.weex.bridge.JSCallback;

import java.util.List;

/**
 * Created by liuyuanxiao on 17/12/29.
 */

public class EventCommunication {
    private JSCallback mContactsCallBack;

    public void sms(String recipients, String params, final Context context) {
        List<String> rec = JSON.parseArray(recipients, String.class);
        StringBuilder smsList = new StringBuilder();
        for (int i = 0; i < rec.size(); i++) {
            if (i > 0) {
                smsList.append(",");
            }
            smsList.append(rec.get(i));
        }
        CommunicationManager routerManager = ManagerFactory.getManagerService(CommunicationManager.class);
        routerManager.sms(smsList.toString(), params, context);
    }

    public void contacts(final Context context,JSCallback callback) {
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
        CommunicationManager routerManager = ManagerFactory.getManagerService(CommunicationManager.class);
        routerManager.contacts(context);
    }

    @Subscribe
    public void contactsResult(AxiosResultBean uploadResultBean) {
        if (uploadResultBean != null && mContactsCallBack != null) {
            mContactsCallBack.invoke(uploadResultBean);
        }
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
    }
}
