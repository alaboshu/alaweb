package com.benmu.framework.model;

import java.io.Serializable;


/**
 * Title 数据解析Bean
 */
public class TitleModel implements Serializable {
    public String title;
    public String subTitle;
    public boolean hideNavbar;
    public String bgColor;
    public boolean addStatusBar;
    private boolean navShow;
    private String statusBarStyle;

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

    private String text;
    private String textColor;
    private String image;
    private String fontSize;
    private String fontWeight;

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

    public TitleModel() {
    }

    public TitleModel(String title, String subTitle, boolean hideNavbar, String bgColor, boolean
            addStatusBar) {
        this.title = title;
        this.subTitle = subTitle;
        this.hideNavbar = hideNavbar;
        this.bgColor = bgColor;
        this.addStatusBar = addStatusBar;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
