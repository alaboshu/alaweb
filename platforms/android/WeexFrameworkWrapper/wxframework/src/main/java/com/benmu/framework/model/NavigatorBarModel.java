package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2018/1/5.
 */

public class NavigatorBarModel implements Serializable {
    //导航栏标题
    private String navTitle;
    //是否显示导航
    private boolean navShow;
    //状态栏样式
    private String statusBarStyle;
    private String text;
    private String textColor;
    private String fontSize="32";
    //是否加粗
    private String fontWeight="normal";
    private String image;

    public String getNavTitle() {
        return navTitle;
    }

    public void setNavTitle(String navTitle) {
        this.navTitle = navTitle;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTextColor() {
        return textColor;
    }

    public void setTextColor(String textColor) {
        this.textColor = textColor;
    }

    public String getFontSize() {
        return fontSize;
    }

    public void setFontSize(String fontSize) {
        this.fontSize = fontSize;
    }

    public String getFontWeight() {
        return fontWeight;
    }

    public void setFontWeight(String fontWeight) {
        this.fontWeight = fontWeight;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
