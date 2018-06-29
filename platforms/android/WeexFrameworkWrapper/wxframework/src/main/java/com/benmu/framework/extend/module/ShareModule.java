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
 * Created by Carry on 17/2/24.
 */

public class ShareModule extends WXModule {
    @JSMethod
    public void share(String params, JSCallback success, JSCallback fail) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_SHARE);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ArrayList<JSCallback> callbacks = new ArrayList<>();
        callbacks.add(success);
        callbacks.add(fail);
        weexEventBean.setCallbacks(callbacks);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
//        if (params == null) {
//            return;
//        }
//        ShareBean shareBean = BMJsonParsManager.parseObject(params, ShareBean.class);
//        BMShareManager.getInstance().share((Activity) mWXSDKInstance.getContext(), shareBean,
//                mWXSDKInstance.getContainerView(), success, fail);

    }

    @JSMethod
    public void relayToFriend(String params, JSCallback successCallback, JSCallback
            failedCallback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_RELAYTOFRIEND);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ArrayList<JSCallback> callbacks = new ArrayList<>();
        callbacks.add(successCallback);
        callbacks.add(failedCallback);
        weexEventBean.setCallbacks(callbacks);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }

    @JSMethod
    public void relayToCricle(String params, JSCallback successCallback, JSCallback
            failedCallback) {
        WeexEventBean weexEventBean = new WeexEventBean();
        weexEventBean.setKey(WXConstant.WXEventCenter.EVENT_RELAYTOCRICLE);
        weexEventBean.setContext(mWXSDKInstance.getContext());
        weexEventBean.setJsParams(params);
        ArrayList<JSCallback> callbacks = new ArrayList<>();
        callbacks.add(successCallback);
        callbacks.add(failedCallback);
        weexEventBean.setCallbacks(callbacks);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(weexEventBean);
    }
}
