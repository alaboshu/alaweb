package com.benmu.framework.extend.module;

import android.Manifest;
import android.app.Activity;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.WeexEventBean;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * Created by Carry on 17/2/8.
 */

public class CameraModule extends WXModule {
    private JSCallback mScanCallback;
    private AlertDialog dialog;
    private JSCallback mUploadAvatar;
    private JSCallback mScreenShotCallback;
    private int size;


    @JSMethod(uiThread = true)
    public void scan(JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_CAMERA);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }


    @JSMethod
    public void uploadImage(String params, JSCallback jsCallback) {
        if(Build.VERSION.SDK_INT>=23){
            String[] mPermissionList = new String[]{
                    Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.READ_EXTERNAL_STORAGE,
            };
            ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(), mPermissionList,23);
        }
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_CAMERA_UPLOADIMAGE);
        eventBean.setJsParams(params);
        eventBean.setJscallback(jsCallback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }
    @JSMethod
    public void cameraUpload(String params, JSCallback jsCallback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_CAMERA_PATH);
        eventBean.setJsParams(params);
        eventBean.setJscallback(jsCallback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }


    @JSMethod(uiThread = true)
    public void uploadScreenshot(JSCallback callback) {
        WeexEventBean eventBean = new WeexEventBean();
        eventBean.setContext(mWXSDKInstance.getContext());
        eventBean.setKey(WXConstant.WXEventCenter.EVENT_CAMERA_UPLOADSCREENSHOT);
        eventBean.setJscallback(callback);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(eventBean);
    }

}
