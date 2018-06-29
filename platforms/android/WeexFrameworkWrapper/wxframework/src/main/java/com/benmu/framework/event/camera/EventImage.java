package com.benmu.framework.event.camera;

import android.Manifest;
import android.content.Context;

import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ImageManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.PermissionManager;
import com.benmu.framework.manager.impl.PersistentManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.UploadImageBean;
import com.benmu.framework.model.UploadResultBean;
import com.benmu.framework.utils.JsPoster;
import com.benmu.framework.utils.PermissionUtils;
import com.benmu.framework.utils.TextUtil;
import com.squareup.otto.Subscribe;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by liuyuanxiao on 18/1/4.
 */

public class EventImage {
    private JSCallback mPickCallback;

    public void pick(String json, Context context, JSCallback jsCallback) {
        //Manifest.permission.READ_EXTERNAL_STORAGE 权限申请
        PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager
                .class);
        if (!permissionManager.hasPermissions(context, Manifest.permission.READ_EXTERNAL_STORAGE)) {
            permissionManager.requestPermissions(context, Manifest.permission.READ_EXTERNAL_STORAGE, jsCallback);
            return;
        }
        mPickCallback = jsCallback;
        UploadImageBean bean = ManagerFactory.getManagerService(ParseManager.class).parseObject
                (json, UploadImageBean.class);
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
        ImageManager imageManager = ManagerFactory.getManagerService(ImageManager.class);
        if (bean.allowCrop && bean.maxCount == 1) {
            //上传头像
            imageManager.pickAvatar(context, bean, Constant.ImageConstants.IMAGE_NOT_UPLOADER_PICKER);
        } else if (bean.maxCount > 0) {
            imageManager.pickPhoto(context, bean, Constant.ImageConstants.IMAGE_NOT_UPLOADER_PICKER);
        }
    }

    @Subscribe
    public void OnUploadResult(UploadResultBean uploadResultBean) {
        if (uploadResultBean != null && mPickCallback != null) {
            if (uploadResultBean.resCode == 0) {
                JsPoster.postSuccess(TextUtil.conversionObject(uploadResultBean.data), mPickCallback);
            } else {
                JsPoster.postFailed(uploadResultBean.msg, mPickCallback);
            }
        }

        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
        mPickCallback = null;
        ManagerFactory.getManagerService(PersistentManager.class).deleteCacheData(Constant
                .ImageConstants.UPLOAD_IMAGE_BEAN);
    }
}
