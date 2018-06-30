package com.benmu.framework.adapter.ws;

import com.taobao.weex.appfram.websocket.IWebSocketAdapter;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.WebSocket;
import okhttp3.WebSocketListener;
import okio.ByteString;

/**
 * Created by Carry on 2017/10/27.
 */

public class DefaultWebSocketAdapter {
    private static final int INIT = 4;
    private static final int DISCONNECTED = 0;
    private static final int CONNECTING = 1;
    private static final int CONNECTED = 2;
    private static final int PINGINTERVAL = 1000;

    private static final String TAG = "DefaultWebSocketAdapter";
    private int CURRENT_STATUS;
    private OkHttpClient mClient;
    private Request mRequest;
    private String mUrl;
    private String mProtocol;
    private Lock mLock;
    private WebSocket mWebSocket;
    private IWebSocketAdapter.EventListener mEventListener;
    private WSConfig mConfig;
    private boolean mConnected;

    public DefaultWebSocketAdapter() {
        CURRENT_STATUS = INIT;
        mLock = new ReentrantLock();
    }


    public boolean isConnected() {
        return mConnected;
    }

    public void setConnected(boolean mConnected) {
        this.mConnected = mConnected;
    }

    private WebSocketListener mListener = new WebSocketListener() {
        @Override
        public void onOpen(WebSocket webSocket, Response response) {
            mWebSocket = webSocket;
            CURRENT_STATUS = CONNECTED;
            if (mEventListener != null) {
                mEventListener.onOpen();
            }
        }

        @Override
        public void onMessage(WebSocket webSocket, String text) {
            if (mEventListener != null) {
                mEventListener.onMessage(text);
            }
        }

        @Override
        public void onMessage(WebSocket webSocket, ByteString bytes) {
            if (mEventListener != null) {
                mEventListener.onMessage(bytes.toString());
            }
        }

        @Override
        public void onClosing(WebSocket webSocket, int code, String reason) {
            super.onClosing(webSocket, code, reason);
        }

        @Override
        public void onClosed(WebSocket webSocket, int code, String reason) {
            CURRENT_STATUS = DISCONNECTED;
            if (mEventListener != null) {
                mEventListener.onClose(code, reason, true);
            }
        }

        @Override
        public void onFailure(WebSocket webSocket, Throwable t, Response response) {
            CURRENT_STATUS = DISCONNECTED;
            if (mEventListener != null) {
                mEventListener.onError(response == null ? "" : response.message());
            }
        }
    };

    public void connect(String url, String protocol, IWebSocketAdapter.EventListener listener,
                        WSConfig config) {
        this.mUrl = url;
        this.mProtocol = protocol;
        this.mEventListener = listener;
        this.mConfig = config;
        if (CURRENT_STATUS == INIT) {
            initWebSocket();
        }
    }

    public void reconnect() {
        CURRENT_STATUS = INIT;
        initWebSocket();
    }

    public void send(String message) {
        boolean isSend = false;
        if (mWebSocket != null && CURRENT_STATUS == CONNECTED) {
            isSend = mWebSocket.send(message);
        }
        if (!isSend) {
            //发送失败
        }
    }

    public void close(int code, String reason) {
        if (mWebSocket != null && CURRENT_STATUS == CONNECTED) {
            mWebSocket.close(code, reason);
        }
    }

    public void destroy(int code, String reason) {
        if (mWebSocket != null) {
            mWebSocket.close(code, reason);
        }
        mWebSocket = null;
    }

    private void initWebSocket() {
        if (CURRENT_STATUS != INIT) return;
        CURRENT_STATUS = CONNECTING;
        if (mClient == null) {
            if (mConfig != null) {
                mClient = new OkHttpClient.Builder().retryOnConnectionFailure(mConfig
                        .isRetryOnConnectionFailure()).pingInterval(mConfig.getPingInterval(),
                        TimeUnit.SECONDS).build();
            } else {
                mClient = new OkHttpClient.Builder().retryOnConnectionFailure(false).build();
            }

        }
        if (mRequest == null) {
            mRequest = new Request.Builder().url(mUrl).build();
        }
        try {
            mLock.lockInterruptibly();
            try {
                mClient.newWebSocket(mRequest, mListener);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                mLock.unlock();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
