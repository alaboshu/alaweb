package com.benmu.framework.utils;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.PermissionManager;

/**
 *  权限相关 工具类
 * Created by liuyuanxiao on 18/1/30.
 */

public class PermissionUtils {
    /**
     * 查询权限并申请，未做回调处理
     */
    public static boolean checkPermission(Context context, String permission) {
        PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager
                .class);
        boolean hasPermisson = permissionManager.hasPermissions(context, permission);
        if (!hasPermisson) {
            // permissionManager.requestPermissions(context, null, permission);
//            ModalManager.BmToast.toast(context, "读取sd卡存储权限未授予，请到应用设置页面开启权限!", Toast.LENGTH_SHORT);
        }
        return hasPermisson;
    }
}
