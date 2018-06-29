package com.benmu.framework.http;

import com.benmu.framework.BMWXEnvironment;

/**
 * Created by Carry on 2017/8/21.
 */

public class Api {
    public static String BASE_URL = BMWXEnvironment.mPlatformConfig.getUrl().getRequest();
    public static String UPLOAD_URL = BMWXEnvironment.mPlatformConfig.getUrl().getImage();
}
