package com.lfg.weex.extend.module;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;

import com.benmu.framework.adapter.router.RouterTracker;

import com.benmu.framework.utils.AppUtils;

import com.benmu.framework.utils.SharePreferenceUtil;
import com.lfg.weex.service.WebSocketService;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by lfg on 2017/11/29.
 */

public class WXZyToolsModule extends WXModule {
    @JSMethod(uiThread=false)
    public void quit() {
        RouterTracker.popStackFrame();
    }

    @JSMethod(uiThread = false)
    public void moveTaskToFront() {
        ActivityManager am = (ActivityManager) WXEnvironment.sApplication.getSystemService(Context.ACTIVITY_SERVICE);
        am.moveTaskToFront(((Activity)mWXSDKInstance.getContext()).getTaskId(), ActivityManager.MOVE_TASK_WITH_HOME);
    }
    @JSMethod(uiThread = false)
    public void moveTaskToBack() {
        ((Activity)mWXSDKInstance.getContext()).moveTaskToBack(true);
    }


    @JSMethod(uiThread=false)
    public void getJsVersion(JSCallback callback) {
        String version = AppUtils.getJsVersion(WXEnvironment.sApplication);
        if (callback != null) {
            callback.invoke(version);
        }
    }

    @JSMethod(uiThread=false)
    public void updateApp(String url, String version, JSCallback callback) {
        if (!WebSocketService.isDownloading) {
            Intent intent = new Intent(mWXSDKInstance.getContext(), WebSocketService.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra("url", url);
            intent.putExtra("version", version);
            mWXSDKInstance.getContext().startService(intent);
            callback.invoke(true);
        } else {
            callback.invoke(false);
        }
    }
    @JSMethod(uiThread = false)
    public void getUpdateInfo(JSCallback callback) {
        String info = SharePreferenceUtil.getUpdateInfo(mWXSDKInstance.getContext());
        if (callback != null) {
            callback.invoke(info);
        }
    }
}
