package com.benmu.framework.event;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;

import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.event.auth.EventAuth;
import com.benmu.framework.event.browse.EventBrowse;
import com.benmu.framework.event.camera.EventCamera;
import com.benmu.framework.event.camera.EventImage;
import com.benmu.framework.event.http.EventFetch;
import com.benmu.framework.event.modal.EventAlert;
import com.benmu.framework.event.modal.EventConfirm;
import com.benmu.framework.event.modal.EventDismissLoading;
import com.benmu.framework.event.modal.EventShowLoading;
import com.benmu.framework.event.modal.EventToast;
import com.benmu.framework.event.nav.EventCenterItem;
import com.benmu.framework.event.nav.EventLeftItem;
import com.benmu.framework.event.nav.EventNavigationInfo;
import com.benmu.framework.event.nav.EventRightItem;
import com.benmu.framework.event.pay.EventPay;
import com.benmu.framework.event.router.EventBack;
import com.benmu.framework.event.router.EventCall;
import com.benmu.framework.event.router.EventFinish;
import com.benmu.framework.event.router.EventGetBackParams;
import com.benmu.framework.event.router.EventGetParams;
import com.benmu.framework.event.router.EventNav;
import com.benmu.framework.event.router.EventOpen;
import com.benmu.framework.event.router.EventOpenBrowser;
import com.benmu.framework.event.router.EventRefresh;
import com.benmu.framework.event.router.EventSetHomePage;
import com.benmu.framework.event.router.EventToMap;
import com.benmu.framework.event.router.EventWebView;
import com.benmu.framework.event.share.EventShare;
import com.benmu.framework.event.shorage.EventDeleteData;
import com.benmu.framework.event.shorage.EventGetData;
import com.benmu.framework.event.shorage.EventRemoveData;
import com.benmu.framework.event.shorage.EventSetData;
import com.benmu.framework.event.tool.EventTool;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.WeexEventBean;
import com.benmu.framework.utils.JsPoster;
import com.benmu.wxbase.EventGate;
import com.benmu.wxbase.EventGateFactory;
import com.squareup.otto.Subscribe;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;

/**
 * Created by Carry on 2017/8/23.
 */

public class DispatchEventCenter {
    private static DispatchEventCenter mInstance = new DispatchEventCenter();

    private DispatchEventCenter() {
    }

    public static DispatchEventCenter getInstance() {
        return mInstance;
    }


    public void register() {
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }

    public void unregister() {
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().unregister(this);
    }

    private Context safeContext(Context context) {
        if (!(context instanceof Activity)) {
            context = RouterTracker.peekActivity();
        }
        return context;
    }

    @Subscribe
    public void onWeexEvent(WeexEventBean weexEventBean) {
        if (weexEventBean == null) return;
        Context context = safeContext(weexEventBean.getContext());
        if (context == null) return;
        String params = weexEventBean.getJsParams();
        switch (weexEventBean.getKey()) {
            case WXConstant.WXEventCenter.EVENT_PAYBYWECHAT:
                if (TextUtils.isEmpty(params)) return;
                new EventPay().pay(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_PAYBYALIPAY:
                if (TextUtils.isEmpty(params)) return;
                new EventPay().payByAlipay(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_OPEN:
                if (TextUtils.isEmpty(params)) return;
                if (weexEventBean.getCallbacks() != null) {
                    new EventOpen().open(params, context, weexEventBean.getCallbacks());
                } else if (weexEventBean.getJscallback() != null) {
                    new EventOpen().open(params, context, weexEventBean.getJscallback());
                } else {
                    new EventOpen().open(params, context);
                }
                break;
            case WXConstant.WXEventCenter.EVENT_GETPARAMS:
                new EventGetParams().getParams(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_BACK:
                new EventBack().back(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_GETBACKPARAMS:
                new EventGetBackParams().getBackParams(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_REFRESH:
                new EventRefresh().refresh(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_FINISH:
                new EventFinish().finish(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_TOMAP:
                new EventToMap().toMap(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_TOWEBVIEW:
                new EventWebView().toWebView(params, context);
                break;
            case WXConstant.WXEventCenter.EVENT_CALL:
                new EventCall().call(params, context);
                break;
            case WXConstant.WXEventCenter.EVENT_SETDATA:
                new EventSetData().setData(context, weexEventBean.getParamsList(), weexEventBean
                        .getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_GETDATA:
                new EventGetData().getData(context, weexEventBean.getParamsList(), weexEventBean
                        .getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_DELETEDATA:
                new EventDeleteData().deleteData(context, weexEventBean.getParamsList(),
                        weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_REMOVEDATA:
                new EventRemoveData().removeData(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_BROWSERIMG:
                if (TextUtils.isEmpty(params)) return;
                new EventBrowse().open(params, context);
                break;

            case WXConstant.WXEventCenter.EVENT_MODAL_ALERT:
                if (TextUtils.isEmpty(params)) return;
                JSCallback modal_alert_callback = weexEventBean.getJscallback();
                new EventAlert().alert(params, modal_alert_callback, context);
                break;
            case WXConstant.WXEventCenter.EVENT_MODAL_CONFIRM:
                if (TextUtils.isEmpty(params)) return;
                ArrayList<JSCallback> callbacks = weexEventBean.getCallbacks();
                if (callbacks == null && callbacks.size() < 2) return;
                new EventConfirm().confirm(params, callbacks.get(0), callbacks.get(1), context);
                break;
            case WXConstant.WXEventCenter.EVENT_MODAL_SHOWLOADING:
                if (TextUtils.isEmpty(params)) return;
                JSCallback modal_showloading_callback = weexEventBean.getJscallback();
                new EventShowLoading().showLoading(params, modal_showloading_callback, context);
                break;
            case WXConstant.WXEventCenter.EVENT_MODAL_TOAST:
                if (TextUtils.isEmpty(params)) return;
                new EventToast().toast(params, context);
                break;
            case WXConstant.WXEventCenter.EVENT_FETCH:
                new EventFetch().fetch(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_CAMERA_UPLOADIMAGE:
                new EventCamera().uploadImage(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_CAMERA_PATH:
                new EventCamera().openCamera(params, context, weexEventBean.getJscallback());
                break;

            case WXConstant.WXEventCenter.EVENT_CAMERA:
                JSCallback jscallback = weexEventBean.getJscallback();
                new EventCamera().scan(jscallback, context);
                break;

            case WXConstant.WXEventCenter.EVENT_RIGHTITEM:
                new EventRightItem().setRightItem(params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_LEFTITEM:
                new EventLeftItem().setLeftItem(params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_CENTERITEM:
                new EventCenterItem().setCenterItem(params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_NAVIGATIONINFO:
                new EventNavigationInfo().setNavigationInfo(params, context, weexEventBean
                        .getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_RESIGNKEYBOARD:
                new EventTool().resignKeyboard(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_ISINSTALLWXAPP:
                new EventTool().isWXInstall(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_GETCID:
                new EventTool().getCid(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_COPYSTRING:
                new EventTool().copyString(context, params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_MODAL_DISMISSLOADING:
                new EventDismissLoading().dismiss(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_SHARE:
                new EventShare().share(context, params, weexEventBean.getCallbacks().get(0),
                        weexEventBean.getCallbacks().get(1));
                break;
            case WXConstant.WXEventCenter.EVENT_RELAYTOFRIEND:
                new EventShare().relayToFriend(context, params, weexEventBean.getCallbacks());
                break;
            case WXConstant.WXEventCenter.EVENT_RELAYTOCRICLE:
                new EventShare().relayToCricle(context, params, weexEventBean.getCallbacks());
                break;
            case WXConstant.WXEventCenter.EVENT_OAUTH_LOGIN:
                new EventAuth().login(context, params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_OPENBROWSER:
                new EventOpenBrowser().openBrowser(context, params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_COMMUNICATION_SMS:
                new EventCommunication().sms(weexEventBean.getExpand().toString(), params, context);
                break;
            case WXConstant.WXEventCenter.EVENT_COMMUNICATION_CONTACTS:
                new EventCommunication().contacts(context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_SET_HOMEPAGE:
                new EventSetHomePage().setHomePage(context, params);
                break;
            case WXConstant.WXEventCenter.EVENT_IMAGE_PICK:
                new EventImage().pick(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_IMAGE_UPLOAD:
                new EventFetch().uploadImage(params, context, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_NAV:
                new EventNav().nav(params, context);
                break;
            case WXConstant.WXEventCenter.EVENT_UNAUTH:
                new EventAuth().unAuth(context, params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_SOCIAL_SHARE:
                new EventAuth().share(context, params, weexEventBean.getJscallback());
                break;
            case WXConstant.WXEventCenter.EVENT_GEOLOCATION_GET:
                reflectionClazzPerform("com.plugamap.EventGeo"
                        , context
                        , params
                        , weexEventBean.getJscallback()
                        , "");
                break;
            default:

                break;
        }
    }


    private void reflectionClazzPerform(String clazzName, Context context, String params, JSCallback jscallback, String errosMsg) {
        EventGate event = EventGateFactory.getEventGate(clazzName);
        if (null != event) {
            if (TextUtils.isEmpty(params)) {
                event.perform(context, jscallback);
            } else {
                event.perform(context, params, jscallback);
            }
        } else {
            if (TextUtils.isEmpty(params)) {
                JsPoster.postFailed(jscallback);
            } else {
                JsPoster.postFailed(errosMsg, jscallback);
            }

        }
    }

}
