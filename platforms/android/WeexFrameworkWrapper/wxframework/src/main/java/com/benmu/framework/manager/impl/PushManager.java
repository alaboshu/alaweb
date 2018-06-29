package com.benmu.framework.manager.impl;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;

import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.activity.ResultActivity;
import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.Manager;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.model.NotificationBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.ResourceUtil;
import com.taobao.weex.WXSDKInstance;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Carry on 2017/11/15.
 */

public class PushManager extends Manager {

    private List<NotificationBean> notifications;

    public PushManager() {
        notifications = new ArrayList<>();
    }


    public void handlePush(Context context, String data) {
        //判断当前应用是在前台还是后台
        boolean isForeground = BaseCommonUtil.isAPPRunningForeground(context);
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NotificationBean bean = parseManager.parseObject(data, NotificationBean.class);
        if (isForeground) {
            //在前台 通知js
            Activity activity = RouterTracker.peekActivity();
            if (activity instanceof AbstractWeexActivity) {
                WXSDKInstance instance = ((AbstractWeexActivity) activity).getWXSDkInstance();
                GlobalEventManager.pushMessage(instance, getParams(bean, false));
            }

        } else {
            //在后台  显示通知
            showNotification(context, bean);
        }
    }


    private void showNotification(Context context, NotificationBean bean) {
        if (bean == null) return;
        int iconId = ResourceUtil.getMipmapId("com.benmu.wx", "app_icon");
        String appName = context.getResources().getString(ResourceUtil.getStringId("com.benmu" +
                ".wx", "app_name"));

        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(context)
                .setSmallIcon(iconId).setContentTitle(appName).setTicker(bean.aps.alert)
                .setContentText(bean.aps.alert.trim
                        ()).setAutoCancel(true).setDefaults(Notification.DEFAULT_LIGHTS |
                        Notification.DEFAULT_VIBRATE);
        Intent resultIntent = new Intent(context, ResultActivity.class);
        resultIntent.putExtra("type", Constant.Action.ACTION_NOTIFICATION);
        resultIntent.putExtra(Constant.Notification.TAG_NOTIFICATION, bean);
        PendingIntent resultPendingIntent = PendingIntent.getActivity(context,
                0, resultIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        mBuilder.setContentIntent(resultPendingIntent);
        NotificationManager mNotifyMgr = (NotificationManager) context
                .getSystemService(Context.NOTIFICATION_SERVICE);
        mNotifyMgr.notify(Constant.Notification.NOTIFY_ID_MESSAGE, mBuilder.build());
    }


    public List<NotificationBean> getNotifications() {
        return notifications;
    }

    public void removeNotification(NotificationBean bean) {
        notifications.remove(bean);
    }

    public static Map<String, Object> getParams(NotificationBean bean, boolean trigger) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        bean.trigger = trigger;
        String json = parseManager.toJsonString(bean);
        return parseManager.parseObject(json);
    }
}
