package com.benmu.framework.http.okhttp.exception;

/**
 * Created by Carry on 2017/9/21.
 */

public class CancelException extends Exception {
    private String mErrosMeeage;

    public CancelException(String mErrosMeeage) {
        this.mErrosMeeage = mErrosMeeage;
    }

    public CancelException() {
    }

    public String getmErrosMeeage() {
        return mErrosMeeage;
    }

    public void setmErrosMeeage(String mErrosMeeage) {
        this.mErrosMeeage = mErrosMeeage;
    }
}
