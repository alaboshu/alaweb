package com.benmu.framework.constant;

/**
 * Created by Carry on 2017/8/7.
 */

public class WXConstant {

    /**
     * -------------调试参数-----------------------
     **/
    public static final int HOT_REFRESH_CONNECT = 0x111;
    public static final int HOT_REFRESH_DISCONNECT = HOT_REFRESH_CONNECT + 1;
    public static final int HOT_REFRESH_REFRESH = HOT_REFRESH_DISCONNECT + 1;
    public static final int HOT_REFRESH_CONNECT_ERROR = HOT_REFRESH_REFRESH + 1;

    /**
     * ----------router moudle回调js参数名--------
     **/
    public static final String OPEN_PAGE_SUCCESS = "打开页面成功";
    public static final String OPNE_PAGE_FAILED = "打开页面失败";

    public static final String BACK_PAGE_SUCCESS = "关闭页面成功";
    public static final String BACK_PAGE_FAILED = "关闭页面失败";

    public static final String ACTION_WEEX_REFRESH = "ACTION_WEEX_REFRESH";
    //拦截器状态发生变化
    public static final String ACTION_INTERCEPTOR_SWTICH = "ACTION_INTERCEPTOR_SWTICH";

    public static final String MEDIATOR_INIT = "MEDIATOR_INIT";

    /**
     * weex消息中心
     */
    public static class WXEventCenter {
        public static final String EVENT_JS_ON = "EVENT_JS_ON";
        public static final String EVENT_JS_EMIT = "EVENT_JS_EMIT";
        public static final String EVENT_JS_OFF = "EVENT_JS_OFF";
        public static final String EVENT_JS_OFFALL = "EVENT_JS_OFFALL";
        public static final String EVENT_INSTANCE_DESTORY = "EVENT_INSTANCE_DESTORY";
        public static final String EVENT_PAYBYWECHAT = "EVENT_PAYBYWECHAT";
        public static final String EVENT_PAYBYALIPAY = "EVENT_PAYBYALIPAY";
        public static final String EVENT_OPEN = "EVENT_OPEN";
        public static final String EVENT_GETPARAMS = "EVENT_GETPARAMS";
        public static final String EVENT_BACK = "EVENT_BACK";
        public static final String EVENT_GETBACKPARAMS = "EVENT_GETBACKPARAMS";
        public static final String EVENT_LOGINSUCCESS = "EVENT_LOGINSUCCESS";
        public static final String EVENT_REFRESH = "EVENT_REFRESH";
        public static final String EVENT_FINISH = "EVENT_FINISH";
        public static final String EVENT_BACKHOME = "EVENT_BACKHOME";
        public static final String EVENT_TOLOGIN = "EVENT_TOLOGIN";
        public static final String EVENT_TOMAP = "EVENT_TOMAP";
        public static final String EVENT_TOWEBVIEW = "EVENT_TOWEBVIEW";
        public static final String EVENT_CALL = "EVENT_CALL";
        public static final String EVENT_SHARE = "EVENT_SHARE";
        public static final String EVENT_SETDATA = "EVENT_SETDATA";
        public static final String EVENT_GETDATA = "EVENT_GETDATA";
        public static final String EVENT_DELETEDATA = "EVENT_DELETEDATA";
        public static final String EVENT_REMOVEDATA = "EVENT_REMOVE";
        public static final String EVENT_RESIGNKEYBOARD = "EVENT_RESIGNKEYBOARD";
        public static final String EVENT_ISINSTALLWXAPP = "EVENT_ISINSTALLWXAPP";
        public static final String EVENT_GETCID = "EVENT_GETCID";
        public static final String EVENT_WECHATLOGIN = "EVENT_WECHATLOGIN";
        public static final String EVENT_LEFTITEM = "EVENT_LEFTITEM";
        public static final String EVENT_RIGHTITEM = "EVENT_RIGHTITEM";
        public static final String EVENT_CENTERITEM = "EVENT_CENTERITEM";
        public static final String EVENT_BROWSERIMG = "EVENT_BROWSERIMG";
        public static final String EVENT_CAMERA = "EVENT_CAMERA";
        public static final String EVENT_CAMERA_UPLOADIMAGE = "EVENT_CAMERA_UPLOADIMAGE";
        public static final String EVENT_CAMERA_PATH = "EVENT_CAMERA_PATH";
        public static final String EVENT_CAMERA_UPLOADSCREENSHOT = "EVENT_CAMERA_UPLOADSCREENSHOT";
        public static final String EVENT_GEOLOCATION_GET = "EVENT_GEOLOCATION_GET";
        public static final String EVENT_MODAL_ALERT = "EVENT_MODAL_ALERT";
        public static final String EVENT_MODAL_CONFIRM = "EVENT_MODAL_CONFIRM";
        public static final String EVENT_MODAL_SHOWLOADING = "EVENT_MODAL_SHOWLOADING";
        public static final String EVENT_MODAL_DISMISSLOADING = "EVENT_MODAL_DISMISSLOADING";
        public static final String EVENT_MODAL_TOAST = "EVENT_MODAL_TOAST";
        public static final String EVENT_FETCH = "EVENT_FETCH";
        public static final String EVENT_GETREQUESTURL = "EVENT_GETREQUESTURL";
        public static final String EVENT_NAVIGATIONINFO = "EVENT_NAVIGATIONINFO";
        public static final String EVENT_COPYSTRING = "EVENT_COPYSTRING";
        public static final String EVENT_RELAYTOFRIEND = "EVENT_RELAYTOFRIEND";
        public static final String EVENT_RELAYTOCRICLE = "EVENT_RELAYTOCRICLE";
        public static final String EVENT_OPENBROWSER = "EVENT_OPENBROWSER";
        public static final String EVENT_COMMUNICATION_SMS = "EVENT_COMMUNICATION_SMS";
        public static final String EVENT_COMMUNICATION_CONTACTS = "EVENT_COMMUNICATION_CONTACTS";
        public static final String EVENT_SET_HOMEPAGE = "EVENT_SET_HOMEPAGE";
        public static final String EVENT_IMAGE_PICK = "EVENT_IMAGE_PICK";
        public static final String EVENT_IMAGE_UPLOAD = "EVENT_IMAGE_UPLOAD";
        public static final String EVENT_NAV = "EVENT_NAV";
        public static final String EVENT_UNAUTH = "EVENT_UNAUTH";
        public static final String EVENT_OAUTH_LOGIN = "EVENT_OAUTH_LOGIN";
        public static final String EVENT_SOCIAL_SHARE = "EVENT_SOCIAL_SHARE";
    }
}
