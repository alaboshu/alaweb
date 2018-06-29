package com.benmu.framework.manager.impl;

import android.content.Context;
import android.content.res.XmlResourceParser;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.Manager;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.model.PlatformConfigBean;
import com.benmu.framework.utils.AESUtils;
import com.benmu.framework.utils.AssetsUtil;
import com.benmu.framework.utils.L;
import com.benmu.framework.utils.XmlUtil;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2017/8/7.
 */

public class CustomerEnvOptionManager extends Manager {
    private static final String TAG = "AppConfigModule";
    private static final boolean DEBUG = false;
    private static HashMap<String, String> sComponents = new HashMap<>();
    private static HashMap<String, String> sModules = new HashMap<>();

    public static void init(Context context) {
        loadAppSettings(context);
    }

    private static void loadAppSettings(Context context) {
        int id = context.getResources().getIdentifier("app_config", "xml", context.getClass()
                .getPackage().getName());
        if (id == 0) {
            // If we couldn't find config.xml there, we'll look in the namespace from
            // AndroidManifest.xml
            id = context.getResources().getIdentifier("app_config", "xml", context.getPackageName
                    ());
            if (id == 0) {
                L.e(TAG, "res/xml/config.xml is missing!");
                return;
            }
        }
        XmlResourceParser parser = context
                .getResources()
                .getXml(id);
        try {
            XmlUtil.beginDocument(parser, "app_config");
            while (true) {
                XmlUtil.nextElement(parser);
                String tag = parser.getName();
                if (tag == null) {
                    break;
                }
                String name = parser.getAttributeName(0);
                String value = parser.getAttributeValue(0);
                String text = null;
                if (parser.next() == XmlPullParser.TEXT) {
                    text = parser.getText();
                }
                if (DEBUG) {
                    Log.v(TAG, "tag: " + tag + " value: " + value);
                }
                if ("name".equalsIgnoreCase(name)) {
                    if ("bool".equals(tag)) {
                    } else if ("int".equals(tag)) {
                    } else if ("string".equals(tag)) {
                    } else if ("component".equals(tag)) {
                        sComponents.put(value, text);
                    } else if ("module".equals(tag)) {
                        sModules.put(value, text);
                    }
                }
            }
        } catch (XmlPullParserException e) {
            Log.e(TAG, "loadAppSettings caught ", e);
        } catch (NumberFormatException e) {
            Log.e(TAG, "loadAppSettings caught ", e);
        } catch (IOException e) {
            Log.e(TAG, "loadAppSettings caught ", e);
        } finally {
            parser.close();
        }
    }

    public static HashMap<String, String> getComponents() {
        return sComponents;
    }

    public static void setComponents(HashMap<String, String> components) {
        CustomerEnvOptionManager.sComponents = components;
    }

    public static HashMap<String, String> getModules() {
        return sModules;
    }


    public static void setModules(HashMap<String, String> modules) {
        CustomerEnvOptionManager.sModules = modules;
    }

    public static void registerComponent(String name, String className) {
        try {
            Class clazz = Class.forName(className.trim());
            WXSDKEngine.registerComponent(name, clazz);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (WXException e) {
            e.printStackTrace();
        }

    }

    public static void registerModule(String name, String className) {
        try {
            Class clazz = Class.forName(className);
            WXSDKEngine.registerModule(name, clazz);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (WXException e) {
            e.printStackTrace();
        }
    }

    public static void registerComponents(HashMap<String, String> components) {
        for (Map.Entry<String, String> component : components.entrySet()) {
            registerComponent(component.getKey(), component.getValue());
        }
    }

    public static void registerModules(HashMap<String, String> modules) {
        for (Map.Entry<String, String> module : modules.entrySet()) {
            registerModule(module.getKey(), module.getValue());
        }
    }

    public static void registerCustomConfig(HashMap<String, String> configs) {
        for (Map.Entry<String, String> config : configs.entrySet()) {
            if (!TextUtils.isEmpty(config.getValue()))
                WXSDKEngine.addCustomOptions(config.getKey(), config.getValue());
        }
    }

    public static PlatformConfigBean initPlatformConfig(Context context) {
        String platform = AssetsUtil.getFromAssets(context, Constant.PLATFORM_CONFIG_NAME);
        try {
            AESUtils aesUtils = new AESUtils();
            platform = aesUtils.decrypt(platform, Constant.AES_KEY, "RjatRGC4W72PJXTE");
        } catch (Exception e) {
            e.printStackTrace();
        }
        Log.d("PlatformConfigBean", "PlatformConfigBean -> " + platform);
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        return parseManager.parseObject(platform,
                PlatformConfigBean.class);
    }
}
