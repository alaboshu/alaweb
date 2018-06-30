package com.benmu.framework.extend.module;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.AppConfigBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.JsPoster;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

/**
 * 获取应用参数,环境配置
 */
public class AppConfigModule extends WXModule {
    private AppConfigBean mFontSizeBean;

    @JSMethod(uiThread = false)
    public void changeFontSize(String options, JSCallback jsCallback) {
        initFontSize();
        if (options == null) {
            JsPoster.postSuccess(mFontSizeBean, jsCallback);
            return;
        }
        Object obj = ManagerFactory.getManagerService(ParseManager.class).parseObject(options)
                .get("fontSize");
        if (obj != null && obj instanceof String) {
            String fontSize = (String) obj;
            if (fontSize.equals(mFontSizeBean.fontSize)) {
                JsPoster.postSuccess(mFontSizeBean, jsCallback);
                return;
            }

            mFontSizeBean.fontSize = fontSize;
            Intent intent = new Intent(Constant.Action.ACTION_GOBALFONTSIZE_CHANGE);
            intent.putExtra("currentFontSize", fontSize);
            LocalBroadcastManager.getInstance(mWXSDKInstance.getContext()).sendBroadcast(intent);
            SharePreferenceUtil.setAppFontSizeOption(mWXSDKInstance.getContext(), fontSize);
        }

        JsPoster.postSuccess(mFontSizeBean, jsCallback);
    }


    @JSMethod(uiThread = false)
    public void getFontSize(JSCallback jsCallback) {
        initFontSize();
        JsPoster.postSuccess(mFontSizeBean, jsCallback);
    }

    private void initFontSize() {
        if (mFontSizeBean == null) {
            String fontSize = SharePreferenceUtil.getAppFontSizeOption(mWXSDKInstance.getContext());
            mFontSizeBean = new AppConfigBean();
            mFontSizeBean.fontSize = fontSize;
            mFontSizeBean.scale = BaseCommonUtil.getScaleByFontsize(fontSize);
        }
    }

}
