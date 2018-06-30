package com.benmu.framework.event.pay;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.alipay.sdk.app.PayTask;
import com.benmu.framework.R;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.BaseResultBean;
import com.benmu.framework.model.WeChatPayModel;
import com.benmu.framework.model.WeChatPayResultModel;
import com.benmu.framework.utils.JsPoster;
import com.squareup.otto.Subscribe;
import com.taobao.weex.bridge.JSCallback;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import java.util.Map;

/**
 * Created by Carry on 2017/9/26.
 */

public class EventPay {
    private JSCallback mCallback;

    public void pay(String params, Context context, JSCallback callback) {
        this.mCallback = callback;
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        WeChatPayModel weChatPayModal = parseManager.parseObject(params, WeChatPayModel.class);
        IWXAPI wxapi = WXAPIFactory.createWXAPI(context, weChatPayModal.getAppid(), true);
        if (!wxapi.isWXAppInstalled()) {
            JsPoster.postFailed(context.getResources().getString(R.string.please_install_wechat),mCallback);
            return;
        }
        PayReq request = new PayReq();
        request.appId = weChatPayModal.getAppid();
        request.partnerId = weChatPayModal.getPartnerid();
        request.nonceStr = weChatPayModal.getNoncestr();
        request.packageValue = weChatPayModal.getPackageValue();
        request.prepayId = weChatPayModal.getPrepayid();
        request.timeStamp = weChatPayModal.getTimestamp();
        request.sign = weChatPayModal.getSign();
        wxapi.registerApp(weChatPayModal.getAppid());
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
        wxapi.sendReq(request);
    }

    public void payByAlipay(final String params, final Context context, final JSCallback callback) {
        Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                PayTask alipay = new PayTask((Activity) context);
                Map<String, String> result = alipay.payV2(params, true);
                Log.i("msp", result.toString());

                if (callback != null) {
                    callback.invoke(result);
                }
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }
    @Subscribe
    public void onPayResult(WeChatPayResultModel result) {
        if (mCallback != null) {
            mCallback.invoke(result);
        }
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
    }

}
