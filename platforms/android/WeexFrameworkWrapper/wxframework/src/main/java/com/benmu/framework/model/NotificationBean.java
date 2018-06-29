package com.benmu.framework.model;

import java.io.Serializable;

/**
 * Created by Carry on 2017/11/15.
 */

public class NotificationBean implements Serializable {
    public Aps aps;
    public boolean trigger;
    public Object extra;

    public static class Aps implements Serializable {
        public String alert;

    }
}
