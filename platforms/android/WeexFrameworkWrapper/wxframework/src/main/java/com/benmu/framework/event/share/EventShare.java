package com.benmu.framework.event.share;

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.text.TextUtils;
import android.widget.Toast;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.FileManager;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.ShareManager;
import com.benmu.framework.model.BaseResultBean;
import com.benmu.framework.model.RelayBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.MultipleFileDownloader;
import com.benmu.framework.utils.ResourceUtil;
import com.benmu.framework.utils.WeChatRelayUtil;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Carry on 2017/9/26.
 */

public class EventShare {
    private static int ACTION_FRIEND = 0;
    private static int ACTION_CRICLE = 1;
    private JSCallback mSuccessCallback;
    private JSCallback mFailedCallback;

    public void share(Context context, String params, JSCallback success, JSCallback fail) {
        if (context == null || TextUtils.isEmpty(params)) return;
        ShareManager shareManager = ManagerFactory.getManagerService(ShareManager.class);
        shareManager.share((Activity) context, params, success, fail);
    }

    public void relayToFriend(Context context, String params, ArrayList<JSCallback> callbacks) {
        mSuccessCallback = callbacks.get(0);
        mFailedCallback = callbacks.get(1);
        if (context == null || TextUtils.isEmpty(params)) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }
        //Wrong Params
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        RelayBean object = parseManager.parseObject(params, RelayBean.class);
        if (object == null) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }

        //Wrong Params
        if (!WeChatRelayUtil.PLATFORM_WECHAT.equals(object.getPlatform())) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_UNSUPPORT_PLATFORM,
                        "Not Support Platform"));
            }
            return;
        }
        //Not Support Platform

        //粘贴描述到剪切板
        String description = object.getDescription();

        if (!TextUtils.isEmpty(description) && !WeChatRelayUtil.MEDIA_TEXT.equals(object
                .getMediaType())) {
            BaseCommonUtil.copyString(context, object.getDescription());
            if (!TextUtils.isEmpty(object.getClipboardNotice())) {
                ModalManager.BmToast.toast(context, object.getClipboardNotice(), Toast
                        .LENGTH_SHORT);
            }
        }

        if (WeChatRelayUtil.MEDIA_TEXT.equals(object.getMediaType())) {
            WeChatRelayUtil.relayToFriend(context, object.getDescription(), null, object
                    .getMediaType(), mSuccessCallback,mFailedCallback);
        } else {

            downLoadResource(context, object, ACTION_FRIEND);
        }

    }

    private void downLoadResource(final Context context, final RelayBean bean, final int type) {
        List<String> urls = bean.getUrls();
        if (urls == null || urls.size() < 1) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }
        List<String> safeUrls = new ArrayList<>();
        for (String url : urls) {
            Uri parse = Uri.parse(url);
            if (!TextUtils.isEmpty(parse.getScheme()) && !TextUtils.isEmpty(parse.getHost())) {
                safeUrls.add(url);
            }
        }
        if (safeUrls.size() < 1) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }
        ModalManager.BmLoading.showLoading(context, "Downloading", false);
        new MultipleFileDownloader(FileManager.getTempFilePath(context).getAbsolutePath(), safeUrls)
                .setOnFinshListener(new MultipleFileDownloader.onDownloadFinish() {


                    @Override
                    public void onFinish(List<MultipleFileDownloader.FileItem> pathList,
                                         List<MultipleFileDownloader.FileItem> errorList) {
                        ModalManager.BmLoading.dismissLoading(context);
                        if (pathList.size() < 1) {
                            if (mFailedCallback != null) {
                                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil
                                        .ERROR_DOWNLOAD,
                                        "Download Fail"));
                            }
                            return;
                        }
                        List<MultipleFileDownloader.FileItem> files = new ArrayList<>();
                        if (WeChatRelayUtil.MEDIA_VIDEO.equals(bean.getMediaType())) {
                            files.add(pathList.get(0));
                        } else if (WeChatRelayUtil.MEDIA_IMAGE.equals(bean.getMediaType())) {
                            files.clear();
                            files.addAll(pathList);
                        } else {
                            if (mFailedCallback != null) {
                                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil
                                        .ERROR_UNSUPPORT_MT,
                                        "Not Support Media Type"));
                            }
                            return;
                        }
                        ArrayList<Uri> uris = new ArrayList<Uri>();
                        for (MultipleFileDownloader.FileItem s : files) {
                            Uri uri = ResourceUtil.getSafeUri(context, s.getPath(), s.getName());
                            uris.add(uri);
                        }
                        if (ACTION_FRIEND == type) {

                            WeChatRelayUtil.relayToFriend(context, bean.getDescription(), uris,
                                    bean.getMediaType(), mSuccessCallback,mFailedCallback);
                        } else if (ACTION_CRICLE == type) {
                            WeChatRelayUtil.relayToCircle(context, bean.getDescription(), uris,
                                    bean.getMediaType(), mSuccessCallback,mFailedCallback);
                        }
                    }
                }).execute();

    }

    public void relayToCricle(Context context, String params, ArrayList<JSCallback> callbacks) {
        mSuccessCallback = callbacks.get(0);
        mFailedCallback = callbacks.get(1);
        if (context == null || TextUtils.isEmpty(params)) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        RelayBean object = parseManager.parseObject(params, RelayBean.class);
        if (object == null) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_ILLEGALARGUMENT,
                        "Wrong Params"));
            }
            return;
        }
        if (!WeChatRelayUtil.PLATFORM_WECHAT.equals(object.getPlatform())) {
            if (mFailedCallback != null) {
                mFailedCallback.invoke(new BaseResultBean(WeChatRelayUtil.ERROR_UNSUPPORT_PLATFORM,
                        "Not Support Platform"));
            }
            return;
        }
        //Not Support Platform
        if (WeChatRelayUtil.MEDIA_VIDEO.equals(object.getMediaType())) {
            //粘贴描述到剪切板
            String description = object.getDescription();
            if (!TextUtils.isEmpty(description)) {
                BaseCommonUtil.copyString(context, object.getDescription());
                if (!TextUtils.isEmpty(object.getClipboardNotice())) {
                    ModalManager.BmToast.toast(context, object.getClipboardNotice(), Toast
                            .LENGTH_SHORT);
                }
            }
        }
        //下载视频或图片
        downLoadResource(context, object, ACTION_CRICLE);
    }
}
