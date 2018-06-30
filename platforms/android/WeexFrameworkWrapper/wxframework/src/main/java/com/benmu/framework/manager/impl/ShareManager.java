package com.benmu.framework.manager.impl;

import android.app.Activity;

import com.benmu.framework.adapter.DefaultShareAdapter;
import com.benmu.framework.manager.Manager;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/26.
 */

public class ShareManager extends Manager {

    public void share(Activity activity, String params, JSCallback success, JSCallback fail) {
        new DefaultShareAdapter().share(activity, params,success,fail);
    }
}
