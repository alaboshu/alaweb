package com.benmu.framework.utils;

import android.Manifest;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.PermissionManager;
import com.benmu.framework.model.BaseResultBean;
import com.taobao.weex.bridge.JSCallback;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

/**
 * Created by Carry on 2017/10/17.
 */

public class WeChatRelayUtil {
    public static final String MEDIA_TEXT = "text";
    public static final String MEDIA_IMAGE = "image";
    public static final String MEDIA_VIDEO = "video";
    public static final String PLATFORM_WECHAT = "wechat";
    public static final int RELAY_SUCCESS = 0;
    public static final int ERROR_ILLEGALARGUMENT = 1;
    public static final int ERROR_UNSUPPORT_PLATFORM = 2;
    public static final int ERROR_UNSUPPORT_MT = 3;
    public static final int ERROR_DOWNLOAD = 4;
    public static final int ERROR_PERMISSION = 5;
    public static final int ERROR_UNKOWN = 6;

    public static void relayToFriend(Context context, String content, ArrayList<Uri> uris, String
            type, JSCallback success, JSCallback failed) {
        Intent localIntent = new Intent();
        localIntent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools" +
                ".ShareImgUI"));
        localIntent.putExtra("Kdescription", content);
        if (MEDIA_VIDEO.equals(type)) {
            localIntent.setAction(Intent.ACTION_SEND);
            localIntent.setType("video/*");
            localIntent.putExtra(Intent.EXTRA_STREAM, uris.get(0));
        } else if (MEDIA_IMAGE.equals(type)) {
            localIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
            localIntent.setType("image/*");
            localIntent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
        } else if (MEDIA_TEXT.equals(type)) {
            localIntent.setAction(Intent.ACTION_SEND);
            localIntent.setType("text/plain");
            localIntent.putExtra(Intent.EXTRA_TEXT, content);
            localIntent.putExtra("Kdescription", content);
        }
        try {
            context.startActivity(localIntent);
            if (success != null) {
                success.invoke(new BaseResultBean(WeChatRelayUtil.RELAY_SUCCESS, "分享成功"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (failed != null) {
                failed.invoke(new BaseResultBean(ERROR_UNKOWN, "未知错误"));
            }
        }

    }

    public static void relayToCircle(final Context context, String content, ArrayList<Uri> uris,
                                     String type, final JSCallback success, JSCallback failed) {

        if (MEDIA_IMAGE.equals(type)) {
            final Intent localIntent = new Intent();
            localIntent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.tools" +
                    ".ShareToTimeLineUI"));
            localIntent.setAction(Intent.ACTION_SEND_MULTIPLE);
            localIntent.setType("image/*");
            localIntent.putExtra("Kdescription", content);
            localIntent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
            context.startActivity(localIntent);
            if (success != null) {
                success.invoke(new BaseResultBean(WeChatRelayUtil.RELAY_SUCCESS, "分享成功"));
            }
        } else if (MEDIA_VIDEO.equals(type)) {
            //检查内存卡权限
            PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager
                    .class);
            if (permissionManager.hasPermissions(context, Manifest.permission
                    .WRITE_EXTERNAL_STORAGE)) {
                execute(context, content, uris, type, success, failed);
            } else {
                //没有权限
                ModalManager.BmToast.toast(context, "访问外部存储卡权限被拒绝，请到设置页面开启后再试", Toast.LENGTH_SHORT);
                if (failed != null) {
                    failed.invoke(new BaseResultBean(ERROR_PERMISSION, "权限被拒绝"));
                }
            }


        }

    }


    private static void execute(final Context context, String content, ArrayList<Uri> uris,
                                String type, final JSCallback success, final JSCallback failed) {
        Uri uri = uris.get(0);
        File video = null;
        try {
            video = new File(new URI(uri.toString()));
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if (video == null || !video.exists()) {
            return;
        }
        BaseCommonUtil.updateVideoToGallery(context, video.getAbsolutePath());
        final Intent localIntent = new Intent();
        localIntent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui" +
                ".LauncherUI"));
        localIntent.setAction(Intent.ACTION_MAIN);
        localIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        localIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        ModalManager.BmToast.toast(context, "文案已复制，视频请到相册中选取", Toast.LENGTH_SHORT);
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                try {
                    context.startActivity(localIntent);
                    if (success != null) {
                        success.invoke(new BaseResultBean(WeChatRelayUtil.RELAY_SUCCESS, "分享成功"));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    if (failed != null) {
                        failed.invoke(new BaseResultBean(ERROR_UNKOWN, "未知错误"));
                    }
                }
            }
        }, 500);
    }

}
