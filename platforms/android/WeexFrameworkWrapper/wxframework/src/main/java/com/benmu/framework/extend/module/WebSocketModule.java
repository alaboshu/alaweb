package com.benmu.framework.extend.module;

import android.util.Log;

import com.benmu.framework.extend.adapter.LightlyWebSocketAdapter;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.appfram.websocket.IWebSocketAdapter;
import com.taobao.weex.appfram.websocket.WebSocketCloseCodes;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.utils.WXLogUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Carry on 2018/1/4.
 */

public class WebSocketModule extends WXSDKEngine.DestroyableModule {

    private static final String TAG = "WebSocketModule";
    private static final String KEY_DATA = "data";
    private static final String KEY_CODE = "code";
    private static final String KEY_REASON = "reason";
    private static final String KEY_WAS_CLEAN = "wasClean";
    private IWebSocketAdapter webSocketAdapter;
    private JSCallback onOpen;
    private JSCallback onMessage;
    private JSCallback onClose;
    private JSCallback onError;
    private IWebSocketAdapter.EventListener eventListener = new IWebSocketAdapter.EventListener() {
        @Override
        public void onOpen() {
            if (onOpen != null) {
                Log.e(TAG,"onOpen>>>>>>");
                onOpen.invoke(new HashMap<>(0));
            }
        }

        @Override
        public void onMessage(String data) {
            Log.e(TAG,"onMessage>>>>>>"+data);
            if (onMessage != null) {
                Map<String, String> msg = new HashMap<>(1);
                msg.put(KEY_DATA, data);
                onMessage.invokeAndKeepAlive(msg);
            }
        }

        @Override
        public void onClose(int code, String reason, boolean wasClean) {
            Log.e(TAG,"onClose>>>>>>");
            if (onClose != null) {
                Map<String, Object> msg = new HashMap<>(3);
                msg.put(KEY_CODE, code);
                msg.put(KEY_REASON, reason);
                msg.put(KEY_WAS_CLEAN, wasClean);
                onClose.invoke(msg);
            }
        }

        @Override
        public void onError(String msg) {
            Log.e(TAG,"onError>>>>>>");
            if (onError != null) {
                Map<String, String> info = new HashMap<>(1);
                info.put(KEY_DATA, msg);
                onError.invokeAndKeepAlive(info);
            }
        }
    };

    @JSMethod
    public void webSocket(String url, String protocol) {
        webSocketAdapter = mWXSDKInstance.getWXWebSocketAdapter();
        Log.e("webSocket","this>>>>>"+this+"id>>>>>"+mWXSDKInstance.getInstanceId());
        if (!reportErrorIfNoAdapter()) {
            LightlyWebSocketAdapter bmWebSocketAdapter =
                    (LightlyWebSocketAdapter) webSocketAdapter;
            bmWebSocketAdapter.connect(url, protocol, eventListener, mWXSDKInstance.getInstanceId
                    ());
        }
    }

    @JSMethod
    public void send(String data) {
        Log.e(TAG,"send>>>>>>"+data+this);
        if (!reportErrorIfNoAdapter()) {
            LightlyWebSocketAdapter bmWebSocketAdapter =
                    (LightlyWebSocketAdapter) webSocketAdapter;
            bmWebSocketAdapter.send(data,mWXSDKInstance.getInstanceId());
        }
    }

    @JSMethod
    public void close(String code, String reason) {
        if (!reportErrorIfNoAdapter()) {
            Log.e(TAG,"close>>>>>>"+reason);
            int codeNumber = WebSocketCloseCodes.CLOSE_NORMAL.getCode();
            if (code != null) {
                try {
                    codeNumber = Integer.parseInt(code);
                } catch (NumberFormatException e) {
                    //ignore
                }
            }
            LightlyWebSocketAdapter bmWebSocketAdapter =
                    (LightlyWebSocketAdapter) webSocketAdapter;
            bmWebSocketAdapter.close(codeNumber, reason,mWXSDKInstance.getInstanceId());
        }
    }

    @JSMethod
    public void onopen(JSCallback callback) {
        this.onOpen = callback;
    }

    @JSMethod
    public void onmessage(JSCallback callback) {
        this.onMessage = callback;
    }

    @JSMethod
    public void onclose(JSCallback callback) {
        this.onClose = callback;
    }

    @JSMethod
    public void onerror(JSCallback callback) {
        this.onError = callback;
    }


    private boolean reportErrorIfNoAdapter() {
        if (webSocketAdapter == null || !(webSocketAdapter instanceof
                LightlyWebSocketAdapter)) {
            if (eventListener != null) {
                eventListener.onError("No implementation found for IWebSocketAdapter");
            }
            WXLogUtils.e(TAG, "No implementation found for IWebSocketAdapter");
            return true;
        }
        return false;
    }


    /**
     * destroy module
     */
    @Override
    public void destroy() {
        if (webSocketAdapter != null) {
            webSocketAdapter.destroy();
        }
        eventListener = null;
    }
}
