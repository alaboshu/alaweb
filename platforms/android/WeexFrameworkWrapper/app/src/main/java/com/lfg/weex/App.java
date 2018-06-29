package com.lfg.weex;

import android.app.Application;

import com.benmu.framework.BMWXApplication;
import com.lfg.weex.extend.module.WXZyToolsModule;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            WXSDKEngine.registerModule("zyTools", WXZyToolsModule.class);
        } catch (WXException e) {
            e.printStackTrace();
        }

        mInstance = this;
    }

}
