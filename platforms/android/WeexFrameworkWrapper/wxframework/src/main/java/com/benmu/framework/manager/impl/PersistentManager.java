package com.benmu.framework.manager.impl;

import com.benmu.framework.manager.Manager;
import com.benmu.framework.model.Md5MapperModel;
import com.benmu.framework.model.RouterModel;
import com.taobao.weex.bridge.JSCallback;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Carry on 2017/8/16. persistent variable in memory
 */

public class PersistentManager extends Manager {
    private RouterModel mCacheRouter;
    private List<Md5MapperModel.Item> mMd5Mapper;
    private Map<String, JSCallback> mBackCallbacks;
    private static Map<String, Object> mAwakeParams;
    private String mScreenPath;
    private Map<String, Object> mCacheData;

    public Object getmAwakeParams(String key) {
        Object value = mAwakeParams.get(key);
        mAwakeParams.remove(key);
        return value;
    }


    public void setScreenPath(String path) {
        this.mScreenPath = path;
    }

    public String getScreenPath() {
        String path = mScreenPath;
        mScreenPath = null;
        return path;
    }


    public void setmAwakeParams(String key, Object value) {
        mAwakeParams.put(key, value);
    }


    public void setCacheRouter(RouterModel router) {
        this.mCacheRouter = router;
    }

    public RouterModel getCacheRouter() {
        RouterModel router = mCacheRouter;
        mCacheRouter = null;
        return router;
    }

    public void clearCacheRouter() {
        mCacheRouter = null;
    }

    public void setFileMapper(List<Md5MapperModel.Item> mapper) {
        this.mMd5Mapper = mapper;
    }

    public List<Md5MapperModel.Item> getFileMapper() {
        return mMd5Mapper;
    }

    public void setBackCallback(String key, JSCallback value) {
        if (mBackCallbacks == null) {
            mBackCallbacks = new HashMap<>();
        }
        mBackCallbacks.put(key, value);
    }

    public JSCallback getBackCallback(String key) {
        if (mBackCallbacks != null) {
            return mBackCallbacks.get(key);
        }
        return null;
    }

    public void removeBackCallback(String key) {
        if (mBackCallbacks != null) {
            mBackCallbacks.remove(key);
        }
    }


    public void setCacheData(String key, Object value) {
        if (mCacheData == null) {
            mCacheData = new HashMap<>();
        }
        mCacheData.put(key, value);
    }

    public <T> T getCacheData(String key, Class<T> type) {
        if (key == null || type == null) return null;
        if (mCacheData == null) {
            mCacheData = new HashMap<>();
        }
        T result = null;
        try {
            result = (T) mCacheData.get(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    public void deleteCacheData(String key) {
        if (mCacheData != null) {
            mCacheData.remove(key);
        }
    }


    public void removeCacheData() {
        if (mCacheData != null) {
            mCacheData.clear();
        }
    }

}
