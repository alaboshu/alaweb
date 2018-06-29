package com.benmu.framework.manager.impl.dispatcher;

import com.benmu.framework.manager.Manager;
import com.squareup.otto.Bus;

/**
 * Created by Carry on 2017/8/7.
 * event flow
 */

public class DispatchEventManager extends Manager {
    private static Bus mBus;

    public DispatchEventManager() {
        if (mBus == null) {
            mBus = new MainThreadBus();
        }
    }

    public Bus getBus() {
        return mBus;
    }
}
