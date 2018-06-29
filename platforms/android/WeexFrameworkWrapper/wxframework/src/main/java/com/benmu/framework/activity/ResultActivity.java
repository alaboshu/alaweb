package com.benmu.framework.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.impl.GlobalEventManager;
import com.benmu.framework.model.NotificationBean;
import com.taobao.weex.WXSDKInstance;
import java.io.Serializable;

/**
 * Created by Carry on 2017/11/16.
 */

public class ResultActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        if (intent == null || intent.getStringExtra("type") == null) return;
        String type = intent.getStringExtra("type");
        switch (type) {
            case Constant.Action.ACTION_NOTIFICATION:
                //点击通知
                Serializable serializable = intent.getSerializableExtra(Constant.Notification
                        .TAG_NOTIFICATION);
                if (serializable instanceof NotificationBean) {
                    NotificationBean bean = (NotificationBean) serializable;
                    //发送事件
                    Activity activity = RouterTracker.peekActivity();
                    if (activity instanceof AbstractWeexActivity) {
                        WXSDKInstance wxsDkInstance = ((AbstractWeexActivity) activity)
                                .getWXSDkInstance();
                        GlobalEventManager.pushMessage(wxsDkInstance, com.benmu.framework.manager
                                .impl.PushManager.getParams
                                        (bean, true));
                        finish();
                    }

                }
                break;
        }
    }
}
