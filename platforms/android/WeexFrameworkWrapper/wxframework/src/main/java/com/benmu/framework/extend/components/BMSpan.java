package com.benmu.framework.extend.components;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.TextPaint;
import android.text.style.ClickableSpan;
import android.view.View;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXVContainer;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Carry on 2017/6/14.
 */

public class BMSpan extends WXComponent<View> {
    private Set<String> mAppendEvents = new HashSet<>();

    public BMSpan(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String
            instanceId, boolean isLazy) {
        super(instance, dom, parent, instanceId, isLazy);
    }

    public BMSpan(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, boolean isLazy) {
        super(instance, dom, parent, isLazy);
    }

    public BMSpan(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
        super(instance, dom, parent);
        postBubbleEvent(parent, dom);
    }


    public void postBubbleEvent(WXComponent parent, WXDomObject object) {
        if (parent == null) return;
        if (parent instanceof BMRich) {
            BMRich bmRichText = (BMRich) parent;
            bmRichText.receiveBubbleEvent(object);
        } else {
            postBubbleEvent(parent.getParent(), object);
        }
    }


    @Override
    protected View initComponentHostView(@NonNull Context context) {
        return new View(context);
    }

    @Override
    public void updateExtra(Object extra) {
        super.updateExtra(extra);
    }

    static class BMRichClickSpan extends ClickableSpan {
        private final View.OnClickListener mListener;

        public BMRichClickSpan(View.OnClickListener mListener) {
            this.mListener = mListener;
        }

        @Override
        public void onClick(View v) {
            mListener.onClick(v);
        }

        @Override
        public void updateDrawState(TextPaint ds) {
            ds.setUnderlineText(false);    //去除超链接的下划线
        }
    }
}



