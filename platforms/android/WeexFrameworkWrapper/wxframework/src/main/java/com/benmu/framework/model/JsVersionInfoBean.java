package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2017/7/12.
 */

public class JsVersionInfoBean implements Serializable {
    private String jsVersion;
    private String android;
    private String timestamp;

    public JsVersionInfoBean(String jsVersion, String android, String timestamp) {
        this.jsVersion = jsVersion;
        this.android = android;
        this.timestamp = timestamp;
    }

    public JsVersionInfoBean() {
    }

    public String getJsVersion() {
        return jsVersion;
    }

    public void setJsVersion(String jsVersion) {
        this.jsVersion = jsVersion;
    }

    public String getAndroid() {
        return android;
    }

    public void setAndroid(String android) {
        this.android = android;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
