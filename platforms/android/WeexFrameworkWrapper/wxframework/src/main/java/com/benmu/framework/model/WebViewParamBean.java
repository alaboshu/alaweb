package com.benmu.framework.model;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Carry on 2017/4/20.
 */

public class WebViewParamBean implements Serializable {
    private String url;
    private String title;
    private ShareInfoBean shareInfo;
    private boolean navShow;
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isNavShow() {
        return navShow;
    }

    public void setNavShow(boolean navShow) {
        this.navShow = navShow;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ShareInfoBean getShareInfo() {
        return shareInfo;
    }

    public void setShareInfo(ShareInfoBean shareInfo) {
        this.shareInfo = shareInfo;
    }

}
