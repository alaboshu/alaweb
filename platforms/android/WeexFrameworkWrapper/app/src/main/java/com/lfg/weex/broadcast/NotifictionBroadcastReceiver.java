package com.lfg.weex.broadcast;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.alibaba.fastjson.JSON;
import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.event.mediator.EventCenter;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;

public class NotifictionBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO: This method is called when the BroadcastReceiver is receiving
        // an Intent broadcast.
        String action = intent.getAction();
        if (action.equals("JumpToNotificationPage")) {
            Intent emit = new Intent(WXConstant.WXEventCenter.EVENT_JS_EMIT);
            emit.putExtra("data", new EventCenter.Emit("jumpto", null));
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(emit);
        } else if (action.equals("android.net.conn.CONNECTIVITY_CHANGE")) {
            ConnectivityManager connectivityManager = (ConnectivityManager)
                    context.getSystemService(context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
            Boolean IsAvailable;
            if (networkInfo != null && networkInfo.isConnected()) {
                IsAvailable = true;
            } else {
                IsAvailable = false;
            }
            Intent emit = new Intent(WXConstant.WXEventCenter.EVENT_JS_EMIT);
            emit.putExtra("data", new EventCenter.Emit("net.changed", JSON.parseObject("{\"isAvailable\":"+IsAvailable+"}")));
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(emit);
        }
    }
}
