package com.benmu.framework.model;

import java.io.Serializable;
import java.util.List;

/**
 * Created by lfg on 2018/1/2.
 */

public class VersionJson {

    public List<Version> android;
    public List<Version> iOS;

    public class Version implements Serializable {
        public String version;
        public String versionCode;
        public String jsVersion;
        public long time;
        public String path;
    }
}
