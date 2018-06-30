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

public class EventDeleteData {


    public void deleteData(Context context, ArrayList<String> paramsList, JSCallback jscallback) {
        String key = paramsList.get(0);
        StorageManager storageManager = ManagerFactory.getManagerService(StorageManager.class);
        boolean result = storageManager.deleteData(context, key);
        if (result) {
            JsPoster.postSuccess(null, jscallback);
        } else {
            JsPoster.postFailed("Delete Fail", jscallback);
        }
    }

    public Object deleteDataSync(Context context, ArrayList<String> paramsList) {
        String key = paramsList.get(0);
        StorageManager storageManager = ManagerFactory.getManagerService(StorageManager.class);
        boolean result = storageManager.deleteData(context, key);
        return result ? JsPoster.getSuccess() : JsPoster.getFailed("Delete Fail");
    }
}
