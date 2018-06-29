package com.benmu.framework.http.okhttp.exception;

/**
 * Created by Carry on 2017/9/21.
 */

public class HttpException extends Exception {
    private int mErrorCode;
    private String mErrorMessage;

    public HttpException(int mErrorCode, String mErrorMessage) {
        this.mErrorCode = mErrorCode;
        this.mErrorMessage = mErrorMessage;
    }

    public HttpException() {

    }

    public int getmErrorCode() {
        return mErrorCode;
    }

    public void setmErrorCode(int mErrorCode) {
        this.mErrorCode = mErrorCode;
    }

    public String getmErrorMessage() {
        return mErrorMessage;
    }

    public void setmErrorMessage(String mErrorMessage) {
        this.mErrorMessage = mErrorMessage;
    }
}
