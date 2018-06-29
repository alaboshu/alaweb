package com.benmu.framework.extend.module;


import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;


/**
 * Created by Carry on 17/1/16.
 */

public class AxiosModule extends WXModule {

    @JSMethod(uiThread = false)
    public void fetch(String params, final JSCallback jsCallback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_FETCH);
        eventBean.setJsParams(params);
        eventBean.setJscallback(jsCallback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post
                (eventBean);
    }
    @JSMethod
    public void uploadImage(String params, final JSCallback jsCallback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_IMAGE_UPLOAD);
        eventBean.setJsParams(params);
        eventBean.setJscallback(jsCallback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post
                (eventBean);
    }

}
