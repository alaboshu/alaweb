package com.benmu.framework.utils;

import com.benmu.framework.model.UniversalResultModule;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2018/1/3.
 */

public class JsPoster {
    public static void postSuccess(Object object, JSCallback callback) {
        postSuccess(object, null, callback);
    }


    public static void postFailed(JSCallback callback) {
        postFailed(null, callback);
    }

    public static void postFailed(String msg, JSCallback callback) {
        if (callback != null)
            callback.invoke(UniversalResultModule.obtainFailed(msg));
    }

    public static void postSuccess(Object object, String msg, JSCallback callback) {
        if (callback != null)
            callback.invoke(UniversalResultModule.obtainSuccess(object));
    }

    public static UniversalResultModule getSuccess(Object data) {
        return UniversalResultModule.obtainSuccess(data);
    }

    public static UniversalResultModule getFailed(String msg) {
        return UniversalResultModule.obtainFailed(msg);
    }

    public static UniversalResultModule getSuccess() {
        return getSuccess(null);
    }

    public static UniversalResultModule getFailed() {
        return getFailed(null);
    }
}
