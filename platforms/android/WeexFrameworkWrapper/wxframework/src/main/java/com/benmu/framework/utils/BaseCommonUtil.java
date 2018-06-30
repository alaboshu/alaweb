package com.benmu.framework.utils;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.Point;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;

/**
 * Created by Carry on 17/1/19.
 */

public class BaseCommonUtil {
    public static String getVersionName(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
            return packageInfo.versionName;
        } catch (Exception e) {
            return "";
        }
    }

    public static String getVersionCode(Context context) {
        try {
            PackageInfo pi = context.getPackageManager().getPackageInfo(context.getPackageName(),
                    0);
            return pi.versionCode + "";
        } catch (PackageManager.NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return 0 + "";
        }
    }

    public static float getScreenScale(Context context) {
        return context.getResources().getDisplayMetrics().density;
    }

    public static int dp2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    /**
     * px转dp
     */
    public static int px2dp(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    /**
     * sp转px
     */
    public static int sp2px(Context context, float spValue) {
        final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (spValue * fontScale + 0.5f);
    }

    /**
     * px转sp
     */
    public static int px2sp(Context context, float pxValue) {
        final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (pxValue / fontScale + 0.5f);
    }

    /**
     * @return 将色值转换成16进制
     */
    public static int getHexColor(String colorStirng) {
        return Color.parseColor(colorStirng);
    }


    public static void clearAllCookies(Context context) {
        CookieSyncManager.createInstance(context);
        CookieSyncManager.getInstance().startSync();
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.removeAllCookie();
        CookieSyncManager.getInstance().sync();
    }

    public static String getTopActivity(Context context) {
        String topActivityClassName = null;
        ActivityManager activityManager =
                (ActivityManager) (context.getSystemService(Context
                        .ACTIVITY_SERVICE));
        List<ActivityManager.RunningTaskInfo> runningTaskInfos = activityManager.getRunningTasks(1);
        if (runningTaskInfos != null && runningTaskInfos.size() > 0) {
            ComponentName f = runningTaskInfos.get(0).topActivity;
            topActivityClassName = f.getClassName();
        }
        return topActivityClassName;
    }

    public static boolean isAPPRunningForeground(Context context) {
        if (context != null) {
            String packageName = context.getPackageName();
            String topName = getTopActivity(context);
            return packageName != null && topName != null && topName.startsWith(packageName);
        } else {
            return false;
        }
    }


    public static int[] getWH(Activity context) {
        DisplayMetrics metrics = new DisplayMetrics();
        context.getWindow().getWindowManager().getDefaultDisplay()
                .getMetrics(metrics);
        int[] wh = new int[2];
        wh[0] = metrics.widthPixels;
        wh[1] = metrics.heightPixels;
        return wh;
    }

    public static float getScaleByFontsize(String fontsize) {
        switch (fontsize) {
            case "NORM":
                return 1f;
            case "BIG":
                return 1.15f;
            case "EXTRALARGE":
                return 1.3f;
            default:
                return 0;
        }
    }


    private static final String TAG = "WXTBUtil";

    private static boolean isSupportSmartBar = false;

    static {
        isSupportSmartBar = isSupportSmartBar();
    }

    public static int getDisplayWidth(AppCompatActivity activity) {
        int width = 0;
        if (activity != null && activity.getWindowManager() != null && activity.getWindowManager
                ().getDefaultDisplay() != null) {
            Point point = new Point();
            activity.getWindowManager().getDefaultDisplay().getSize(point);
            width = point.x;
        }
        return width;
    }

    public static int getDisplayHeight(AppCompatActivity activity) {
        int height = 0;
        if (activity != null && activity.getWindowManager() != null && activity.getWindowManager
                ().getDefaultDisplay() != null) {
            Point point = new Point();
            activity.getWindowManager().getDefaultDisplay().getSize(point);
            height = point.y;
        }

        Log.e(TAG, "isSupportSmartBar:" + isSupportSmartBar);

        if (isSupportSmartBar) {
            int smartBarHeight = getSmartBarHeight(activity);
            Log.e(TAG, "smartBarHeight:" + smartBarHeight);
            height -= smartBarHeight;
        }

        if (activity != null && activity.getSupportActionBar() != null) {
            int actionbar = activity.getSupportActionBar().getHeight();
            if (actionbar == 0) {
                TypedArray actionbarSizeTypedArray = activity.obtainStyledAttributes(new
                        int[]{android.R.attr.actionBarSize});
                actionbar = (int) actionbarSizeTypedArray.getDimension(0, 0);
            }
            Log.d(TAG, "actionbar:" + actionbar);
            height -= actionbar;
        }

        int status = getStatusBarHeight(activity);
        Log.d(TAG, "status:" + status);

        height -= status;

        Log.d(TAG, "height:" + height);
        return height;
    }

    public static int getStatusBarHeight(Context context) {
        Class<?> c;
        Object obj;
        Field field;
        int x;
        int statusBarHeight = 0;
        try {
            c = Class.forName("com.android.internal.R$dimen");
            obj = c.newInstance();
            field = c.getField("status_bar_height");
            x = Integer.parseInt(field.get(obj).toString());
            statusBarHeight = context.getResources().getDimensionPixelSize(x);
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return statusBarHeight;
    }

    public static int transferDimenToFE(Context context, int origin) {
        int screenWidth = getScreenWidth(context);
        return Math.round(750f / screenWidth * origin);
    }


    public static int getScreenWidth(Context ctx) {
        return ctx == null ? 1080 : ctx.getResources().getDisplayMetrics().widthPixels;
    }


    public static int getSmartBarHeight(AppCompatActivity activity) {
        ActionBar actionbar = activity.getSupportActionBar();
        if (actionbar != null)
            try {
                Class c = Class.forName("com.android.internal.R$dimen");
                Object obj = c.newInstance();
                Field field = c.getField("mz_action_button_min_height");
                int height = Integer.parseInt(field.get(obj).toString());
                return activity.getResources().getDimensionPixelSize(height);
            } catch (Exception e) {
                e.printStackTrace();
                actionbar.getHeight();
            }
        return 0;
    }

    private static boolean isSupportSmartBar() {
        boolean hasSmartBar = false;
        try {
            final Method method = Build.class.getMethod("hasSmartBar");
            if (method != null) {
                hasSmartBar = true;
            }
        } catch (final Exception e) {
            // return false;
        }
        return hasSmartBar;
    }

    public static <T extends Exception> void throwIfNull(Object object, T e) throws T {
        if (object == null) {
            throw e;
        }
    }


    /**
     * 键盘是否关闭
     */
    public static boolean getKeyBoardState(Context context) {
        if (context instanceof Activity) {
            Activity activity = (Activity) context;
            InputMethodManager imm = (InputMethodManager) activity.getSystemService(activity
                    .INPUT_METHOD_SERVICE);
            if (imm != null) {
                imm.hideSoftInputFromWindow(activity.getWindow().getDecorView().getWindowToken(),
                        0);
                return true;
            }
        }
        return false;
    }

    /**
     * 是否安装微信
     */

    public static boolean isWeChatInstall(Context context) {
        final PackageManager packageManager = context.getPackageManager();
        // 获取packagemanager
        List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);
        // 获取所有已安装程序的包信息
        if (pinfo != null) {
            for (int i = 0; i < pinfo.size(); i++) {
                String pn = pinfo.get(i).packageName;
                if (pn.equals("com.tencent.mm")) {
                    return true;
                }
            }
        }

        return false;
    }

    public static void copyString(Context context, String content) {
        ClipboardManager manager = (ClipboardManager) context.getSystemService(Context
                .CLIPBOARD_SERVICE);
        manager.setPrimaryClip(ClipData.newPlainText("test", content));
    }


    public static ContentValues getVideoContentValues(Context paramContext, File paramFile, long
            paramLong) {
        ContentValues localContentValues = new ContentValues();
        localContentValues.put("title", paramFile.getName());
        localContentValues.put("_display_name", paramFile.getName());
        localContentValues.put("mime_type", "video/3gp");
        localContentValues.put("datetaken", Long.valueOf(paramLong));
        localContentValues.put("date_modified", Long.valueOf(paramLong));
        localContentValues.put("date_added", Long.valueOf(paramLong));
        localContentValues.put("_data", paramFile.getAbsolutePath());
        localContentValues.put("_size", Long.valueOf(paramFile.length()));
        return localContentValues;
    }


    public static String getExtensionName(String filename) {
        if ((filename != null) && (filename.length() > 0)) {
            int dot = filename.lastIndexOf('.');
            if ((dot > -1) && (dot < (filename.length() - 1))) {
                return filename.substring(dot + 1);
            }
        }
        return filename;
    }

    public static void updateVideoToGallery(Context context, String path) {
        File file = new File(path);
        //获取ContentResolve对象，来操作插入视频
        ContentResolver localContentResolver = context.getContentResolver();
        //ContentValues：用于储存一些基本类型的键值对
        ContentValues localContentValues = getVideoContentValues(context, file, System
                .currentTimeMillis());
        //insert语句负责插入一条新的纪录，如果插入成功则会返回这条记录的id，如果插入失败会返回-1。
        Uri localUri = localContentResolver.insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
                localContentValues);
    }

    public static int getRealDeviceHeight(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        DisplayMetrics dm = new DisplayMetrics();
        int height = 0;
        try {
            Class c;
            c = Class.forName("android.view.Display");
            @SuppressWarnings("unchecked")
            Method method = c.getMethod("getRealMetrics",DisplayMetrics.class);
            method.invoke(display, dm);
            height = dm.heightPixels;
        }catch (Exception e){
            e.printStackTrace();
            height = context.getResources().getDisplayMetrics().heightPixels;
        }

        return height;
    }

//    public static String getDeviceId(Context context) {
//        if (!PermissionManager.hasPermissions(context, Manifest.permission.READ_PHONE_STATE)) {
//            return Md5Util.getMd5code("JYT_NO_ACCESS_READ_PHONE_STATE");
//        }
//        TelephonyManager tm = (TelephonyManager) context.getSystemService(Context
//                .TELEPHONY_SERVICE);
//        String imei = "";
//        if (!TextUtils.isEmpty(tm.getDeviceId())) {
//            imei = tm.getDeviceId();
//        }
//        String androidid = "";
//        String id = android.provider.Settings.Secure.getString(context.getContentResolver(),
//                android.provider.Settings.Secure.ANDROID_ID);
//        if (!TextUtils.isEmpty(id)) {
//            androidid = id;
//        }
//        UUID deviceUuid = new UUID(androidid.hashCode(), ((long) imei.hashCode() << 32));
//        String uuid = deviceUuid.toString();
//        return Md5Util.getMd5code(imei + androidid + uuid);
//    }
//
//    public static String getAppChannel(Context context) {
//        String channel = SharePreferenceUtil.getAppChannel(context);
//        if (TextUtils.isEmpty(channel)) {
//            StringBuffer channelSource = new StringBuffer();
//            channelSource.append("ANDROID_").append(BaseCommonUtil.getVersionName(context))
//                    .append("_")
//                    .append(getDeviceId(context)).append("_").append(Build.VERSION.SDK_INT)
//                    .append("_").append(SharePreferenceUtil.getStringExtra(context, Constants
//                    .SP.SP_KEY_WH, "0*0"))
//                    .append("_").append(getChannel(context));
//            channel = channelSource.toString();
//            SharePreferenceUtil.setAppChannel(context, channel);
//        }
//
//        return channel;
//    }
//
//
//    public static String getChannel(Context context) {
//        try {
//            ApplicationInfo appInfo = context.getPackageManager().getApplicationInfo(context
//                    .getPackageName(), PackageManager.GET_META_DATA);
//            return appInfo.metaData.getString("UMENG_CHANNEL");
//        } catch (PackageManager.NameNotFoundException e) {
//            e.printStackTrace();
//        }
//        return "";
//    }

    }
