package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2017/11/24.
 * 微信授权登陆回传
 */

public class WechatLoginBean {

    private String name;
    private String uid;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

}
