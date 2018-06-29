package com.benmu.framework.extend.module;

import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.constant.WXConstant;
/**
 * Created by Carry on 17/1/12.
 */

public class TitleModule extends WXModule {


    @JSMethod(uiThread = true)
    public void set(String data) {
    }

    @JSMethod(uiThread = true)
    public void setRightItem(String json, final JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_RIGHTITEM);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setJsParams(json);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod(uiThread = true)
    public void setLeftItem(String json, final JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_LEFTITEM);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setJsParams(json);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


    @JSMethod(uiThread = true)
    public void setNavigationInfo(String json, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_NAVIGATIONINFO);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setJsParams(json);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);

    }

    @JSMethod(uiThread = true)
    public void setCenterItem(String json, final JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_CENTERITEM);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setJsParams(json);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


}
