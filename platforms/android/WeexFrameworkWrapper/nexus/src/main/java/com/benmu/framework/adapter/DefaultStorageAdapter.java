package com.benmu.framework.adapter;

import android.content.Context;

import com.benmu.framework.utils.SharePreferenceUtil;

import java.io.Serializable;

/**
 * Created by Carry on 2017/8/21. 默认存储实现  基于SP实现
 */

public class DefaultStorageAdapter {
    private static DefaultStorageAdapter mInstance = new DefaultStorageAdapter();

    private DefaultStorageAdapter() {
    }

    public static DefaultStorageAdapter getInstance() {
        return mInstance;
    }


    public boolean deleteData(Context context, String key) {
        return SharePreferenceUtil.deleteData(context, key);
    }

    public boolean setData(Context context, String key, Serializable value) {
        return SharePreferenceUtil.setData(context, key, value);
    }

    public <T> T getData(Context context, String key, Class<T> clazz) {
        return SharePreferenceUtil.getData(context, key, clazz);
    }

    public boolean removeData(Context context) {
        return SharePreferenceUtil.clearSp(context);
    }
}

