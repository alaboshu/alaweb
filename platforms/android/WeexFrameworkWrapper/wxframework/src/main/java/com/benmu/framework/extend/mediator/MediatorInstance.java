package com.benmu.framework.extend.mediator;

import android.content.Context;

import com.taobao.weex.WXSDKInstance;

import static com.benmu.framework.extend.mediator.MediatorDocker.STATUS_DESTORY;
import static com.benmu.framework.extend.mediator.MediatorDocker.STATUS_INIT;

/**
 * Created by Carry on 2018/1/4.
 */

public class MediatorInstance {
    private WXSDKInstance mInstance;
    private int status;

    public MediatorInstance(Context context) {
        this.mInstance = new WXSDKInstance(context);
        this.status = STATUS_INIT;
    }

    public void destory() {
        this.mInstance.destroy();
        this.mInstance = null;
        this.status = STATUS_DESTORY;
    }


    public WXSDKInstance getmInstance() {
        return mInstance;
    }

    public void setmInstance(WXSDKInstance mInstance) {
        this.mInstance = mInstance;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
