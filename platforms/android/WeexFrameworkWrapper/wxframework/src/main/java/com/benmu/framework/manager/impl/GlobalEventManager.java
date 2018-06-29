package com.benmu.framework.manager.impl;

import com.benmu.framework.manager.Manager;
import com.taobao.weex.WXSDKInstance;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2017/8/7.
 */

public class GlobalEventManager extends Manager {
    public static final String TYPE_OPEN = "open";
    public static final String TYPE_BACK = "back";
    public static final String TYPE_REFRESH = "refresh";

    public static void onViewWillAppear(WXSDKInstance instance, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        instance.fireGlobalEventCallback("viewWillAppear", map);
    }

    public static void onViewDidAppear(WXSDKInstance instance, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        instance.fireGlobalEventCallback("viewDidAppear", map);

    }

    public static void onViewWillDisappear(WXSDKInstance instance, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        instance.fireGlobalEventCallback("viewWillDisappear", map);
    }

    public static void onViewDidDisappear(WXSDKInstance instance, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        instance.fireGlobalEventCallback("viewDidDisappear", map);
    }


    public static void appDeactive(WXSDKInstance instance) {
        if (instance != null) {
            instance.fireGlobalEventCallback("appDeactive", null);
        }

    }


    public static void appActive(WXSDKInstance instance) {
        if (instance != null) {
            instance.fireGlobalEventCallback("appActive", null);
        }

    }

    public static void pushMessage(WXSDKInstance instance, Map<String, Object> map) {
        if (instance != null) {
            instance.fireGlobalEventCallback("pushMessage", map);
        }

    }

    public static void homeBack(WXSDKInstance instance){
        if (instance != null) {
            instance.fireGlobalEventCallback("homeBack", null);
        }
    }

    public static void screenShotFinish(WXSDKInstance instance) {
        if (instance != null) {
            instance.fireGlobalEventCallback("screenshotFeedback", null);
        }
    }
}
