package com.benmu.framework.event.router;

import android.content.Context;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.RouterManager;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventWebView {
    public void toWebView(String params, Context context) {
        RouterManager routerManager = ManagerFactory.getManagerService(RouterManager.class);
        routerManager.toWebView(context,params);

//        WebViewParamBean webViewParamBean = BMJsonParsManager.parseObject(params,
//                WebViewParamBean.class);
//        BMRouterManager.toWebView(context, webViewParamBean, AppConstant.WEBVIEW_CATEGORY, new
//                TitleModel(webViewParamBean.getTitle(), null, false, "#07ae9c", true));
    }
}
