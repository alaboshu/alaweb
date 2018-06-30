package com.benmu.framework.model;

import java.util.List;

/**
 * Created by Carry on 2017/10/17.
 */

public class RelayBean {
    private String platform;
    private String description;
    private String mediaType;
    private String clipboardNotice;
    private List<String> urls;

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public String getClipboardNotice() {
        return clipboardNotice;
    }

    public void setClipboardNotice(String clipboardNotice) {
        this.clipboardNotice = clipboardNotice;
    }
}
