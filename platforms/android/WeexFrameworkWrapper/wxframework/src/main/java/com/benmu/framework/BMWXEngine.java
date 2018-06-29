package com.benmu.framework;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;

import com.alibaba.android.bindingx.plugin.weex.BindingX;
import com.benmu.framework.adapter.BMDefaultUriAdapter;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.event.DispatchEventCenter;
import com.benmu.framework.event.mediator.EventCenter;
import com.benmu.framework.extend.adapter.BMTypefaceAdapter;
import com.benmu.framework.extend.adapter.DefaultWXHttpAdapter;
import com.benmu.framework.extend.adapter.DefaultWXImageAdapter;
import com.benmu.framework.extend.adapter.LightlyWebSocketFactory;
import com.benmu.framework.extend.mediator.MediatorDocker;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.AxiosManager;
import com.benmu.framework.manager.impl.CustomerEnvOptionManager;
import com.benmu.framework.utils.AppUtils;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.DebugableUtil;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;
import com.taobao.weex.dom.RichTextDomObject;
import com.taobao.weex.dom.WXTextDomObject;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.umeng.analytics.MobclickAgent;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.util.HashMap;
import java.util.Map;

import me.ele.patch.BsPatch;

/**
 * Created by Carry on 2017/8/23.
 */

public class BMWXEngine {
    public static void initialize(Application context, BMInitConfig initConfig) {
        initPatch(context);
        initPlatformConfig(context);
        initConing(context, initConfig);
        engineStart(context);
        registerBMComponentsAndModules(context);
        initHttpClient(context);
        initInterceptor(context, initConfig);
        initDispatchCenter();
        DebugableUtil.syncIsDebug(context);
        initWeChat(context);
        initUmeng(context);
        EventCenter.getInstance().init();
//        initMap();
        PlugManager.initPlug();
        initBindingx();
    }

    private static void initBindingx() {
        // register bindingx module manually
        try {
            BindingX.register();
        } catch (WXException e) {
            Log.e("BMWXEngine", "initBindingx error -> " + e.getMessage());
        }
    }

    private static void initPatch(Application context) {
        BsPatch.init(context);
    }


    private static void initUmeng(Application context) {
        boolean enabled = BMWXEnvironment.mPlatformConfig.getUmeng().isEnabled();
        String androidAppKey = BMWXEnvironment.mPlatformConfig.getUmeng().getAndroidAppKey();
        if (enabled && !TextUtils.isEmpty(androidAppKey)) {
            MobclickAgent.setDebugMode(DebugableUtil.isDebug());
            MobclickAgent.openActivityDurationTrack(false);
            MobclickAgent.setCatchUncaughtExceptions(!DebugableUtil.isDebug());
            MobclickAgent.setScenarioType(context, MobclickAgent.EScenarioType.E_UM_NORMAL);
            PlatformConfig.setWeixin(BMWXEnvironment.mPlatformConfig.getWechat().getAppId(),
                    BMWXEnvironment.mPlatformConfig.getWechat().getAppSecret());
            PlatformConfig.setSinaWeibo(BMWXEnvironment.mPlatformConfig.getWeibo().getAppId(),
                    BMWXEnvironment.mPlatformConfig.getWeibo().getAppSecret(), "https://sns.whalecloud.com/sina2/callback");
            PlatformConfig.setQQZone(BMWXEnvironment.mPlatformConfig.getQQ().getAppId(),
                    BMWXEnvironment.mPlatformConfig.getQQ().getAppKey());
            UMShareAPI.get(context);
        }
    }


    private static void initWeChat(Context context) {
        boolean enabled = BMWXEnvironment.mPlatformConfig.getWechat().isEnabled();
        String appId = BMWXEnvironment.mPlatformConfig.getWechat().getAppId();
        if (enabled && !TextUtils.isEmpty(appId)) {
            BMWXEnvironment.mWXApi = WXAPIFactory.createWXAPI(context, appId, true);
        }
    }


    private static void initDispatchCenter() {
        DispatchEventCenter.getInstance().register();
        MediatorDocker.getInstance().registe();
    }

    private static void initPlatformConfig(Application context) {
        BMWXEnvironment.mPlatformConfig = CustomerEnvOptionManager.initPlatformConfig
                (context);
        BMWXEnvironment.mApplicationContext = context;
    }

    private static void initInterceptor(Application context, BMInitConfig initConfig) {
        String activeState = SharePreferenceUtil.getInterceptorActive(context);

        if (!Constant.INTERCEPTOR_DEACTIVE.equals(activeState)) {
            if (initConfig != null) {
                SharePreferenceUtil.setInterceptorActive(context, initConfig.getmActice());
            }
        }

    }

    private static void initHttpClient(Application context) {
        ManagerFactory.getManagerService(AxiosManager.class).initClient(context);
    }

    private static void registerBMComponentsAndModules(Application context) {
        CustomerEnvOptionManager.init(context);
        CustomerEnvOptionManager.registerComponents(CustomerEnvOptionManager.getComponents());
        CustomerEnvOptionManager.registerModules(CustomerEnvOptionManager.getModules());
        try {
            registerCustomDomObject();
        } catch (WXException e) {
            e.printStackTrace();
        }
    }

    private static void registerCustomDomObject() throws WXException {
        WXSDKEngine.registerDomObject("bmtext", WXTextDomObject.class);
        WXSDKEngine.registerDomObject("bmspan", WXTextDomObject.class);
        WXSDKEngine.registerDomObject("bmrichtext", RichTextDomObject.class);
    }


    private static void engineStart(Application app) {
        WXSDKEngine.initialize(app,
                new InitConfig.Builder()
                        .setImgAdapter(new DefaultWXImageAdapter())
                        .setHttpAdapter(new DefaultWXHttpAdapter(app))
                        .setWebSocketAdapterFactory(new LightlyWebSocketFactory())
                        .setTypefaceAdapter(new BMTypefaceAdapter(app))
                        .setURIAdapter(new BMDefaultUriAdapter())
                        .build()
        );
    }

    private static void initConing(Application context, BMInitConfig initConfig) {
        if (initConfig == null) return;
        initConfig.setmEnvs(WXEnvironment.getConfig());
        initEnv(initConfig.getmEnvs(), context);
    }

    private static void initEnv(Map<String, String> Env, Context context) {
        HashMap<String, String> insideEnv = new HashMap<>();
        insideEnv.put(Constant.CustomOptions.CUSTOM_APPNAME, BMWXEnvironment.mPlatformConfig
                .getAppName());
        insideEnv.put(Constant.CustomOptions.CUSTOM_SERVERURL, BMWXEnvironment.mPlatformConfig
                .getUrl()
                .getJsServer());
        insideEnv.put(Constant.CustomOptions.CUSTOM_REQUESTURL, BMWXEnvironment.mPlatformConfig
                .getUrl().getRequest());
        int statusBarHeight = BaseCommonUtil.getStatusBarHeight(context);
        insideEnv.put(Constant.CustomOptions.CUSTOM_STATUSBARHEIGHT, BaseCommonUtil
                .transferDimenToFE(context, statusBarHeight) + "");

        insideEnv.put(Constant.CustomOptions.CUSTOM_REALDEVICEHEIGHT, "" + BaseCommonUtil
                .transferDimenToFE(context, BaseCommonUtil.getRealDeviceHeight(context)));

        insideEnv.put(Constant.CustomOptions.CUSTOM_NAVBARHEIGHT, BaseCommonUtil
                .transferDimenToFE(context, BaseCommonUtil.dp2px(context, 44)) + "");
        insideEnv.put(Constant.CustomOptions.CUSTOM_JSVERSION, AppUtils.getJsVersion(context));
        insideEnv.put(Constant.CustomOptions.CUSTOM_DEVICEID, AppUtils.getDeviceId(context));
        String fontSize = SharePreferenceUtil.getAppFontSizeOption(context);
        insideEnv.put(Constant.CustomOptions.CUSTOM_FONTSIZE, fontSize);
        insideEnv.put(Constant.CustomOptions.CUSTOM_FONTSCALE, BaseCommonUtil.getScaleByFontsize
                (fontSize) + "");

        Resources resources = context.getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();

        insideEnv.put(Constant.CustomOptions.CUSTOM_DEVICEHEIGHT, String.valueOf(dm.heightPixels));
        insideEnv.put(Constant.CustomOptions.CUSTOM_DEVICEWIDTH, String.valueOf(dm.widthPixels));

        if (Env != null && !Env.isEmpty()) {
            for (Map.Entry<String, String> entry : Env.entrySet()) {
                if (!TextUtils.isEmpty(entry.getValue())) {
                    insideEnv.put(entry.getKey(), entry.getValue());
                }
            }

        }
        BMWXEnvironment.mCustomer = insideEnv;
        CustomerEnvOptionManager.registerCustomConfig(insideEnv);
    }


}
