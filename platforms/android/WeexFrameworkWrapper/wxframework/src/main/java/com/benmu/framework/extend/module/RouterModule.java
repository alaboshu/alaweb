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
 * Created by Carry on 17/1/11.
 */

public class RouterModule extends WXModule {

    @JSMethod(uiThread = true)
    public void open(String params, JSCallback backCallback, JSCallback resultCallback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_OPEN);
        eventBean.setJsParams(params);
        ArrayList<JSCallback> callBacks = new ArrayList<>();
        callBacks.add(backCallback);
        callBacks.add(resultCallback);
        eventBean.setCallbacks(callBacks);
        eventBean.setContext(mWXSDKInstance.getContext());
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }


    @JSMethod(uiThread = true)
    public void getParams(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_GETPARAMS);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod(uiThread = true)
    public void back(String params, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_BACK);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod(uiThread = true)
    public void finishPage(String params, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_FINISH);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
    @JSMethod(uiThread = true)
    public void finish(String params, JSCallback callback) {
        finishPage(params,callback);
    }


    @JSMethod(uiThread = true)
    public void getBackParams(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_GETBACKPARAMS);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


    @JSMethod
    public void refreshWeex(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_REFRESH);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


    @JSMethod
    public void toMap(String destination) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_TOMAP);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(destination);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod
    public void toWebView(String params) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_TOWEBVIEW);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


    @JSMethod(uiThread = true)
    public void openBrowser(String params, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_OPENBROWSER);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
    @JSMethod
    public void setHomePage(String params) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_SET_HOMEPAGE);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
    @JSMethod(uiThread = true)
    public void nav(String params){
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_NAV);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
}
