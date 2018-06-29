package com.taobao.weex.adapter;

import java.io.File;

/**
 * Created by Carry on 2017/10/26. 本木iconFont适配器接口
 */

public interface IWXTypefaceAdapter {

    //获取本地iconfont目录
    File getTypefaceDir();

    //获取拦截器状态
    boolean isInterceptor();

    //获取本地服务地址
    String getJsServer();

}
