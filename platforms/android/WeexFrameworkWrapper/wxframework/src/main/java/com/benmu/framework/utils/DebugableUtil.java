package com.benmu.framework.utils;

import android.content.Context;
import android.content.pm.ApplicationInfo;

/**
 * Created by Carry on 2017/9/14.
 */

public class DebugableUtil {
    private static Boolean isDebug = null;

    public static boolean isDebug() {
        return isDebug != null && isDebug.booleanValue();
    }

    public static void syncIsDebug(Context context) {
        if (isDebug == null) {
            isDebug = context.getApplicationContext() != null && (context.getApplicationInfo()
                    .flags &
                    ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        }
    }
}
