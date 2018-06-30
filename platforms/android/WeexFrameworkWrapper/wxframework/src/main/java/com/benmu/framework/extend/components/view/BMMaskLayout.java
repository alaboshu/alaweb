package com.benmu.framework.extend.components.view;

import android.content.Context;
import android.graphics.Canvas;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.benmu.framework.extend.components.BMMask;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;
import com.taobao.weex.utils.WXViewUtils;

import java.lang.ref.SoftReference;

/**
 * Created by Carry on 2017/4/28.
 */

public class BMMaskLayout extends FrameLayout implements WXGestureObservable {
    private WXGesture wxGesture;
    private SoftReference<BMMask> mComponent;

    public BMMaskLayout(Context context) {
        super(context);
    }

    @Override
    public void registerGestureListener(WXGesture wxGesture) {
        this.wxGesture = wxGesture;
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
    protected void onDraw(Canvas canvas) {
        WXViewUtils.clipCanvasWithinBorderBox(this, canvas);
        super.onDraw(canvas);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if (mComponent != null) {
            BMMask bmMask = mComponent.get();
            if (BMMask.TRANSLATE.equalsIgnoreCase(bmMask.getCurrentAnimationType()) && BMMask
                    .BOTTOM.equalsIgnoreCase(bmMask.getCurrentAnimationPosition())) {
                layoutChildToBottom();
            }
        }
    }


    private void layoutChildToBottom() {
        int childCount = getChildCount();
        for (int i = 0; i < childCount; i++) {
            View child = getChildAt(i);
            LayoutParams layoutParams = (LayoutParams) child
                    .getLayoutParams();
            if (layoutParams == null) {
                layoutParams = new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,
                        ViewGroup.LayoutParams.WRAP_CONTENT);
            }
            layoutParams.gravity = Gravity.BOTTOM;
            child.setLayoutParams(layoutParams);
        }
    }


    public void setHoldComponent(BMMask mask) {
        if (mComponent == null) {
            mComponent = new SoftReference<BMMask>(mask);
        }
    }


}
