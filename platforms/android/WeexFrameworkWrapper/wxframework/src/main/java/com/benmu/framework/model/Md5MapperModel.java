package com.benmu.framework.model;

import java.io.Serializable;
import java.util.List;

/**
 * 验证更新包，解析Json,Md5
 */
public class Md5MapperModel implements Serializable {
    private List<Item> filesMd5;
    private String android;
    private String appName;
    private String jsVersion;
    private String timestamp;

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getAndroid() {
        return android;
    }

    public void setAndroid(String android) {
        this.android = android;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getJsVersion() {
        return jsVersion;
    }

    public void setJsVersion(String jsVersion) {
        this.jsVersion = jsVersion;
    }

    public List<Item> getFilesMd5() {
        return filesMd5;
    }

    public void setFilesMd5(List<Item> filesMd5) {
        this.filesMd5 = filesMd5;
    }

    public static class Item implements Comparable<Item>{
        private String android;
        private String page;
        private String md5;

        public String getAndroid() {
            return android;
        }

        public void setAndroid(String android) {
            this.android = android;
        }

        public String getPage() {
            return page;
        }

        public void setPage(String page) {
            this.page = page;
        }

        public String getMd5() {
            return md5;
        }

        public void setMd5(String md5) {
            this.md5 = md5;
        }


        @Override
        public int compareTo(Item another) {
            if(this.md5.compareTo(another.getMd5())>0){
                return 1;
            }else if(this.md5.compareTo(another.getMd5())==0){
                return 0;
            }else if(this.md5.compareTo(another.getMd5())<0){
                return -1;
            }else {
                return 0;
            }
        }
    }

}
