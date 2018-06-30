/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.utils;

import android.content.Intent;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.net.Uri;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;
import android.util.Log;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.adapter.IWXTypefaceAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;
import com.taobao.weex.dom.WXStyle;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.R.attr.typeface;

/**
 * Created by sospartan on 7/13/16.
 */
public class TypefaceUtil {
    public static final String FONT_CACHE_DIR_NAME = "font-family";
    private final static String TAG = "TypefaceUtil";
    private final static Map<String, FontDO> sCacheMap = new HashMap<>(); //Key: fontFamilyName

    public static final String ACTION_TYPE_FACE_AVAILABLE = "type_face_available";

    public static void putFontDO(FontDO fontDO) {
        if (fontDO != null && !TextUtils.isEmpty(fontDO.getFontFamilyName())) {
            sCacheMap.put(fontDO.getFontFamilyName(), fontDO);
        }
    }

    public static FontDO getFontDO(String fontFamilyName) {
        return sCacheMap.get(fontFamilyName);
    }

    public static void applyFontStyle(Paint paint, int style, int weight, String family) {
        int oldStyle;
        Typeface typeface = paint.getTypeface();
        if (typeface == null) {
            oldStyle = 0;
        } else {
            oldStyle = typeface.getStyle();
        }

        int want = 0;
        if ((weight == Typeface.BOLD)
                || ((oldStyle & Typeface.BOLD) != 0 && weight == WXStyle.UNSET)) {
            want |= Typeface.BOLD;
        }

        if ((style == Typeface.ITALIC)
                || ((oldStyle & Typeface.ITALIC) != 0 && style == WXStyle.UNSET)) {
            want |= Typeface.ITALIC;
        }

        if (family != null) {
            typeface = getOrCreateTypeface(family, want);
        }

        if (typeface != null) {
            paint.setTypeface(Typeface.create(typeface, want));
        } else {
            paint.setTypeface(Typeface.defaultFromStyle(want));
        }
    }

    public static Typeface getOrCreateTypeface(String family, int style) {
        FontDO fontDo = sCacheMap.get(family);
        if (fontDo != null && fontDo.getTypeface() != null) {
            return fontDo.getTypeface();
        }

        return Typeface.create(family, style);
    }

    private static void loadFromAsset(FontDO fontDo, String path) {
        try {
            Typeface typeface = Typeface.createFromAsset(WXEnvironment.getApplication().getAssets
                    (), path);
            if (typeface != null) {
                if (WXEnvironment.isApkDebugable()) {
                    WXLogUtils.d(TAG, "load asset file success");
                }
                fontDo.setState(FontDO.STATE_SUCCESS);
                fontDo.setTypeface(typeface);
            } else {
                WXLogUtils.e(TAG, "Font asset file not found " + fontDo.getUrl());
            }
        } catch (Exception e) {
            WXLogUtils.e(TAG, e.toString());
        }
    }

    public static void loadTypeface(final FontDO fontDo) {
        if (fontDo != null && fontDo.getTypeface() == null &&
                (fontDo.getState() == FontDO.STATE_FAILED || fontDo.getState() == FontDO
                        .STATE_INIT)) {
            fontDo.setState(FontDO.STATE_LOADING);
            if (fontDo.getType() == FontDO.TYPE_LOCAL) {
                Uri uri = Uri.parse(fontDo.getUrl());
                loadFromAsset(fontDo, uri.getPath().substring(1));//exclude slash
            } else if (fontDo.getType() == FontDO.TYPE_NETWORK) {
                //本木自定义加载方式
                carryTypeNetwork(fontDo);
            } else if (fontDo.getType() == FontDO.TYPE_FILE) {
                boolean result = loadLocalFontFile(fontDo.getUrl(), fontDo.getFontFamilyName());
                if (!result) {
                    fontDo.setState(FontDO.STATE_FAILED);
                }
            } else if (fontDo.getType() == FontDO.TYPE_UNKNOWN) {
                if (fontDo.getUrl().startsWith("bmlocal")) {
                    //加载本地iconFont
                    localBMLocalIcon(fontDo);
                }
            }
        }
    }

    private static void carryTypeNetwork(FontDO fontDO) {
        IWXTypefaceAdapter adapter = WXSDKManager.getInstance().getIWXTypefaceAdapter();
        String url = fontDO.getUrl();
        String fontFamily = fontDO.getFontFamilyName();
        //没有自定义适配器或关闭拦截器 按原有逻辑
        if (adapter == null || !adapter.isInterceptor()) {
            final String fileName = url.replace('/', '_').replace(':', '_');
            File dir = new File(getFontCacheDir());
            if (!dir.exists()) {
                dir.mkdirs();
            }
            final String fullPath = dir.getAbsolutePath() + File.separator + fileName;
            if (!loadLocalFontFile(fullPath, fontFamily)) {
                downloadFontByNetwork(url, fullPath, fontFamily);
            }
            return;
        }
        //设置了自定义适配器且拦截器开启
        File iconDir = adapter.getTypefaceDir();
        String fileName = url.replace('/', '_').replace(':', '_');
        File requireIcon = new File(iconDir, fileName);
        if (requireIcon.exists()) {
            //请求的有直接加载
            loadLocalFontFile(requireIcon.getAbsolutePath(), fontFamily);
        } else {
            //请求的本地没有
            File insideIcon = new File(iconDir, "iconfont.ttf");
            if (insideIcon.exists()) {
                //内置icon存在  先加载本地内置icon
                loadLocalFontFile(insideIcon.getAbsolutePath(), fontFamily);
            }
            //接着去下载这个icon
            if (!iconDir.exists()) {
                iconDir.mkdirs();
            }
            String downloadPath = new File(iconDir, fileName).getAbsolutePath();
            downloadFontByNetwork(url, downloadPath, fontFamily);
        }

    }

    private static void localBMLocalIcon(FontDO fontDo) {
        //得到当前httpAdapter
        IWXTypefaceAdapter typefaceAdapter = WXSDKManager.getInstance().getIWXTypefaceAdapter();
        if (typefaceAdapter == null) {
            Log.e("localBMLocalIcon", "未找到支持bmLocal的adapter");
            return;
        }

        if (typefaceAdapter.isInterceptor()) {
            //拦截器开启
            File iconDir = typefaceAdapter.getTypefaceDir();
            if (!iconDir.exists()) return;
            String url = fontDo.getUrl();
            String fontFamilyName = fontDo.getFontFamilyName();
            if (TextUtils.isEmpty(fontFamilyName) || TextUtils.isEmpty(url)) return;
            Uri parse = Uri.parse(url);
            File localIcon = new File(iconDir, parse.getPath());
            if (!localIcon.exists()) return;
            loadLocalFontFile(localIcon.getAbsolutePath(), fontFamilyName);
        } else {
            //自己去本地服务上下载
            String iconDownloadUrl = typefaceAdapter.getJsServer() + "/dist";
            if (TextUtils.isEmpty(iconDownloadUrl)) return;
            Uri parse = Uri.parse(fontDo.getUrl());
            String fetchUrl = iconDownloadUrl + "/" + parse.getHost() + parse.getPath();
            final String fileName = fetchUrl.replace('/', '_').replace(':', '_');
            File dir = new File(getFontCacheDir());
            if (!dir.exists()) {
                dir.mkdirs();
            }
            final String fullPath = dir.getAbsolutePath() + File.separator + fileName;
            downloadFontByNetwork(fetchUrl, fullPath, fontDo.getFontFamilyName());
        }

    }

    private static void downloadFontByNetwork(final String url, final String fullPath, final
    String fontFamily) {
        IWXHttpAdapter adapter = WXSDKManager.getInstance().getIWXHttpAdapter();
        if (adapter == null) {
            WXLogUtils.e(TAG, "downloadFontByNetwork() IWXHttpAdapter == null");
            return;
        }
        WXRequest request = new WXRequest();
        request.url = url;
        request.method = "GET";
        adapter.sendRequest(request, new IWXHttpAdapter.OnHttpListener() {
            @Override
            public void onHttpStart() {
                if (WXEnvironment.isApkDebugable()) {
                    WXLogUtils.d(TAG, "downloadFontByNetwork begin url:" + url);
                }
            }

            @Override
            public void onHeadersReceived(int statusCode, Map<String, List<String>> headers) {

            }

            @Override
            public void onHttpUploadProgress(int uploadProgress) {

            }

            @Override
            public void onHttpResponseProgress(int loadedLength) {

            }

            @Override
            public void onHttpFinish(WXResponse response) {
                int statusCode = 0;
                if (!TextUtils.isEmpty(response.statusCode)) {
                    try {
                        statusCode = Integer.parseInt(response.statusCode);
                    } catch (NumberFormatException e) {
                        statusCode = 0;
                        WXLogUtils.e(TAG, "IWXHttpAdapter onHttpFinish statusCode:" + response
                                .statusCode);
                    }
                }
                boolean result;
                if (statusCode >= 200 && statusCode <= 299 && response.originalData != null) {
                    result = WXFileUtils.saveFile(fullPath, response.originalData, WXEnvironment
                            .getApplication());
                    if (result) {
                        result = loadLocalFontFile(fullPath, fontFamily);
                    } else {
                        if (WXEnvironment.isApkDebugable()) {
                            WXLogUtils.d(TAG, "downloadFontByNetwork() onHttpFinish success, but " +
                                    "save file failed.");
                        }
                    }
                } else {
                    result = false;
                }

                if (!result) {
                    FontDO fontDO = sCacheMap.get(fontFamily);
                    if (fontDO != null) {
                        fontDO.setState(FontDO.STATE_FAILED);
                    }
                }
            }
        });
    }

    private static boolean loadLocalFontFile(String path, String fontFamily) {
        if (TextUtils.isEmpty(path) || TextUtils.isEmpty(fontFamily)) {
            return false;
        }
        try {
            File file = new File(path);
            if (!file.exists()) {
                return false;
            }
            Typeface typeface = Typeface.createFromFile(path);
            if (typeface != null) {
                FontDO fontDo = sCacheMap.get(fontFamily);
                if (fontDo != null) {
                    fontDo.setState(FontDO.STATE_SUCCESS);
                    fontDo.setTypeface(typeface);
                    if (WXEnvironment.isApkDebugable()) {
                        WXLogUtils.d(TAG, "load local font file success");
                    }

                    Intent intent = new Intent(ACTION_TYPE_FACE_AVAILABLE);
                    intent.putExtra("fontFamily", fontFamily);
                    LocalBroadcastManager.getInstance(WXEnvironment.getApplication())
                            .sendBroadcast(intent);
                    return true;
                }
            } else {
                WXLogUtils.e(TAG, "load local font file failed, can't create font.");
            }
        } catch (Exception e) {
            WXLogUtils.e(TAG, e.toString());
        }
        return false;
    }

    private static String getFontCacheDir() {
        return WXEnvironment.getDiskCacheDir(WXEnvironment.getApplication()) + "/" +
                FONT_CACHE_DIR_NAME;
    }
}
