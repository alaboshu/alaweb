package com.benmu.framework.model;

import android.content.Context;
import android.text.TextUtils;

import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.StorageManager;

import java.io.Serializable;

/**
 * Created by Carry on 2017/8/23.
 */

public class PlatformConfigBean implements Serializable {
    private String AppName;
    private String appBoard;
    private boolean androidIsListenHomeBack;
    private Page Page;
    private Url url;
    private Wechat wechat;
    private Umeng umeng;
    private Amap amap;
    private QQ qq;
    private Weibo weibo;

    public boolean isAndroidIsListenHomeBack() {
        return androidIsListenHomeBack;
    }

    public void setAndroidIsListenHomeBack(boolean androidIsListenHomeBack) {
        this.androidIsListenHomeBack = androidIsListenHomeBack;
    }

    public Wechat getWechat() {
        return wechat;
    }

    public void setWechat(Wechat wechat) {
        this.wechat = wechat;
    }

    public QQ getQQ() {
        return qq;
    }

    public void setQQ(QQ qq) {
        this.qq = qq;
    }

    public Weibo getWeibo() {
        return weibo;
    }

    public void setWeibo(Weibo weibo) {
        this.weibo = weibo;
    }

    public Umeng getUmeng() {
        return umeng;
    }

    public void setUmeng(Umeng umeng) {
        this.umeng = umeng;
    }

    public Amap getAmap() {
        return amap;
    }

    public void setAmap(Amap amap) {
        this.amap = amap;
    }

    public String getAppName() {
        return AppName;
    }

    public void setAppName(String appName) {
        AppName = appName;
    }

    public PlatformConfigBean.Page getPage() {
        return Page;
    }

    public void setPage(PlatformConfigBean.Page page) {
        Page = page;
    }

    public Url getUrl() {
        return url;
    }

    public void setUrl(Url url) {
        this.url = url;
    }

    public String getAppBoard() {
        return appBoard;
    }

    public void setAppBoard(String appBoard) {
        this.appBoard = appBoard;
    }

    public class Page {
        private String homePage;
        private String mediatorPage;
        private String navBarColor;
        private String navItemColor;

        public String getNavItemColor() {
            return navItemColor;
        }

        public void setNavItemColor(String navItemColor) {
            this.navItemColor = navItemColor;
        }

        public String getHomePage(Context context) {
            StorageManager storageManager = ManagerFactory.getManagerService(StorageManager.class);
            String page = storageManager.getData(context, Constant.SP
                    .SP_HOMEPAGE_URL);
            if (TextUtils.isEmpty(page)) {
                page = homePage;
            }
            return page;
        }
        public String getPrimaryHomePage() {
            return homePage;
        }
        public void setHomePage(String homePage) {
            this.homePage = homePage;
        }

        public String getMediatorPage() {
            return mediatorPage;
        }

        public void setMediatorPage(String mediatorPage) {
            this.mediatorPage = mediatorPage;
        }

        public String getNavBarColor() {
            return navBarColor;
        }

        public void setNavBarColor(String navBarColor) {
            this.navBarColor = navBarColor;
        }
    }

    public class Url {
        private String request;
        private String jsServer;
        private String image;
        private String bundleUpdate;
        private String socketServer;

        public String getRequest() {
            return request;
        }

        public void setRequest(String request) {
            this.request = request;
        }

        public String getJsServer() {
            return TextUtils.isEmpty(jsServer) ? "http://app.weex-eros.com:8889" : jsServer;
        }

        public void setJsServer(String jsServer) {
            this.jsServer = jsServer;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getBundleUpdate() {
            return bundleUpdate;
        }

        public void setBundleUpdate(String bundleUpdate) {
            this.bundleUpdate = bundleUpdate;
        }

        public String getSocketServer() {
            return socketServer;
        }

        public void setSocketServer(String socketServer) {
            this.socketServer = socketServer;
        }
    }


    public class Wechat {
        private boolean enabled;
        private String appId;
        private String appSecret;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAppId() {
            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public String getAppSecret() {
            return appSecret;
        }

        public void setAppSecret(String appSecret) {
            this.appSecret = appSecret;
        }

        public boolean isWechatAvailable() {
            return enabled && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(appSecret);
        }
    }
    public class QQ {
        private boolean enabled;
        private String appId;
        private String appKey;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAppId() {
            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public String getAppKey() {
            return appKey;
        }

        public void setAppKey(String appKey) {
            this.appKey = appKey;
        }

        public boolean isQQAvailable() {
            return enabled && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(appKey);
        }
    }
    public class Weibo {
        private boolean enabled;
        private String appId;
        private String appSecret;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAppId() {
            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public String getAppSecret() {
            return appSecret;
        }

        public void setAppSecret(String appSecret) {
            this.appSecret = appSecret;
        }

        public boolean isWeiboAvailable() {
            return enabled && !TextUtils.isEmpty(appId) && !TextUtils.isEmpty(appSecret);
        }
    }
    public class Umeng {
        private boolean enabled;
        private String androidAppKey;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAndroidAppKey() {
            return androidAppKey;
        }

        public void setAndroidAppKey(String androidAppKey) {
            this.androidAppKey = androidAppKey;
        }

        public boolean isUmengAvailable() {
            return enabled && !TextUtils.isEmpty(androidAppKey);
        }
    }

    public class Amap {
        private boolean enabled;
        private String androidAppKey;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public String getAndroidAppKey() {
            return androidAppKey;
        }

        public void setAndroidAppKey(String androidAppKey) {
            this.androidAppKey = androidAppKey;
        }

        public boolean isAmapAvailable() {
            return enabled && !TextUtils.isEmpty(androidAppKey);
        }
    }

}
