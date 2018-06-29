package com.benmu.wxbase;

import android.content.Context;

import com.taobao.weex.bridge.JSCallback;

/**
 *  事件抽象类
 * Created by liuyuanxiao on 17/12/4.
 */

public abstract class EventGate {
    public void perform(Context context, String params, JSCallback jscallback) {

    }

    public void perform(Context context, JSCallback jscallback) {

    }
}
