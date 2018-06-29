package com.benmu.framework.http.okhttp.exception;

/**
 * Created by Carry on 2017/10/24.
 */

public class IrregularUrlException extends Exception {

    private String mErrosMeeage;

    public IrregularUrlException(String mErrosMeeage) {
        this.mErrosMeeage = mErrosMeeage;
    }

    public IrregularUrlException() {
    }

    public String getmErrosMeeage() {
        return mErrosMeeage;
    }

    public void setmErrosMeeage(String mErrosMeeage) {
        this.mErrosMeeage = mErrosMeeage;
    }
}
