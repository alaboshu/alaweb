package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2017/9/14.
 */

public class NatigatorModel implements Serializable {
    private String title;
    private boolean navShow;
    private String statusBarStyle;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isNavShow() {
        return navShow;
    }

    public void setNavShow(boolean navShow) {
        this.navShow = navShow;
    }

    public String getStatusBarStyle() {
        return statusBarStyle;
    }

    public void setStatusBarStyle(String statusBarStyle) {
        this.statusBarStyle = statusBarStyle;
    }
}
