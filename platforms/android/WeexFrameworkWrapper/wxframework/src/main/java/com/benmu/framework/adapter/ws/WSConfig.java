package com.benmu.framework.adapter.ws;

/**
 * Created by Carry on 2018/3/15.
 */

public class WSConfig {
    private boolean retryOnConnectionFailure;
    private long pingInterval;

    public WSConfig(boolean retryOnConnectionFailure, long pingInterval) {
        this.retryOnConnectionFailure = retryOnConnectionFailure;
        this.pingInterval = pingInterval;
    }

    public boolean isRetryOnConnectionFailure() {
        return retryOnConnectionFailure;
    }

    public void setRetryOnConnectionFailure(boolean retryOnConnectionFailure) {
        this.retryOnConnectionFailure = retryOnConnectionFailure;
    }

    public long getPingInterval() {
        return pingInterval;
    }

    public void setPingInterval(long pingInterval) {
        this.pingInterval = pingInterval;
    }
}
