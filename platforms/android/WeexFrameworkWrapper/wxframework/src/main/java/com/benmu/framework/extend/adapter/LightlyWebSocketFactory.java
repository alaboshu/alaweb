package com.benmu.framework.extend.adapter;

import com.taobao.weex.appfram.websocket.IWebSocketAdapter;
import com.taobao.weex.appfram.websocket.IWebSocketAdapterFactory;

/**
 * Created by Carry on 2018/1/4.
 */

public class LightlyWebSocketFactory implements IWebSocketAdapterFactory {
    @Override
    public IWebSocketAdapter createWebSocketAdapter() {
        return new LightlyWebSocketAdapter();
    }
}
