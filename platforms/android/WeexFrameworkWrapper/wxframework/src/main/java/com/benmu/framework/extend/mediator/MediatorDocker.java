package com.benmu.framework.extend.mediator;

import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.utils.InsertEnvUtil;
import com.squareup.otto.Subscribe;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2018/1/4.
 * 中介着容器
 */

public class MediatorDocker implements IWXRenderListener {
    public static final int STATUS_INIT = 0;
    public static final int STATUS_ACTIVE = 1;
    public static final int STATUS_INACTIVE = 2;
    public static final int STATUS_DESTORY = 3;
    private MediatorInstance mInstance;

    private static class InstanceDocker {
        private static MediatorDocker mInstance = new MediatorDocker();
    }

    public static MediatorDocker getInstance() {
        return InstanceDocker.mInstance;
    }

    private MediatorDocker() {

    }

    public void registe() {
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }

    /*
     激活中介者
     */
    public void active() {
        Log.e("MediatorDocker", mInstance + "");
        if (mInstance == null) {
            mInstance = new MediatorInstance(BMWXEnvironment.mApplicationContext);
        }
        int status = mInstance.getStatus();
        if (status == STATUS_INIT) {
            //render
            render();
        } else if (status == STATUS_ACTIVE) {
            //do nothing
        } else {
            //create instance and render
            destoryInstance();
            mInstance = new MediatorInstance(BMWXEnvironment.mApplicationContext);
            render();
        }
        Log.e("MediatorDocker", "active>>>>>" + status);

    }

    private void destoryInstance() {
        mInstance.destory();
        mInstance = null;
        Log.e("MediatorDocker", "destoryInstance>>>>>");
    }

    private void render() {
        String mediatorPage = getMediatorPath();
        if (!TextUtils.isEmpty(mediatorPage)) {
            Map<String, Object> options = new HashMap<>();
            options.put(WXSDKInstance.BUNDLE_URL, mediatorPage);
            InsertEnvUtil.customerRender(options);
            mInstance.getmInstance().registerRenderListener(this);
            mInstance.getmInstance().renderByUrl(
                    "BroadcastChannel",
                    mediatorPage,
                    options,
                    null,
                    WXRenderStrategy.APPEND_ASYNC);

        }

    }


    public String getMediatorPath() {
        return BMWXEnvironment.mPlatformConfig.getUrl().getJsServer() +
                "/dist/js" + BMWXEnvironment.mPlatformConfig.getPage().getMediatorPage();
    }


    @Override
    public void onViewCreated(WXSDKInstance instance, View view) {

    }

    @Override
    public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
        mInstance.setStatus(STATUS_ACTIVE);
        Log.e("MediatorDocker", "onRenderSuccess>>>>>" + mInstance.getStatus());
    }

    @Override
    public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {

    }

    @Override
    public void onException(WXSDKInstance instance, String errCode, String msg) {
        mInstance.setStatus(STATUS_INACTIVE);
        Log.e("MediatorDocker", "onException>>>>>" + mInstance.getStatus());
    }

    @Subscribe
    public void onEvent(Intent intent) {
        if (WXConstant.ACTION_WEEX_REFRESH.equals(intent.getAction())) {
            //refresh check mediator
            active();
        } else if (WXConstant.ACTION_INTERCEPTOR_SWTICH.equals(intent.getAction())) {
            //interceptor swtich
            mInstance.setStatus(STATUS_DESTORY);
            active();
        } else if (WXConstant.MEDIATOR_INIT.equals(intent.getAction())) {
            //init
            active();
        }

    }
}
