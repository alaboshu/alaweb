package com.benmu.framework.utils;

import android.support.annotation.NonNull;
import android.text.Layout;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextUtils;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.AlignmentSpan;
import android.text.style.ForegroundColorSpan;
import android.text.style.StrikethroughSpan;
import android.text.style.UnderlineSpan;

import com.benmu.widget.utils.ColorUtils;
import com.taobao.weex.common.Constants;
import com.taobao.weex.dom.WXAttr;
import com.taobao.weex.dom.WXCustomStyleSpan;
import com.taobao.weex.dom.WXLineHeightSpan;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXTextDecoration;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by Carry on 2017/7/19.
 */

public class BMRichUtil {
    private static final int UNSET = -1;
    private String mText;
    private int mFontSize = UNSET;
    private int mViewPortWidth = 750;
    private int mFontWeight = UNSET;
    private int mFontStyle = UNSET;
    private int mColor;
    private boolean mIsColorSet = false;
    private WXTextDecoration mTextDecoration = WXTextDecoration.NONE;
    private String mFontFamily = null;
    private Layout.Alignment mAlignment;
    private TextUtils.TruncateAt textOverflow;
    private int mLineHeight = UNSET;

    public Spanned createSpan(WXAttr attr, WXStyle style) {
        if (attr != null) {
            Object o = attr.get(Constants.Name.VALUE);
            if (o != null) {
                mText = o.toString();
            }
        }
        if (style != null) {
            updateStyleImp(style);
        }

        return createSpanned(mText);

    }


    private
    @NonNull
    Spanned createSpanned(String text) {
        if (!TextUtils.isEmpty(text)) {
            SpannableString spannable = new SpannableString(text);
            updateSpannable(spannable, Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
            return spannable;
        }
        return new SpannableString("");
    }

    private void updateSpannable(Spannable spannable, int spanFlag) {
        List<SetSpanOperation> ops = createSetSpanOperation(spannable.length(), spanFlag);
        if (mFontSize == UNSET) {
            ops.add(new SetSpanOperation(0, spannable.length(),
                    new AbsoluteSizeSpan(WXText.sDEFAULT_SIZE), spanFlag));
        }
        Collections.reverse(ops);
        for (SetSpanOperation op : ops) {
            op.execute(spannable);
        }
    }

    private List<SetSpanOperation> createSetSpanOperation(int end, int spanFlag) {
        List<SetSpanOperation> ops = new LinkedList<>();
        int start = 0;
        if (end >= start) {
            if (mTextDecoration == WXTextDecoration.UNDERLINE) {
                ops.add(new SetSpanOperation(start, end,
                        new UnderlineSpan(), spanFlag));
            }
            if (mTextDecoration == WXTextDecoration.LINETHROUGH) {
                ops.add(new SetSpanOperation(start, end,
                        new StrikethroughSpan(), spanFlag));
            }
            if (mIsColorSet) {
                ops.add(new SetSpanOperation(start, end,
                        new ForegroundColorSpan(mColor), spanFlag));
            }
            if (mFontSize != UNSET) {
                ops.add(new SetSpanOperation(start, end, new AbsoluteSizeSpan(mFontSize),
                        spanFlag));
            }
            if (mFontStyle != UNSET
                    || mFontWeight != UNSET
                    || mFontFamily != null) {
                ops.add(new SetSpanOperation(start, end,
                        new WXCustomStyleSpan(mFontStyle, mFontWeight, mFontFamily),
                        spanFlag));
            }
            ops.add(new SetSpanOperation(start, end, new AlignmentSpan.Standard(mAlignment),
                    spanFlag));
            if (mLineHeight != UNSET) {
                ops.add(new SetSpanOperation(start, end, new WXLineHeightSpan(mLineHeight),
                        spanFlag));
            }
        }
        return ops;
    }


    private static class SetSpanOperation {

        protected final int start, end, flag;
        protected final Object what;

        SetSpanOperation(int start, int end, Object what) {
            this(start, end, what, Spanned.SPAN_INCLUSIVE_EXCLUSIVE);
        }

        SetSpanOperation(int start, int end, Object what, int flag) {
            this.start = start;
            this.end = end;
            this.what = what;
            this.flag = flag;
        }

        public void execute(Spannable sb) {
            sb.setSpan(what, start, end, flag);
        }
    }


    private void updateStyleImp(Map<String, Object> style) {
        if (style != null) {
            if (style.containsKey(Constants.Name.FONT_SIZE)) {
                mFontSize = WXStyle.getFontSize(style, mViewPortWidth);
            }
            if (style.containsKey(Constants.Name.FONT_WEIGHT)) {
                mFontWeight = WXStyle.getFontWeight(style);
            }
            if (style.containsKey(Constants.Name.FONT_STYLE)) {
                mFontStyle = WXStyle.getFontStyle(style);
            }
            if (style.containsKey(Constants.Name.COLOR)) {
                mColor = ColorUtils.getColor(WXStyle.getTextColor(style));
                mIsColorSet = mColor != Integer.MIN_VALUE;
            }
            if (style.containsKey(Constants.Name.TEXT_DECORATION)) {
                mTextDecoration = WXStyle.getTextDecoration(style);
            }
            if (style.containsKey(Constants.Name.FONT_FAMILY)) {
                mFontFamily = WXStyle.getFontFamily(style);
            }
            mAlignment = WXStyle.getTextAlignment(style);
            textOverflow = WXStyle.getTextOverflow(style);
            int lineHeight = WXStyle.getLineHeight(style, mViewPortWidth);
            if (lineHeight != UNSET) {
                mLineHeight = lineHeight;
            }
        }
    }
}
