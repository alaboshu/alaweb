package com.lfg.weex.broadcast;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.SmsMessage;
import android.util.Log;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.event.mediator.EventCenter;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by lfg on 2018/5/9.
 */

public class SmsReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {

        Object[] pdus = (Object[]) intent.getExtras().get("pdus");
        for (Object pdu : pdus) {
            SmsMessage sms = SmsMessage.createFromPdu((byte[])pdu);
            String body = sms.getMessageBody();
            Pattern pattern = Pattern.compile("[0-9]{4,6}");
            Matcher matcher = pattern.matcher(body);
            if (matcher.find()) {
                Intent emit = new Intent(WXConstant.WXEventCenter.EVENT_JS_EMIT);
                emit.putExtra("data", new EventCenter.Emit("gotSmscode", matcher.group()));
                ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(emit);
                Log.d("hah", matcher.group());
            }
            Log.d("hah", body);
        }
    }
}
