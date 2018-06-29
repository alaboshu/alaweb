package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2018/1/10.
 */

public class NavModule implements Serializable {
    //导航方式
    private String type;
    //目的地名称
    private String title;
    //目的地纬度
    private String longitude;
    //目的地经度
    private String latitude;
    //当前纬度
    private String currentLongitude;
    //当前经度
    private String currentLatitude;


    public String getCurrentLongitude() {
        return currentLongitude;
    }

    public void setCurrentLongitude(String currentLongitude) {
        this.currentLongitude = currentLongitude;
    }

    public String getCurrentLatitude() {
        return currentLatitude;
    }

    public void setCurrentLatitude(String currentLatitude) {
        this.currentLatitude = currentLatitude;
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
