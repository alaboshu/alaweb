package com.benmu.framework.extend.module;


import com.benmu.framework.model.WeexEnvironment;
import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.constant.WXConstant;
/**
 * Js交互键盘退出
 */
public class ToolModule extends WXModule {
    private WeexEnvironment mEnv;

    @JSMethod
    public void resignKeyboard(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_RESIGNKEYBOARD);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }


    /**
     * 获取是否安装WeChat
     */
    @JSMethod
    public void isInstallWXApp(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_ISINSTALLWXAPP);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);

    }

    /**
     * 获取个推的Cid
     */
    @JSMethod
    public void getCid(JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_GETCID);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    /**
     * 复制字符串到粘贴板
     */
    @JSMethod
    public void copyString(String params, JSCallback callback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_COPYSTRING);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJscallback(callback);
        weexEventBean.setJsParams(params);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod(uiThread = true)
    public void scan(JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_CAMERA);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }
}
