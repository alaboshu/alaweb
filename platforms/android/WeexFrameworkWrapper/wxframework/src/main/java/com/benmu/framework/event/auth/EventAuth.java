package com.benmu.framework.event.auth;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.R;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.FileManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.BaseResultBean;
import com.benmu.framework.model.ShareInfoBean;
import com.benmu.framework.model.ShareParamsBean;
import com.benmu.framework.model.WechatLoginBean;
import com.benmu.framework.utils.BMHookGlide;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.JsPoster;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.squareup.otto.Subscribe;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.bridge.JSCallback;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMAuthListener;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMWeb;

import java.io.File;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

/**
 * Created by Carry on 2017/11/24.
 */

public class EventAuth {
    private Context mContext;
    private JSCallback mCallback;
    private boolean mSharing;
    private ProgressDialog mProgressDialog;
    private Activity mAct;

    public void login(Context context, String params, JSCallback jscallback) {
        if (context == null) return;
        mContext = context;
        mCallback = jscallback;
        SHARE_MEDIA media = getPlatform(params);
        if (media == null) {
            JsPoster.postFailed("isNotPlatform", mCallback);
            return;
        }
        try {
            UMShareAPI umShareAPI = UMShareAPI.get(context);
            umShareAPI.getPlatformInfo((Activity) context, media, umAuthListener);
        } catch (Exception e) {
            e.printStackTrace();
            JsPoster.postFailed(mCallback);
            return;
        }
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }
    public void unAuth(Context context, String platform, JSCallback jscallback) {
        if (context == null) return;
        mContext = context;
        mCallback = jscallback;
        SHARE_MEDIA media = getPlatform(platform);
        if (media == null) {
            JsPoster.postFailed("isNotPlatform", mCallback);
            return;
        }
        try {
            UMShareAPI umShareAPI = UMShareAPI.get(context);
            umShareAPI.deleteOauth((Activity) context, media, umAuthListener);
        } catch (Exception e) {
            e.printStackTrace();
            JsPoster.postFailed(mCallback);
            return;
        }
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }
    public void share(Context context, String params, JSCallback callback) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        ShareParamsBean shareInfo = null;
        try {
            shareInfo = parseManager.parseObject(params, ShareParamsBean.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        mCallback = callback;
        mAct = (Activity)context;
        if (shareInfo.getPlatform().equals("copy")) {
            BaseCommonUtil.copyString(mAct, shareInfo.getUrl());
            if (mCallback != null) {
                JsPoster.postSuccess(null, mCallback);
            }
        }
        SHARE_MEDIA media = getPlatform(shareInfo.getPlatform());
        if (media == null) {
            JsPoster.postFailed("isNotPlatform", mCallback);
            return;
        }

        mSharing = true;
        startUmweb(shareInfo, media, umShareListener);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);

    }
    private void startUmweb(ShareParamsBean shareInfo, SHARE_MEDIA mPlatform, UMShareListener
            shareListener) {
        if (!BMWXEnvironment.mPlatformConfig.getUmeng().isUmengAvailable()) {
            shareListener.onError(mPlatform, new Exception("未设置umeng三方appKey"));
            return;
        }
        UMWeb mUMWeb;
        mUMWeb = new UMWeb(shareInfo.getUrl());
        mUMWeb.setTitle(shareInfo.getTitle());
        mUMWeb.setDescription(shareInfo.getContent());
        String image = shareInfo.getImage();
        if (TextUtils.isEmpty(image)) {
            mUMWeb.setThumb(new UMImage(mAct, R.drawable.place_holder));
        } else {

            mUMWeb.setThumb(new UMImage(mAct, image));
        }

        new ShareAction(mAct).setPlatform(mPlatform).withMedia(mUMWeb).setCallback(shareListener)
                .share();
    }
    private SHARE_MEDIA getPlatform(String platform) {
        switch (platform) {
            case "wechat": return SHARE_MEDIA.WEIXIN;
            case "qq": return SHARE_MEDIA.QQ;
            case "weibo": return SHARE_MEDIA.SINA;
            case "wechatCircle": return SHARE_MEDIA.WEIXIN_CIRCLE;
            case "qqSpace": return SHARE_MEDIA.QZONE;
            default: return null;
        }
    }

    private UMShareListener umShareListener = new UMShareListener() {
        @Override
        public void onStart(SHARE_MEDIA share_media) {

        }

        @Override
        public void onResult(SHARE_MEDIA share_media) {
            if (mCallback != null) {
                JsPoster.postSuccess(null, mCallback);
            }
            Log.d("auth", "onResult.....");
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }

        @Override
        public void onError(SHARE_MEDIA share_media, Throwable throwable) {
            if (mCallback != null) {
                JsPoster.postFailed(mCallback);
            }
            Log.d("auth", "onError share.....");
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }

        @Override
        public void onCancel(SHARE_MEDIA share_media) {
            if (mCallback != null) {
                JsPoster.postFailed(mCallback);
            }
            Log.d("auth", "onCancel share.....");
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }
    };
    private UMAuthListener umAuthListener = new UMAuthListener() {

        @Override
        public void onStart(SHARE_MEDIA platform) {
            //授权开始的回调
        }

        @Override
        public void onComplete(SHARE_MEDIA platform, int action, Map<String, String> data) {
            if (action == UMAuthListener.ACTION_GET_PROFILE) {
                if (data == null) {
                    JsPoster.postFailed(mCallback);
                } else {
                    HashMap<String, String> map = new HashMap<>();
                    map.put("openid", data.get("openid"));
                    map.put("accessToken", data.get("accessToken"));
                    JsPoster.postSuccess(map, mCallback);
                }
            } else if (action == UMAuthListener.ACTION_DELETE) {
                JsPoster.postSuccess("", mCallback);
            }
            Log.d("auth", "onComplete.....");
            mSharing = false;
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }

        @Override
        public void onError(SHARE_MEDIA platform, int action, Throwable t) {
            JsPoster.postFailed(t.getMessage(),mCallback);
            Log.d("auth", "onError.....");
            mSharing = false;
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }

        @Override
        public void onCancel(SHARE_MEDIA platform, int action) {
            JsPoster.postFailed(mCallback);
            Log.d("auth", "onCancel.....");
            mSharing = false;
            ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        }
    };

    /**
     * Code 获取
     */
    @Subscribe
    public void OnEvent(Intent intent) {
        if (Constant.Action.ACTION_AUTHLOGIN_CANCEL.equals(intent.getAction()) && mSharing) {
            Log.d("auth", "onEvent.....");
            mSharing = false;
            JsPoster.postFailed(mCallback);
        }
    }


}
