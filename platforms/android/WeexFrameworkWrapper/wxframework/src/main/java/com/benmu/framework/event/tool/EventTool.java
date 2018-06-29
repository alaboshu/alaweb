package com.benmu.framework.event.tool;

import android.content.Context;
import android.text.TextUtils;
import com.benmu.framework.model.CidBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.JsPoster;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/18.
 */

public class EventTool {
    public void resignKeyboard(Context context, JSCallback jscallback) {
        if (BaseCommonUtil.getKeyBoardState(context)) {
            JsPoster.postSuccess(null, jscallback);
        } else {
            JsPoster.postFailed(jscallback);
        }
    }


    public void isWXInstall(Context context, JSCallback jsCallback) {
        boolean weChatInstall = BaseCommonUtil.isWeChatInstall(context);

        if (weChatInstall) {
            JsPoster.postSuccess(true, jsCallback);
        } else {
            JsPoster.postFailed(jsCallback);
        }

    }

    public void copyString(Context context, String params, JSCallback callback) {
        BaseCommonUtil.copyString(context, params);
        JsPoster.postSuccess(null, "Copy Successful", callback);
    }

    public void getCid(Context context, JSCallback callback) {
        CidBean cidBean = new CidBean();
        String clientId = SharePreferenceUtil.getClientId(context);
        if (!TextUtils.isEmpty(clientId)) {
            cidBean.setCid(clientId);
            JsPoster.postSuccess(cidBean, callback);
        } else {
            JsPoster.postFailed(callback);
        }
    }

}

