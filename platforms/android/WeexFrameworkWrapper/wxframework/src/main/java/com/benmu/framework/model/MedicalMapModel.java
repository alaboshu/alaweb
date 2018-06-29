package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2017/6/7.
 */

public class MedicalMapModel implements Serializable {
    private String type;
    private String title;
    private NavigationInfo navigationInfo;

    public static class NavigationInfo implements Serializable{
        private String title;
        private String address;
        private String longitude;
        private String latitude;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getLongitude() {
            return longitude;
        }

        public void setLongitude(String longitude) {
            this.longitude = longitude;
        }

        public String getLatitude() {
            return latitude;
        }

        public void setLatitude(String latitude) {
            this.latitude = latitude;
        }
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public NavigationInfo getNavigationInfo() {
        return navigationInfo;
    }

    public void setNavigationInfo(NavigationInfo navigationInfo) {
        this.navigationInfo = navigationInfo;
    }
}
