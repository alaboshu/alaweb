package com.benmu.framework.extend.module;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by liuyuanxiao on 17/12/29.
 */

public class CommunicationModule extends WXModule {
    @JSMethod
    public void call(String params) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_CALL);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod
    public void sms(String recipients, String params, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_COMMUNICATION_SMS);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        weexEventBean.setJscallback(callback);
        weexEventBean.setExpand(recipients);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod
    public void contacts(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_COMMUNICATION_CONTACTS);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
}
