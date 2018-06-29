package com.benmu.framework.manager.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.benmu.framework.manager.Manager;

/**
 * Created by Carry on 2017/8/7. json parse
 */

public class ParseManager extends Manager {
    public <T> T parseObject(String jsonString, Class<T> clazz) {
        try {
            return JSON.parseObject(jsonString, clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String toJsonString(Object object) {
        return JSON.toJSONString(object);
    }

    public JSONObject parseObject(String jsonString) {
        try {
            return JSON.parseObject(jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Object parse(String s) {
        try {
            return JSON.parse(s);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return s;
    }
    public Object parse(String s,Class clazz) {
        try {
            return JSON.parseObject(s,clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return s;
    }
}
