package com.benmu.framework.http.okhttp.builder;

import com.benmu.framework.http.okhttp.OkHttpUtils;
import com.benmu.framework.http.okhttp.request.OtherRequest;
import com.benmu.framework.http.okhttp.request.RequestCall;

/**
 * Created by zhy on 16/3/2.
 */
public class HeadBuilder extends GetBuilder
{
    @Override
    public RequestCall build()
    {
        return new OtherRequest(null, null, OkHttpUtils.METHOD.HEAD, url, tag, params, headers,id).build();
    }
}
