package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Axios 数据返回类
 */
public class AxiosResultBean implements Serializable {
    public Object status;
    public String errorMsg = "";
    public Object data;

    public AxiosResultBean() {
    }
}
