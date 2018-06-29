package com.benmu.framework.extend.adapter;

import android.content.Context;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.impl.FileManager;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.taobao.weex.adapter.IWXTypefaceAdapter;

import java.io.File;

/**
 * Created by Carry on 2017/10/26.
 */

public class BMTypefaceAdapter implements IWXTypefaceAdapter {
    private Context mContext;

    public BMTypefaceAdapter(Context context) {
        this.mContext = context;
    }

    @Override
    public File getTypefaceDir() {
        return FileManager.getIconDir(mContext);
    }

    @Override
    public boolean isInterceptor() {
        return Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive
                (mContext));
    }

    @Override
    public String getJsServer() {
        return BMWXEnvironment.mPlatformConfig.getUrl().getJsServer();
    }
}
