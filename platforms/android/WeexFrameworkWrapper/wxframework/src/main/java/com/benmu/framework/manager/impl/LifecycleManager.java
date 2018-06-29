package com.benmu.framework.manager.impl;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.benmu.framework.manager.Manager;

/**
 * Created by Carry on 2017/9/4. app lifecycle manager
 */

public class LifecycleManager extends Manager implements Application.ActivityLifecycleCallbacks {
    private int mCount = 0;
    private OnTaskSwitchListener mOnTaskSwitchListener;

    public LifecycleManager register(Application application) {
        application.registerActivityLifecycleCallbacks(this);
        return this;
    }


    @Override
    public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

    }

    @Override
    public void onActivityStarted(Activity activity) {
        if (mCount++ == 0) {
            mOnTaskSwitchListener.onTaskSwitchToForeground();
        }
    }

    @Override
    public void onActivityResumed(Activity activity) {

    }

    @Override
    public void onActivityPaused(Activity activity) {

    }

    @Override
    public void onActivityStopped(Activity activity) {
        if (--mCount == 0) {
            mOnTaskSwitchListener.onTaskSwitchToBackground();
        }
    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

    }

    @Override
    public void onActivityDestroyed(Activity activity) {

    }

    public interface OnTaskSwitchListener {

        void onTaskSwitchToForeground();

        void onTaskSwitchToBackground();
    }

    public void setOnTaskSwitchListenner(OnTaskSwitchListener listenner) {
        this.mOnTaskSwitchListener = listenner;
    }
}
