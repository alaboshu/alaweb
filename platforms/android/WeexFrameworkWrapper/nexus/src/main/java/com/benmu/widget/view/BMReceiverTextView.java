package com.benmu.widget.view;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.support.v4.content.LocalBroadcastManager;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.widget.TextView;

import com.benmu.widget.utils.BaseCommonUtil;

/**
 * Created by Carry on 17/3/16.
 */

public class BMReceiverTextView extends TextView {
    private BroadcastReceiver mReceiver;
    private String[] mActionFilter;
    private Context mContext;
    private String mCurrentFontSize;
    private String mChangeFontSize;
    private float mCurrentEnlarge;
    private boolean mAutoZoom;
    private int mAvailableWidth;
    private float mCurrentTextSize;

    public BMReceiverTextView(Context context) {
        this(context, null);
    }

    public BMReceiverTextView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public BMReceiverTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.mContext = context;
        init();
    }

    private void init() {
    }

    public void initFontSize(String fontSize) {
        this.mCurrentFontSize = fontSize;
        if (mCurrentFontSize != null) {
            mCurrentEnlarge = BaseCommonUtil.getScaleByFontsize(mCurrentFontSize);
            setTextSize(TypedValue.COMPLEX_UNIT_PX, getTextSize() * mCurrentEnlarge);
        }
    }

    public void setIntentFilter(String[] actions) {
        if (actions == null) return;
        mActionFilter = actions;
        mReceiver = new MyBroadcastReceiver();
        IntentFilter intentFilter = new IntentFilter();
        for (String action : mActionFilter) {
            intentFilter.addAction(action);
        }
        LocalBroadcastManager.getInstance(mContext).registerReceiver(mReceiver, intentFilter);
    }


    private class MyBroadcastReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            mChangeFontSize = intent.getStringExtra("currentFontSize");
            if (mCurrentFontSize.equals(mChangeFontSize)) {
                return;
            }
            float changEnlarge = BaseCommonUtil.getScaleByFontsize(mChangeFontSize);
            setTextSize(TypedValue.COMPLEX_UNIT_PX, getTextSize() * (changEnlarge /
                    mCurrentEnlarge));
            mCurrentEnlarge = changEnlarge;
            mCurrentFontSize = mChangeFontSize;
            mChangeFontSize = null;
        }
    }


    public void setAutoZoomEnable(boolean autoZoomEnable) {
        this.mAutoZoom = autoZoomEnable;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (mAutoZoom) {
            autoZoom();
        }
    }

    private void autoZoom() {
        int width = getWidth();
        mAvailableWidth = width - getPaddingLeft() - getPaddingRight();
        // calculate text width
        CharSequence text = getText();
        if (text == null) return;
        Paint measruePaint = new Paint();
        measruePaint.set(getPaint());

        Rect textRect = new Rect();
        measruePaint.getTextBounds((String) text, 0, text.length(), textRect);

        int textWidth = textRect.width();
        if (textWidth <= 0 || textWidth <= mAvailableWidth) return;

        //reduce textSize
        mCurrentTextSize = getTextSize();
        while (textWidth > mAvailableWidth) {
            mCurrentTextSize--;
            measruePaint.setTextSize(mCurrentTextSize);
            measruePaint.getTextBounds((String) text, 0, text.length(), textRect);
            textWidth = textRect.width();
        }
        setTextSize(TypedValue.COMPLEX_UNIT_PX, mCurrentTextSize);
    }
}
