package com.benmu.framework.extend.module;

import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.constant.WXConstant;
import java.util.ArrayList;

/**
 * Created by Carry on 17/2/8.
 */

public class ModalModule extends WXModule {

    @JSMethod(uiThread = true)
    public void alert(String options, final JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_MODAL_ALERT);
        eventBean.setJsParams(options);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

    @JSMethod(uiThread = true)
    public void confirm(String options, final JSCallback cancel, final JSCallback ok) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_MODAL_CONFIRM);
        eventBean.setJsParams(options);
        ArrayList<JSCallback> jsCallbacks = new ArrayList<>();
        jsCallbacks.add(cancel);
        jsCallbacks.add(ok);
        eventBean.setCallbacks(jsCallbacks);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

    @JSMethod(uiThread = true)
    public void showLoading(String options, JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_MODAL_SHOWLOADING);
        eventBean.setJsParams(options);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

    @JSMethod(uiThread = true)
    public void hideLoading(JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_MODAL_DISMISSLOADING);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

    @JSMethod(uiThread = true)
    public void toast(String options) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_MODAL_TOAST);
        eventBean.setJsParams(options);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

}
