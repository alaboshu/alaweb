package com.benmu.framework.model;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by Carry on 2017/10/23.
 */

public class WeexEnvironment implements Serializable {
    private Map<String, String> eros;

    public WeexEnvironment(Map<String, String> eros) {
        this.eros = eros;
    }
}
