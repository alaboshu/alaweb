package com.benmu.wxbase;

import android.util.Log;

/**
 * 创建 抽象事件
 * Created by liuyuanxiao on 17/12/4.
 */

public class EventGateFactory {
    public static EventGate getEventGate(String clazzName) {
        try {
            Class instanse = Class.forName(clazzName);
            return (EventGate) instanse.newInstance();
        } catch (Exception e) {
            Log.e("EventGateFactory", "create " + clazzName + " failure~！");
        }
        return null;
    }


}
