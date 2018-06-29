package com.benmu.framework.model;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Js  post请求联网所需参数
 */
public class AxiosPost implements Serializable {
    public String method;
    public String url;
    public HashMap<String, String> header;
    public boolean noRepeat;
    public String data;
    public long timeout;
}
