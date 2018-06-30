package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by lfg on 2018/2/8.
 */

public class ShareParamsBean implements Serializable {
    private String title;
    private String content;
    private String image;
    private String url;
    private String platform;
    //分享的媒体类型  WEB  IMAGE VIDEO
    private String mediaType="WEB";

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
}
