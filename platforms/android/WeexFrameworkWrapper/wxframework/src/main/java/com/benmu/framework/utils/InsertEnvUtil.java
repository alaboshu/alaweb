package com.benmu.framework.utils;

import com.benmu.framework.BMWXEnvironment;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2017/10/23.
 */

public class InsertEnvUtil {
    private static Map<String,Object> mEros=new HashMap<>();

    public static void customerRender(Map<String, Object> options) {
        if (options != null) {
            mEros.clear();
            if (BMWXEnvironment.mCustomer != null) {
                mEros.putAll(BMWXEnvironment.mCustomer);
                options.put("eros", mEros);
            }
        }
    }
}
