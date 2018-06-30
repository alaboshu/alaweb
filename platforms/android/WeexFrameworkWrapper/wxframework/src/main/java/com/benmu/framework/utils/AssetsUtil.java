package com.benmu.framework.utils;

import android.content.Context;
import android.text.TextUtils;

import com.alibaba.fastjson.JSON;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;

/**
 * Assets 文件工具类
 */
public class AssetsUtil {

    /**
     * 读取assets 文件
     *
     * @param fileName 文件名称
     */
    public static String getFromAssets(Context context, String fileName) {
        try {
            InputStreamReader inputReader = new InputStreamReader(context.getResources()
                    .getAssets().open(fileName));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line;
            String Result = "";
            while ((line = bufReader.readLine()) != null)
                Result += line;
            return Result;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }


    public static AssetsJsVersion getAssetsVersionInfo(Context context) {
        String fromAssets = getFromAssets(context, "bundle.config");
        return JSON.parseObject(fromAssets, AssetsJsVersion.class);
    }

    /**
     * 获取assets pagers.config jsVersion
     */
    public static String getInsidesverison(Context context) {

        String fromAssets = getFromAssets(context, "pages.config");
        AssetsJsVersion assetsJsVersion = JSON.parseObject(fromAssets, AssetsJsVersion.class);
        if (assetsJsVersion != null && !TextUtils.isEmpty(assetsJsVersion.getJsVersion())) {
            return assetsJsVersion.getJsVersion();
        }
        return "";

    }


    /**
     * 复制assets 文件到指定目录
     *
     * @param fileName        文件名
     * @param destinationPath 指定目录的地址
     */
    public static boolean copyAssetsFile(Context context, String fileName, File destinationPath) {
        InputStream inputStream = null;
        FileOutputStream outputStream = null;
        try {
            inputStream = context.getResources().getAssets().open(fileName);
            outputStream = new FileOutputStream(destinationPath);
            byte[] buffer = new byte[1024];
            int length = 0;
            while ((length = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, length);
            }
            outputStream.flush();
            outputStream.close();
            inputStream.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * 解析JsVersionBeanm
     */
    public static class AssetsJsVersion implements Serializable {

        private String jsVersion;
        private String android;
        private String timestamp;

        public String getAndroid() {
            return android;
        }

        public void setAndroid(String android) {
            this.android = android;
        }

        public String getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(String timestamp) {
            this.timestamp = timestamp;
        }

        public String getJsVersion() {
            return jsVersion;
        }

        public void setJsVersion(String jsVersion) {
            this.jsVersion = jsVersion;
        }
    }


}
