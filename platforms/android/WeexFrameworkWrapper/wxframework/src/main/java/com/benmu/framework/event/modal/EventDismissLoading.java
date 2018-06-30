package com.benmu.framework.event.modal;

import android.content.Context;

import com.benmu.framework.manager.impl.ModalManager;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/9/21.
 */

public class EventDismissLoading {
    public void dismiss(Context context, JSCallback jscallback) {
        ModalManager.BmLoading.dismissLoading(context);
        if (jscallback != null) {
            jscallback.invoke(null);
        }
    }
}
