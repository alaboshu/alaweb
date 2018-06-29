package com.benmu.framework.event.modal;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.ModalBean;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventShowLoading {

    public void showLoading(String options, JSCallback callback, Context Context) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        ModalBean bean = parseManager.parseObject(options, ModalBean.class);
        ModalManager.BmLoading.showLoading(Context, bean.getMessage(), false);
        if (callback != null) {
            callback.invoke(null);
        }
    }

}
