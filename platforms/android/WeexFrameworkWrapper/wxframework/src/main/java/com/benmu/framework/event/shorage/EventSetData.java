package com.benmu.framework.event.shorage;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.StorageManager;
import com.benmu.framework.utils.JsPoster;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;

/**
 * Created by Carry on 2017/5/21.
 */

public class EventSetData {
    public void setData(Context context, ArrayList<String> paramsList, JSCallback jscallback) {
        StorageManager storageManager = ManagerFactory.getManagerService(StorageManager.class);
        String key = paramsList.get(0);
        String value = paramsList.get(1);
        boolean result = storageManager.setData(context, key, value);
        if (result) {
            JsPoster.postSuccess(null, jscallback);
        } else {
            JsPoster.postFailed("Storage Fail", jscallback);
        }
    }


    public Object setDataSync(Context context, ArrayList<String> paramsList) {
        StorageManager storageManager = ManagerFactory.getManagerService(StorageManager.class);
        String key = paramsList.get(0);
        String value = paramsList.get(1);
        boolean result = storageManager.setData(context, key, value);
        return result ? JsPoster.getSuccess() : JsPoster.getFailed("Storage Fail");
    }
}
