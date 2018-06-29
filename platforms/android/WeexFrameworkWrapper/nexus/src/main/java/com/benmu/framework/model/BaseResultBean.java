package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Js 回调基础Bean
 */
public class BaseResultBean implements Serializable {
    public int resCode;
    public String msg;

    public BaseResultBean(int resCode, String msg) {
        this.resCode = resCode;
        this.msg = msg;
    }

    public BaseResultBean() {
    }
}
