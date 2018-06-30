package com.benmu.framework.extend.module;

import android.content.Intent;
import android.text.TextUtils;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.event.mediator.EventCenter;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by Carry on 17/3/30.
 */

public class EventModule extends WXModule {
    @JSMethod
    public void on(String type, JSCallback callback) {
        if (!TextUtils.isEmpty(type) && callback != null) {
            EventCenter.Event event = new EventCenter.Event(mWXSDKInstance.getInstanceId(),
                    false, callback, mWXSDKInstance.getBundleUrl(), type);
            Intent on = new Intent(WXConstant.WXEventCenter.EVENT_JS_ON);
            on.putExtra("data", event);
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(on);
        }
    }

    @JSMethod
    public void once(String type, JSCallback callback) {
        if (!TextUtils.isEmpty(type) && callback != null) {
            EventCenter.Event event = new EventCenter.Event(mWXSDKInstance.getInstanceId(), true
                    , callback, mWXSDKInstance.getBundleUrl(), type);
            Intent once = new Intent(WXConstant.WXEventCenter.EVENT_JS_ON);
            once.putExtra("data", event);
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(once);
        }
    }

    @JSMethod
    public void emit(String type, Object params) {
        if (!TextUtils.isEmpty(type)) {
            Intent emit = new Intent(WXConstant.WXEventCenter.EVENT_JS_EMIT);
            emit.putExtra("data", new EventCenter.Emit(type, params));
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(emit);
        }
    }

    @JSMethod
    public void off(String type, JSCallback callback) {
        if (!TextUtils.isEmpty(type) && callback != null) {
            Intent off = new Intent(WXConstant.WXEventCenter.EVENT_JS_OFF);
            off.putExtra("data", new EventCenter.Off(type, callback));
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(off);
        }
    }

    @JSMethod
    public void offall() {
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(new Intent
                (WXConstant.WXEventCenter
                        .EVENT_JS_OFFALL));
    }
}
