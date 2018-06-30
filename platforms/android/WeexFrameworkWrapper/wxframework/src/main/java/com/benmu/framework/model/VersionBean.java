package com.benmu.framework.model;

import java.io.Serializable;

/**
 * 版本信息等解析Bean
 */
public class VersionBean extends BaseResultBean {
    public Data data;

    public VersionBean(int resCode, String msg) {
        super(resCode, msg);
    }

    public VersionBean(){}

    public static class Data implements Serializable {
        public String path;
        public boolean diff;
    }
}
