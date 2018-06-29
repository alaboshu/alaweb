package com.benmu.framework.manager.impl;

import android.content.Context;

import com.benmu.framework.adapter.DefaultImageAdapter;
import com.benmu.framework.manager.Manager;
import com.benmu.framework.model.UploadImageBean;
import com.lzy.imagepicker.bean.ImageItem;

import java.util.ArrayList;

/**
 * Created by Carry on 2017/8/7.
 */

public class ImageManager extends Manager  {


    /**
     * 选择多张图片上传
     *
     * @param context 上线文对象
     * @param bean    Js 返回的数据集合
     */
    public boolean pickPhoto(final Context context, UploadImageBean bean,int requestCode) {
        return DefaultImageAdapter.getInstance().pickPhoto(context, bean,requestCode);
    }

    /**
     * 上传单张图片，裁剪
     */
    public boolean pickAvatar(final Context context, UploadImageBean bean,int requestCode) {
        return DefaultImageAdapter.getInstance().pickAvatar(context, bean,requestCode);
    }


    /**
     * 上传多张图片
     *
     * @param items 选择图片集合
     * @param bean  uplaod 参数对象
     */
    public void UpMultipleImageData(Context context, ArrayList<ImageItem> items, UploadImageBean
            bean) {
        DefaultImageAdapter.getInstance().UpMultipleImageData(context, items, bean);


    }

    /**
     * 打开照相器 拍照
     */
    public void openCamera(Context context, UploadImageBean
            bean) {
        DefaultImageAdapter.getInstance().openCamera(context, bean);
    }
}
