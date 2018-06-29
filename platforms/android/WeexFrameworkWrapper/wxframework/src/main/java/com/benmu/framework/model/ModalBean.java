package com.benmu.framework.model;

import java.io.Serializable;


/**
 * 弹窗内容Json 解析
 */
public class ModalBean implements Serializable {
    private String message;
    private String okTitle;
    private String cancelTitle;
    private String title;
    private int duration;
    private String titleAlign;
    private String messageAlign;
    private boolean isPrompt;
    private String promptType;
    private String promptPlaceholder;

    public void setPrompt(boolean prompt) {
        isPrompt = prompt;
    }

    public boolean isPrompt() {
        return isPrompt;
    }

    public String getPromptType() {
        return promptType;
    }

    public void setPromptType(String promptType) {
        this.promptType = promptType;
    }

    public void setPromptPlaceholder(String promptPlaceholder) {
        this.promptPlaceholder = promptPlaceholder;
    }

    public String getPromptPlaceholder() {
        return promptPlaceholder;
    }
    public String getTitleAlign() {
        return titleAlign;
    }

    public void setTitleAlign(String titleAlign) {
        this.titleAlign = titleAlign;
    }

    public String getMessageAlign() {
        return messageAlign;
    }

    public void setMessageAlign(String messageAlign) {
        this.messageAlign = messageAlign;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOkTitle() {
        return okTitle;
    }

    public void setOkTitle(String okTitle) {
        this.okTitle = okTitle;
    }

    public String getCancelTitle() {
        return cancelTitle;
    }

    public void setCancelTitle(String cancelTitle) {
        this.cancelTitle = cancelTitle;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
