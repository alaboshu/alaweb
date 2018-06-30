package com.benmu.framework.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.benmu.framework.constant.Constant;

import java.io.Serializable;

/**
 * Created by Carry on 17/2/8.
 */

public class SharePreferenceUtil {

    public static String getVersion(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString(Constant.SP.SP_VERSION, null);
        }
        return null;
    }


    public static void setVersion(Context context, String version) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString(Constant.SP.SP_VERSION, version).apply();
        }
    }


    public static void setDownLoadVersion(Context context, String version) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString(Constant.SP.SP_DOWNLOAD_VERSION, version).apply();
        }
    }

    public static String getDownLoadVersion(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString(Constant.SP.SP_DOWNLOAD_VERSION, null);
        }
        return null;
    }

    public static void setUpdateInfo(Context context, String version) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString("updateInfo", version).apply();
        }
    }
    public static String getUpdateInfo(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString("updateInfo", null);
        }
        return null;
    }
    public static boolean clearSp(Context context) {
        if (context != null) {
            SharedPreferences js = context.getSharedPreferences(Constant
                    .SP.SP_JS_NAME, Context.MODE_PRIVATE);

            return js.edit().clear().commit();
        }
        return false;
    }


    public static void setClientId(Context context, String cId) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString(Constant.SP.SP_CID, cId).apply();
        }
    }

    public static String getClientId(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString(Constant.SP.SP_CID, null);
        }
        return null;
    }

    public static boolean getHotRefreshSwitch(Context context){
        if (context == null) return false;
        SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getBoolean(Constant.SP.SP_HOTREFRESH_SWITCH, false);
    }
    public static void setHotRefreshSwitch(Context context, boolean isRefresh) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putBoolean(Constant.SP.SP_HOTREFRESH_SWITCH, isRefresh).apply();
        }
    }

    public static String getInterceptorActive(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString(Constant.SP.SP_INTERCEPTOR_ACTIVE, "");
        }
        return "";
    }

    public static void setInterceptorActive(Context context, String active) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString(Constant.SP.SP_INTERCEPTOR_ACTIVE, active).apply();
        }
    }

    public static void setAppFontSizeOption(Context context, String option) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            sharedPreferences.edit().putString(Constant.SP.SP_FONTSIZE, option).apply();
        }
    }

    public static String getAppFontSizeOption(Context context) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_NATIVE_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.getString(Constant.SP.SP_FONTSIZE, "NORM");
        }
        return null;
    }



    public static boolean putStringExtra(Context context, String key, String value) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP.SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.edit().putString(key, value).commit();
    }

    public static String getStringExtra(Context context, String key,
                                        String defValue) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP.SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.getString(key, defValue);
    }


    public static boolean putIntExtra(Context context, String key, int value) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP. SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.edit().putInt(key, value).commit();
    }

    public static int getIntExtra(Context context, String key, int defValue) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP.SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.getInt(key, defValue);
    }

    public static boolean putLongExtra(Context context, String key, long value) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP.SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.edit().putLong(key, value).commit();
    }

    public static long getLongExtra(Context context, String key, long defValue) {
        SharedPreferences preferences = context.getSharedPreferences(
                Constant.SP.SP_JS_NAME, Context.MODE_PRIVATE);
        return preferences.getLong(key, defValue);
    }


    public static boolean deleteData(Context context, String key) {
        if (context != null) {
            SharedPreferences sharedPreferences = context.getSharedPreferences(Constant
                    .SP.SP_JS_NAME, Context.MODE_PRIVATE);
            return sharedPreferences.edit().remove(key).commit();
        }
        return false;
    }

    public static boolean setData(Context context, String key, Serializable value) {
        if (context != null) {
            if (value instanceof Integer) {
                return putIntExtra(context, key, (Integer) value);
            } else if (value instanceof String) {
                return putStringExtra(context, key, (String) value);
            } else if (value instanceof Long) {
                return putLongExtra(context, key, (Long) value);
            } else {
                throw new RuntimeException("support value type !");
            }
        }
        return false;
    }

    public static <T> T getData(Context context, String key, Class<T> clazz) {
        if (context != null) {
            if (Integer.class == clazz) {
                return (T) (Integer.valueOf(getIntExtra(context, key, 0)));
            } else if (Long.class == clazz) {
                return (T) (Long.valueOf(getLongExtra(context, key, 0)));
            } else if (String.class == clazz) {
                return (T) getStringExtra(context, key, null);
            } else {
                return null;
            }
        }
        return null;
    }
}
