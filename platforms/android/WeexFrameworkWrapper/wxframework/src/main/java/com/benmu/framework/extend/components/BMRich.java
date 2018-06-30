package com.benmu.framework.extend.components;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.Layout;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.StaticLayout;
import android.text.TextUtils;
import android.text.style.ClickableSpan;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.benmu.framework.extend.components.view.BMWXTextView;
import com.benmu.framework.utils.BMRichUtil;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.ImmutableDomObject;
import com.taobao.weex.dom.RichTextDomObject;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXEvent;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.dom.WXTextDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Carry on 2017/6/14.
 */

public class BMRich extends WXVContainer<LinearLayout> {

    private BMWXTextView richText;
    private SpannableStringBuilder spannableStringBuilder = new SpannableStringBuilder();
    private List<RichTextDomObject.BMRichSpan> mSpans = new ArrayList<>();
    private StringBuilder mText = new StringBuilder();
    private int mSubCount;
    private MockMovementMeltedTouchListener mTouchListenner;
    private List<WXComponent> mBMSpans = new ArrayList<>();

    public BMRich(WXSDKInstance instance, WXDomObject node, WXVContainer parent) {
        super(instance, node, parent);
    }

    @Override
    protected LinearLayout initComponentHostView(@NonNull Context context) {
        LinearLayout root = new LinearLayout(context);
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams
                .WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        root.setLayoutParams(layoutParams);
        richText = new BMWXTextView(context);
        root.addView(richText);
        return root;
    }

    @Override
    public void addChild(WXComponent child, int index) {
    }


    public void receiveBubbleEvent(WXDomObject wxDomObject) {
        if (wxDomObject == null) return;
        organizeChild(wxDomObject);
    }


    private void organizeChild(WXDomObject object) {
        if (object instanceof WXTextDomObject) {
            WXTextDomObject textDomObject = (WXTextDomObject) object;
            BMRichUtil util = new BMRichUtil();
            Spanned test = util.createSpan(textDomObject.getAttrs(), textDomObject.getStyles
                    ());

            SpannableString spannableString = ((SpannableString) test);
            Object[] spans = spannableString.getSpans(0, spannableString.length()
                    , Object.class);
            for (Object span : spans) {
                mSpans.add(new RichTextDomObject.BMRichSpan(span, mText.length(),
                        spannableString.length()
                                + mText.length()
                ));
            }
            //设置span的事件
            WXEvent events = object.getEvents();
            for (String event : events) {
                appendChildEvent(event, spannableString, textDomObject);
            }
            mText.append(spannableString.toString());
            spannableStringBuilder.append(spannableString);
        }

        update();
    }


    private void aggregateChild(WXComponent child) {
        if (child != null) {
            ImmutableDomObject domObject = child.getDomObject();
            if (domObject instanceof WXTextDomObject) {
                WXTextDomObject textDomObject = (WXTextDomObject) domObject;
//                Layout extra = textDomObject.getExtra();
//                Log.e("extra", "extra>>>>>>" + extra + "count>>>>" + mSubCount);
                BMRichUtil util = new BMRichUtil();
                Spanned test = util.createSpan(textDomObject.getAttrs(), textDomObject.getStyles
                        ());

//                if (extra instanceof StaticLayout) {
//                    CharSequence text = ((StaticLayout) extra).getText();
                SpannableString spannableString = ((SpannableString) test);
                Object[] spans = spannableString.getSpans(0, spannableString.length()
                        , Object.class);
                for (Object span : spans) {
                    mSpans.add(new RichTextDomObject.BMRichSpan(span, mText.length(),
                            spannableString.length()
                                    + mText.length()
                    ));
                }
                //设置span的事件
                WXEvent events = domObject.getEvents();
                for (String event : events) {
                    appendChildEvent(event, spannableString, textDomObject);
                }
                mText.append(spannableString.toString());
                spannableStringBuilder.append(spannableString);
//                }
            }
        }
        mSubCount--;
//        if (mSubCount == 0) {
        //子控件添加完毕 更新
        update();
//        }

    }

    private void appendChildEvent(String event, SpannableString spannableString, final
    WXTextDomObject
            textDomObject) {
        if (TextUtils.isEmpty(event)) {
            return;
        }


        if (event.equals(Constants.Event.CLICK)) {
            //在此处设置click事件
            View.OnClickListener l = new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    getInstance().fireEvent(textDomObject.getRef(), Constants.Event.CLICK);
                }
            };
            BMSpan.BMRichClickSpan clickable = new BMSpan.BMRichClickSpan(l);
            mSpans.add(new RichTextDomObject.BMRichSpan(clickable, mText.length(),
                    spannableString.length()
                            + mText.length()));
            if (mTouchListenner == null) {
                mTouchListenner = new MockMovementMeltedTouchListener();
                richText.setOnTouchListener(mTouchListenner);
            }
        }

    }


    @Override
    protected void onFinishLayout() {
    }


    private void update() {
        WXStyle styles = getDomObject().getStyles();
        if (styles == null) {
            styles = new WXStyle();
        }
        //如果此时style为empty不会触发更新 我们在这里加入一个占位符保证style不为empty
        if (styles.isEmpty()) {
            styles.put("placeholder", "bm");
        }
        updateStyle(styles);
    }


    @Override
    public void updateExtra(Object extra) {
        Log.e("extra", "updateExtra" + richText + "extra" + extra);
        if (richText != null && extra != null) {
            richText.setTextLayout((StaticLayout) extra);
        }
    }

    private class MockMovementMeltedTouchListener implements View.OnTouchListener {

        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            int action = motionEvent.getAction();
            CharSequence text = richText.getText();
            if (text instanceof SpannableString) {
                if (action == MotionEvent.ACTION_UP) {
                    int x = (int) motionEvent.getX();
                    int y = (int) motionEvent.getY();

                    x -= richText.getPaddingLeft();
                    y -= richText.getPaddingTop();

                    x += richText.getScrollX();
                    y += richText.getScrollY();

                    Layout layout = richText.getTextLayout();
                    int line = layout.getLineForVertical(y);
                    int off = layout.getOffsetForHorizontal(line, x);

                    ClickableSpan[] link = ((SpannableString) text).getSpans(off, off,
                            ClickableSpan.class);
                    if (link.length != 0) {
                        link[0].onClick(richText);
                    } else {
                        //do textview click event
                    }
                }
            }

            return true;
        }
    }


    @Override
    public String getRichSpanned() {
        return mText.toString();
    }


    @Override
    public List<RichTextDomObject.BMRichSpan> getSpans() {
        return mSpans;
    }

    @WXComponentProp(name = "subcomponentCount")
    public void setSubCount(String subCount) {
        if (!TextUtils.isEmpty(subCount)) {
            mSubCount = WXUtils.getInt(subCount);
        }
    }
}
