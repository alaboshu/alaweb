package com.benmu.framework.model;

import android.content.Context;

import com.taobao.weex.bridge.JSCallback;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * 事件分发Bean
 */
public class WeexEventBean implements Serializable {
    private String key;
    private String jsParams;
    private ArrayList<String> paramsList;
    private ArrayList<JSCallback> callbacks;
    private JSCallback jscallback;
    private Context context = null;
    private Object expand;

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public ArrayList<String> getParamsList() {
        return paramsList;
    }

    public void setParamsList(ArrayList<String> paramsList) {
        this.paramsList = paramsList;
    }

    public JSCallback getJscallback() {
        return jscallback;
    }

    public void setJscallback(JSCallback jscallback) {
        this.jscallback = jscallback;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getJsParams() {
        return jsParams;
    }

    public void setJsParams(String jsParams) {
        this.jsParams = jsParams;
    }

    public Object getExpand() {
        return expand;
    }

    public void setExpand(Object expand) {
        this.expand = expand;
    }

    public ArrayList<JSCallback> getCallbacks() {
        return callbacks;
    }

    public void setCallbacks(ArrayList<JSCallback> callbacks) {
        this.callbacks = callbacks;
    }
}
