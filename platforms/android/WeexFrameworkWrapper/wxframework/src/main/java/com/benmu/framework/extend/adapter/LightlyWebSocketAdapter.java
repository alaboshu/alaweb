package com.benmu.framework.extend.adapter;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.benmu.framework.adapter.ws.BMWSCode;
import com.benmu.framework.adapter.ws.DefaultWebSocketAdapter;
import com.benmu.framework.constant.WXConstant;
import com.squareup.otto.Subscribe;
import com.taobao.weex.appfram.websocket.IWebSocketAdapter;

import java.util.LinkedHashMap;
import java.util.Map;


/**
 * Created by Carry on 2018/1/4.
 * a lightly websocket impl
 */

public class LightlyWebSocketAdapter implements IWebSocketAdapter {
    private LinkedHashMap<String, DefaultWebSocketAdapter> mAdapters = new LinkedHashMap<>();

    @Override
    public void connect(String url, @Nullable String protocol, EventListener listener) {
        connect(url, protocol, listener, null);
    }

    @Override
    public void send(String data) {
        send(data, null);
    }

    @Override
    public void close(int code, String reason) {
        close(code, reason, null);
    }

    @Override
    public void destroy() {
        //destroy all instance
        for (Map.Entry<String, DefaultWebSocketAdapter> entry : mAdapters.entrySet()) {
            entry.getValue().destroy(BMWSCode.MODULE_DESTROY.getCode(), BMWSCode.MODULE_DESTROY
                    .getReason());
        }
        mAdapters.clear();
    }

    public void connect(String url, String protocol, EventListener listener, String instanceId) {
        if (TextUtils.isEmpty(instanceId)) {
            //invalidate instanceId
            listener.onError(BMWSCode.INVALID_INSTANCEID.getReason());
            return;
        }

        DefaultWebSocketAdapter defaultWebSocketAdapter = mAdapters.get(instanceId);
        if (defaultWebSocketAdapter != null) {
            // mutli adapter for this instanceId
            //destory adapter
            defaultWebSocketAdapter.destroy(BMWSCode.REPEAT_WEBSOCKET.getCode(), BMWSCode
                    .REPEAT_WEBSOCKET.getReason());
            newInstance(instanceId, url, protocol, listener);
            //create
        } else {
            //create
            newInstance(instanceId, url, protocol, listener);
        }


    }


    private void newInstance(String instanceId, String url, String protocol, EventListener
            listener) {
        DefaultWebSocketAdapter webSocketInstance = new DefaultWebSocketAdapter();
        webSocketInstance.connect(url, protocol, listener, null);
        mAdapters.put(instanceId, webSocketInstance);
    }

    public void send(String data, String instanceId) {
        DefaultWebSocketAdapter webSocketInstance = mAdapters.get(instanceId);
        if (webSocketInstance != null) {
            webSocketInstance.send(data);
        }
    }

    public void close(int codeNumber, String reason, String instanceId) {
        DefaultWebSocketAdapter webSocketInstance = mAdapters.get(instanceId);
        if (webSocketInstance != null) {
            webSocketInstance.close(codeNumber, reason);
        }
    }


    @Subscribe
    public void onEvent(Intent intent) {
        if (WXConstant.ACTION_WEEX_REFRESH.equals(intent.getAction())) {
            //refresh check mediator
            String instanceId = intent.getStringExtra("instanceId");
            if (!TextUtils.isEmpty(instanceId)) {
                DefaultWebSocketAdapter defaultWebSocketAdapter = mAdapters.get(instanceId);
                if (defaultWebSocketAdapter != null) {
                    //instance has destroy
                    defaultWebSocketAdapter.destroy(BMWSCode.INVALID_INSTANCEID.getCode(),
                            BMWSCode.INVALID_INSTANCEID.getReason());
                    mAdapters.remove(instanceId);
                }
            }
        }
    }

}
