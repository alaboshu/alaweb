package com.benmu.framework.manager;

import android.text.TextUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2017/8/7. manager instance factory
 */

public class ManagerFactory {

    private static Map<String, Manager> mInstances = new HashMap();

    public static <T extends Manager> T getManagerService(Class<T> flag) {
        if (flag == null) throw new IllegalArgumentException("error flag");
        if (mInstances.get(flag.getName()) == null) {
            try {
                mInstances.put(flag.getName(), flag.newInstance());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return (T) mInstances.get(flag.getName());
    }

    public static <T extends Manager> T getManagerService(String clazzName) {
        if (TextUtils.isEmpty(clazzName)) throw new IllegalArgumentException("error flag");
        if (mInstances.get(clazzName) == null) {
            try {
                Class instanse = Class.forName(clazzName);
                mInstances.put(clazzName, (Manager) instanse.newInstance());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return (T) mInstances.get(clazzName);
    }
}
