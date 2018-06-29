package com.benmu.framework.adapter.ws;

/**
 * Created by Carry on 2018/1/5.
 */

public enum BMWSCode {
    INVALID_INSTANCEID(4001, "无效的实例"), REPEAT_WEBSOCKET(4002, "重复的ws实例"), MODULE_DESTROY(4003,
            "module销毁");


    BMWSCode(int code, String reason) {
        this.code = code;
        this.reason = reason;
    }

    private int code;
    private String reason;


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
