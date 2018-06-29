package com.benmu.framework.extend.components;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.support.annotation.NonNull;
import android.support.v4.content.LocalBroadcastManager;
import android.text.Layout;

import com.benmu.framework.extend.components.view.BMWXTextView;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXAttr;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.ui.ComponentCreator;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXVContainer;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by Carry on 17/3/27.
 */
public class BMWXText extends WXComponent<BMWXTextView> {
    public BMWXText(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        registerBroadCast();
        initFontSize();
    }


    public static final int sDEFAULT_SIZE = 32;
    private BMWXText.DefaultBroadcastReceiver mReceiver;
    private Layout mCurrentLayout;
    private String mCurrentFontSize = "NORM";
    private String mChangeFontSize;
    private float mCurrentEnlarge;
    private float mCurrentScale = 1;
    private boolean has = false;

    public static class Creator implements ComponentCreator {

        public WXComponent createInstance(WXSDKInstance instance, WXDomObject node, WXVContainer
                parent) throws IllegalAccessException, InvocationTargetException,
                InstantiationException {
            return new WXText(instance, node, parent);
        }
    }

    @Deprecated
    public BMWXText(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String
            instanceId, boolean isLazy) {
        this(instance, dom, parent);
    }


    @Override
    protected BMWXTextView initComponentHostView(@NonNull Context context) {
        BMWXTextView textView = new BMWXTextView(context);
        return textView;
    }

    @Override
    public void updateExtra(Object extra) {
        if (extra instanceof Layout &&
                getHostView() != null && !extra.equals(getHostView().getTextLayout())) {

            final Layout layout = (Layout) extra;
            getHostView().setTextLayout(layout);
            getHostView().invalidate();
        }
        updateFontSize();
//        if (!has) {
//            WXStyle styles = getDomObject().getStyles();
//            styles.put("width", 1080);
//            styles.put("height", Math.ceil(38.8*750/1080.0));
//            updateStyle(styles);
//            has = true;
//        }
    }

    @Override
    public void refreshData(WXComponent component) {
        super.refreshData(component);
        if (component instanceof WXText) {
            updateExtra(component.getDomObject().getExtra());
        }
    }

    @Override
    protected boolean setProperty(String key, Object param) {
        switch (key) {
            case Constants.Name.LINES:
            case Constants.Name.FONT_SIZE:
            case Constants.Name.FONT_WEIGHT:
            case Constants.Name.FONT_STYLE:
            case Constants.Name.COLOR:
            case Constants.Name.TEXT_DECORATION:
            case Constants.Name.FONT_FAMILY:
            case Constants.Name.TEXT_ALIGN:
            case Constants.Name.TEXT_OVERFLOW:
            case Constants.Name.LINE_HEIGHT:
            case Constants.Name.VALUE:
                return true;
            default:
                return super.setProperty(key, param);
        }
    }

    /**
     * Flush view no matter what height and width the {@link WXDomObject} specifies.
     *
     * @param extra must be a {@link Layout} object, otherwise, nothing will happen.
     */
    private void flushView(Object extra) {

    }


    @Override
    protected Object convertEmptyProperty(String propName, Object originalValue) {
        switch (propName) {
            case Constants.Name.FONT_SIZE:
                return WXText.sDEFAULT_SIZE;
            case Constants.Name.COLOR:
                return "black";
        }
        return super.convertEmptyProperty(propName, originalValue);
    }


    /**
     * 自定义方法start
     **/
    private void initFontSize() {
        SharedPreferences sp = getContext().getSharedPreferences("JYT_NATIVE_SP", Context
                .MODE_PRIVATE);
        mChangeFontSize = sp.getString("SP_FONTSIZE", null);
    }

    private void registerBroadCast() {
        mReceiver = new BMWXText.DefaultBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("com.benmu.jyt.ACTION_GOBALFONTSIZE_CHANGE");
        LocalBroadcastManager.getInstance(getContext()).registerReceiver(mReceiver, filter);
    }


    private void updateFontSize() {
        if (mChangeFontSize == null) {
            return;
        }

        WXStyle styles = null;
        WXAttr attrs = null;
        if (getDomObject() != null) {
            styles = getDomObject().getStyles();
            attrs = getDomObject().getAttrs();
            if ((styles != null && "iconfont".equals(styles.get("fontFamily"))) || (attrs != null
                    && attrs.get("changeFont") != null && !Boolean.valueOf((String) attrs.get
                    ("changeFont")))) {
                return;
            }
        }

        float scale = 0;
        //获取fontScale字段
        if (attrs != null && attrs.get("fontScale") != null) {
            float fontScale = Float.valueOf((String) attrs.get("fontScale"));
            mCurrentScale = fontScale / mCurrentScale;
        }
        if (mChangeFontSize.equals(mCurrentFontSize) && mCurrentScale == 1) {
            return;
        }
        //获取scale字段 在标准字体下不产生变化
        if (attrs != null && attrs.get("scale") != null && !(scale > 0)) {
            scale = Float.valueOf((String) attrs.get("scale"));
            float change = getFixedEnlarge(mChangeFontSize, scale);
            float current = getFixedEnlarge(mCurrentFontSize, scale);
            scale = change / current;
        }
        //根据全局字体配置设置字体大小
        if (!(scale > 0)) {
            float current = getEnlarge(mCurrentFontSize);
            float change = getEnlarge(mChangeFontSize);
            scale = change / current * mCurrentScale;
        }
        if (getDomObject() != null && getDomObject().getStyles() != null) {
            WXStyle wxStyle = getDomObject().getStyles();
            Object object = wxStyle.get("fontSize");
            if (object instanceof Integer) {
                int fontSize = (int) object;
                int changeFontSize = (int) (fontSize * (scale));
                wxStyle.put("fontSize", changeFontSize);

            }
            //设置lineHeight
            Object lineHeight = wxStyle.get("lineHeight");
            if (lineHeight instanceof Integer) {
                int target = (int) lineHeight;
                wxStyle.put("lineHeight", (int) (target * scale));
            }


            updateStyle(wxStyle);

        }
        mCurrentFontSize = mChangeFontSize;

    }

    /**
     * 自定义方法end
     **/


    /**
     * 自定义方法start
     **/

    private float getEnlarge(String fontsize) {
        if ("NORM".equals(fontsize)) {
            return 1;
        } else if ("BIG".equals(fontsize)) {
            return 1.15f;
        } else if ("EXTRALARGE".equals(fontsize)) {
            return 1.3f;
        } else {
            throw new RuntimeException("未知的字体大小" + fontsize);
        }
    }

    private float getFixedEnlarge(String fontsize, float scale) {
        if ("NORM".equals(fontsize)) {
            return 1;
        } else if ("BIG".equals(fontsize)) {
            return scale;
        } else if ("EXTRALARGE".equals(fontsize)) {
            return scale;
        } else {
            throw new RuntimeException("未知的字体大小" + fontsize);
        }
    }

    public class DefaultBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String size = intent.getStringExtra("currentFontSize");
            if (size == null) {
                return;
            }
            mChangeFontSize = size;
            updateFontSize();
        }
    }

}


