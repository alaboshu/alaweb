package com.benmu.framework.debug.ws;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.activity.DebugActivity;
import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.adapter.ws.DefaultWebSocketAdapter;
import com.benmu.framework.adapter.ws.WSConfig;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.utils.DebugableUtil;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.benmu.framework.utils.TextUtil;
import com.squareup.otto.Subscribe;
import com.taobao.weex.appfram.websocket.IWebSocketAdapter;
import com.taobao.weex.appfram.websocket.WebSocketCloseCodes;


/**
 * 开发阶段 连接服务实时刷新页面
 * Created by liuyuanxiao on 18/3/15.
 */

public class DebuggerWebSocket {
    private DefaultWebSocketAdapter webSocketInstance;
    private MyWebSocketListener eventListent;
    private static final String TAG = "DebuggerWebSocket";
    private Handler mHandler;
    private boolean mActice;
    private Context context;

    public DebuggerWebSocket(Context context) {
        webSocketInstance = new DefaultWebSocketAdapter();
        eventListent = new MyWebSocketListener();
        mHandler = new Handler(Looper.getMainLooper());
        this.context = context;
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }


    public void init() {
        if (!checkIsOpenHotRefresh()) return;

        if (TextUtils.isEmpty(BMWXEnvironment.mPlatformConfig.getUrl().getSocketServer())) return;
        connect(BMWXEnvironment.mPlatformConfig.getUrl().getSocketServer());
    }

    private void connect(String url) {
        //connect when interceptor close
        if (!Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive
                (BMWXEnvironment.mApplicationContext)
        )) {
            Log.e(TAG, "connecting");
            mActice = true;
            //create new instance when webSocketInstance has connected
            if (webSocketInstance.isConnected()) {
                webSocketInstance = new DefaultWebSocketAdapter();
            }
            webSocketInstance.connect(url, "", eventListent, new WSConfig(true, 10));
            webSocketInstance.setConnected(true);
        } else {
            close();
            mActice = false;
        }
    }


    private class MyWebSocketListener implements IWebSocketAdapter.EventListener {

        @Override
        public void onOpen() {
            Log.e(TAG, "debug sockect has been connected!");
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(BMWXEnvironment.mApplicationContext, "debug socket connected.",
                            Toast
                                    .LENGTH_SHORT).show();
                }
            });
        }

        @Override
        public void onMessage(String data) {
            if (!checkIsOpenHotRefresh()) return;
            if (Instruction.REFRESH.equals(data)) {
                Activity peek = RouterTracker.peekActivity();
                if (peek instanceof AbstractWeexActivity) {
                    ((AbstractWeexActivity) peek).refresh();
                }
            }

        }

        @Override
        public void onClose(int code, String reason, boolean wasClean) {
            //重连
            mActice = false;
            Log.e(TAG, "debug socket disconnected.");
            reconnect();
        }

        @Override
        public void onError(String msg) {
            //重连
            mActice = false;
            Log.e(TAG, "debug socket disconnected.");
            reconnect();
        }
    }

    private void reconnect() {
        if (mActice) return;
        if (!checkIsOpenHotRefresh()) {
            close();
            return;
        }
        mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(BMWXEnvironment.mApplicationContext, "debug socket try " +
                        "reconnecting", Toast
                        .LENGTH_SHORT).show();
                webSocketInstance.reconnect();
            }
        }, 3000);
    }


    @Subscribe
    public void onEvent(Intent intent) {
        if (WXConstant.ACTION_INTERCEPTOR_SWTICH.equals(intent.getAction())) {
            //interceptor swtich
            if (!checkIsOpenHotRefresh()) {
                close();
                return;
            }
            if (TextUtils.isEmpty(BMWXEnvironment.mPlatformConfig.getUrl().getSocketServer()))
                return;
            connect(BMWXEnvironment.mPlatformConfig.getUrl().getSocketServer());
        }
    }

    //检查是否满足开启socket条件
    private boolean checkIsOpenHotRefresh() {
        //拦截器是否关闭
        if (Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive(context)))
            return false;
        //热刷新是否开启
        if (!SharePreferenceUtil.getHotRefreshSwitch(context)) return false;
        //是否是debug模式
        if (!DebugableUtil.isDebug()) return false;
        return true;
    }

    public void close() {
        if (webSocketInstance != null) {
            webSocketInstance.close(WebSocketCloseCodes.CLOSE_NORMAL.getCode(), "debug socket " +
                    "closed");
        }
    }
}
