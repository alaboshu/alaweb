package com.benmu.framework.extend.components.view;

import android.content.Context;
import android.graphics.Canvas;
import android.text.Layout;
import android.view.MotionEvent;
import android.view.View;

import com.benmu.framework.extend.components.BMWXText;
import com.taobao.weex.ui.view.IRenderStatus;
import com.taobao.weex.ui.view.IWXTextView;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;

import java.lang.ref.WeakReference;

/**
 * Created by Carry on 17/3/27.
 */

public class BMWXTextView extends View implements WXGestureObservable, IWXTextView,
        IRenderStatus<BMWXText> {
    private WeakReference<BMWXText> mWeakReference;
    private WXGesture wxGesture;
    private Layout textLayout;

    public BMWXTextView(Context context) {
        super(context);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.save();
        Layout layout = getTextLayout();
        if (layout != null) {
            canvas.translate(getPaddingLeft(), getPaddingTop());
            layout.draw(canvas);
        }
        canvas.restore();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        boolean result = super.onTouchEvent(event);
        if (wxGesture != null) {
            result |= wxGesture.onTouch(this, event);
        }
        return result;
    }

    @Override
    public void registerGestureListener(WXGesture wxGesture) {
        this.wxGesture = wxGesture;
    }

    @Override
    public CharSequence getText() {
        return textLayout.getText();
    }

    public Layout getTextLayout() {
        return textLayout;
    }

    public void setTextLayout(Layout layout) {
        this.textLayout = layout;
        if (layout != null) {
            setContentDescription(layout.getText());
        }
        if (mWeakReference != null) {
            BMWXText wxText = mWeakReference.get();
            if (wxText != null) {
                wxText.readyToRender();
            }
        }
    }


    @Override
    public void holdComponent(BMWXText component) {
        mWeakReference = new WeakReference<>(component);
    }
}
