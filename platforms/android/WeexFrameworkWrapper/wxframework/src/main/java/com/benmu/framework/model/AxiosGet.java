package com.benmu.framework.model;

import java.util.HashMap;

/**
 * Js  get请求联网所需参数
 */
public class AxiosGet {
    public String method;
    public String url;
    public HashMap<String, String> header;
    public boolean noRepeat;
    public HashMap<String, String> data;
    public long timeout;
}
