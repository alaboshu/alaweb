package com.benmu.framework.utils;

import android.content.Context;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.JsVersionInfoBean;
import com.taobao.weex.common.Constants;

import java.io.File;
import java.util.UUID;

/**
 * Created by Carry on 2017/7/11.
 */

public class AppUtils {
    public static int getFontWeight(Object fontWeight) {
        int typeFace = Typeface.NORMAL;
        if (fontWeight != null) {
            String s = fontWeight.toString();
            switch (s) {
                case "600":
                case "700":
                case "800":
                case "900":
                case Constants.Value.BOLD:
                    typeFace = Typeface.BOLD;
                    break;
            }
        }

        return typeFace;

    }

    /**
     * 比较版本号的大小,前者大则返回一个正数,后者大返回一个负数,相等则返回0
     */
    public static int compareVersion(String version1, String version2) {
        if (version1 == null || version2 == null) {
            return -1;
        }
        String[] versionArray1 = version1.split("\\.");//注意此处为正则匹配，不能用"."；
        String[] versionArray2 = version2.split("\\.");
        int idx = 0;
        int minLength = Math.min(versionArray1.length, versionArray2.length);//取最小长度值
        int diff = 0;
        while (idx < minLength
                && (diff = versionArray1[idx].length() - versionArray2[idx].length()) == 0//先比较长度
                && (diff = versionArray1[idx].compareTo(versionArray2[idx])) == 0) {//再比较字符
            ++idx;
        }
        //如果已经分出大小，则直接返回，如果未分出大小，则再比较位数，有子版本的为大；
        diff = (diff != 0) ? diff : versionArray1.length - versionArray2.length;
        return diff;
    }


    public static String getFileExtName(String filepath) {
        String ext = "";
        if (TextUtils.isEmpty(filepath)) return ext;
        File file = new File(filepath);
        String fileName = file.getName();
        if (fileName != null && fileName.length() > 0) {
            int dot = fileName.lastIndexOf(".");
            if ((dot > -1) && (dot < (fileName.length() - 1))) {
                ext = fileName.substring(dot + 1);
            }
        }
        return ext;
    }


    public static String getFileName(String filePath) {
        if (TextUtils.isEmpty(filePath)) return "";
        return new File(filePath).getName();
    }

    public static String getJsVersion(Context context) {
        String jsVersion = SharePreferenceUtil.getVersion(context);
        if (TextUtils.isEmpty(jsVersion)) {
            AssetsUtil.AssetsJsVersion assetsVersionInfo = AssetsUtil.getAssetsVersionInfo(context);
            if (assetsVersionInfo != null) {
                ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
                SharePreferenceUtil.setVersion(context, parseManager.toJsonString
                        (assetsVersionInfo));
            }
            return assetsVersionInfo == null ? "" : assetsVersionInfo.getJsVersion();
        }
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        JsVersionInfoBean jsVersionInfoBean = parseManager.parseObject(jsVersion,
                JsVersionInfoBean.class);

        return jsVersionInfoBean == null ? "" : jsVersionInfoBean.getJsVersion();
    }


    /**
     * 使用AndroidId和报名为种子生成的32位id
     * @param context
     * @return
     */
    @NonNull
    public static String getDeviceId(Context context) {

        String packageName = "";

        if (!TextUtils.isEmpty(context.getPackageName())) {
            packageName = context.getPackageName();
        }

        String androidid = "";
        String id = android.provider.Settings.Secure.getString(context.getContentResolver(),
                android.provider.Settings.Secure.ANDROID_ID);
        if (!TextUtils.isEmpty(id)) {
            androidid = id;
        }
        UUID deviceUuid = new UUID(androidid.hashCode(), ((long) packageName.hashCode() << 32));
        return Md5Util.getMd5code(deviceUuid.toString());
    }


}
