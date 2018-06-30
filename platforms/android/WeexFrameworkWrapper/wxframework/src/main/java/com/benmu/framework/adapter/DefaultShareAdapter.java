package com.benmu.framework.adapter;

import android.app.Activity;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.text.TextUtils;
import android.view.View;
import android.widget.Toast;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.R;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.BaseResultBean;
import com.benmu.framework.model.ShareInfoBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.JsPoster;
import com.benmu.widget.view.BMGridDialog;
import com.taobao.weex.bridge.JSCallback;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMImage;
import com.umeng.socialize.media.UMWeb;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Carry on 2017/9/26.
 */

public class DefaultShareAdapter {
    private Activity mAct;
    private UMWeb mUMWeb;
    private SHARE_MEDIA[] mPlatforms = new SHARE_MEDIA[]{SHARE_MEDIA.WEIXIN.toSnsPlatform()
            .mPlatform,
            SHARE_MEDIA.WEIXIN_CIRCLE.toSnsPlatform().mPlatform};
    private JSCallback mSuccess;
    private JSCallback mFailed;
    private ProgressDialog mProgressDialog;

    public void share(Activity activity, String params, JSCallback success, JSCallback fail) {
        if (activity == null || TextUtils.isEmpty(params)) return;
        this.mAct = activity;
        this.mSuccess = success;
        this.mFailed = fail;

        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);

        ShareInfoBean shareInfo = null;
        try {
            shareInfo = parseManager.parseObject(params, ShareInfoBean.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (shareInfo == null) return;
        if (shareInfo.isPopUp()) {
            if (shareInfo.getPlatforms() == null || shareInfo.getPlatforms().size() > 1) {
                JsPoster.postFailed("请确定分享平台", fail);
                return;
            }
            shareDirectly(shareInfo, shareInfo.getPlatforms().get(0));
        } else {
            showShareDialog(shareInfo);
        }
    }

    private void showShareDialog(final ShareInfoBean shareInfo) {

        if (shareInfo.getPlatforms() == null) {
            ArrayList<String> platforms = new ArrayList<>();
            platforms.add("Pasteboard");
            //wechat friends
            platforms.add("WechatSession");
            //wechat cricle
            platforms.add("WechatTimeLine");
            shareInfo.setPlatforms(platforms);
        }
        if (!BaseCommonUtil.isWeChatInstall(mAct)) {
            shareInfo.getPlatforms().clear();
            shareInfo.getPlatforms().add("Pasteboard");
        }
        //init share dialog
        List<BMGridDialog.GridItem> items = new ArrayList<>();
        for (String platform : shareInfo.getPlatforms()) {
            switch (platform) {
                case "Pasteboard":
                    items.add(new BMGridDialog.GridItem("", R.drawable.socialize_url, "复制链接",
                            platform));
                    break;
                case "WechatSession":
                    items.add(new BMGridDialog.GridItem("", R.drawable.socialize_wechat, "发送给好友",
                            platform));
                    break;
                case "WechatTimeLine":
                    items.add(new BMGridDialog.GridItem("", R.drawable.socialize_wxcircle,
                            "分享朋友圈", platform));
                    break;
            }
        }

        ModalManager.BmShareDialog.show(mAct, items, new BMGridDialog.OnItemClickListener() {
            @Override
            public void onItemClick(int position, View view, BMGridDialog.GridItem item, Dialog
                    dialog) {
                if (item == null || item.getTag() == null) return;
                switch ((String) item.getTag()) {
                    case "Pasteboard":
                        copyClipboard(shareInfo.getUrl());
                        break;
                    case "WechatSession":
                        shareDirectly(shareInfo, "WechatSession");
                        break;
                    case "WechatTimeLine":
                        shareDirectly(shareInfo, "WechatTimeLine");
                        break;
                }
                if (dialog != null) {
                    dialog.dismiss();
                }
            }
        });
    }

    private void shareDirectly(ShareInfoBean shareInfo, String platform) {
        switch (platform) {
            case "WechatSession":
                if ("WEB".equals(shareInfo.getMediaType())) {
                    startUmweb(shareInfo, getShareMedia(platform), shareListener);
                } else if ("IMAGE".equals(shareInfo.getMediaType())) {
                } else if ("VIDEO".equals(shareInfo.getMediaType())) {

                } else {
                    JsPoster.postFailed("不支持的媒体类型", mFailed);
                }
                break;
            case "WechatTimeLine":
                if ("WEB".equals(shareInfo.getMediaType())) {
                    startUmweb(shareInfo, getShareMedia(platform), shareListener);
                } else if ("IMAGE".equals(shareInfo.getMediaType())) {

                } else if ("VIDEO".equals(shareInfo.getMediaType())) {

                } else {
                    JsPoster.postFailed("不支持的媒体类型", mFailed);
                }

                break;
            case "Pasteboard":
                copyClipboard(shareInfo.getUrl());
                break;
        }
    }

    private SHARE_MEDIA getShareMedia(String platform) {
        if ("WechatSession".equals(platform)) {
            return SHARE_MEDIA.WEIXIN;
        }
        return SHARE_MEDIA.WEIXIN_CIRCLE;
    }

    private void startUmweb(ShareInfoBean shareInfo, SHARE_MEDIA mPlatform, UMShareListener
            shareListener) {
        if (!BMWXEnvironment.mPlatformConfig.getUmeng().isUmengAvailable()) {
            shareListener.onError(mPlatform, new Exception("未设置umeng三方appKey"));
            return;
        }
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

    private void copyClipboard(String url) {
        BaseCommonUtil.copyString(mAct, url);
        if (mSuccess != null) {
            mSuccess.invoke(new BaseResultBean(0, mAct.getResources().getString(R.string
                    .str_paste_board)));
        }
    }


    private UMShareListener shareListener = new UMShareListener() {
        @Override
        public void onStart(SHARE_MEDIA platform) {
            if (mProgressDialog != null && !mProgressDialog.isShowing()) {
                mProgressDialog.show();
            }

        }

        @Override
        public void onResult(SHARE_MEDIA platform) {
            if (mProgressDialog != null && mProgressDialog.isShowing()) {
                mProgressDialog.dismiss();
            }

            if (mSuccess != null) {
                JsPoster.postSuccess(null, mAct.getResources().getString(R.string
                        .str_share_success), mSuccess);
//                mSuccess.invoke(new BaseResultBean(0, mAct.getResources().getString(R.string
//                        .str_share_success)));
            } else {
                ModalManager.BmToast.toast(mAct, mAct.getResources().getString
                        (R.string.str_share_success), Toast.LENGTH_SHORT);
            }

        }

        @Override
        public void onError(SHARE_MEDIA platform, Throwable t) {
            if (mProgressDialog != null && mProgressDialog.isShowing()) {
                mProgressDialog.dismiss();
            }
            if (mFailed != null) {
                JsPoster.postFailed(mAct.getResources().getString
                        (R.string.str_share_failed), mFailed);
            } else {
                ModalManager.BmToast.toast(mAct, mAct.getResources().getString
                        (R.string.str_share_failed), Toast.LENGTH_SHORT);
            }

        }

        @Override
        public void onCancel(SHARE_MEDIA platform) {
            if (mProgressDialog != null && mProgressDialog.isShowing()) {
                mProgressDialog.dismiss();
            }
        }
    };

}
