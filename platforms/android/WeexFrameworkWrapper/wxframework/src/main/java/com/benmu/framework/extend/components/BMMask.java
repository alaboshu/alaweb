package com.benmu.framework.extend.components;

import android.animation.Animator;
import android.animation.ValueAnimator;
import android.content.Context;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.view.View;

import com.benmu.framework.extend.components.view.BMMaskLayout;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.dom.WXAttr;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Created by Carry on 2017/4/28.
 */

public class BMMask extends WXVContainer<BMMaskLayout> implements View.OnClickListener {
    private BMMaskLayout mContainer;
    private long mDuration = 300;
    private ValueAnimator mShowAnimation;
    private ValueAnimator mHideAnimation;
    private boolean isAnimating;
    private static final int STATUS_SHOW = 0;
    private static final int STATUS_HIDE = 1;
    private int mCurrentStatus = STATUS_HIDE;
    private BMPop mSubComponent;
    private boolean mDisableMaskEvent = false;
    //pop弹出位置
    public static final String CENTER = "center";
    public static final String LEFT = "left";
    public static final String RIGHT = "right";
    public static final String TOP = "top";
    public static final String BOTTOM = "bottom";

    //支持的动画类型
    public static final String TRANSLATE = "transition";
    public static final String SCALE = "scale";
    public static final String APLHA = "aplha";


    private String mCurrentAnimationType;
    private String mCurrentPosition;


    public String getCurrentAnimationType() {
        return mCurrentAnimationType;
    }


    public String getCurrentAnimationPosition() {
        return mCurrentPosition;
    }

    public BMMask(WXSDKInstance instance, WXDomObject node, WXVContainer parent) {
        super(instance, node, parent);
        WXAttr attrs = getDomObject().getAttrs();
        Object o = attrs.get("position");
        if (o instanceof String) {
            mCurrentPosition = (String) o;
        }
    }

    @Override
    protected BMMaskLayout initComponentHostView(@NonNull Context context) {
        mContainer = new BMMaskLayout(context);
        mContainer.setHoldComponent(this);
        mContainer.setVisibility(View.GONE);
        mContainer.setOnClickListener(this);
        initAnimation(mContainer);
        return mContainer;
    }

    private void initAnimation(View view) {
        mShowAnimation = ValueAnimator.ofFloat(0, 1);
        mShowAnimation.setTarget(view);
        mHideAnimation = ValueAnimator.ofFloat(1, 0);
        mHideAnimation.setTarget(view);
        MaskAnimationListener mAnimationListener = new MaskAnimationListener();
        MaskShowListener mShowListener = new MaskShowListener();
        MaskHideListener mHideListener = new MaskHideListener();
        mShowAnimation.addUpdateListener(mAnimationListener);
        mHideAnimation.addUpdateListener(mAnimationListener);
        mShowAnimation.addListener(mShowListener);
        mHideAnimation.addListener(mHideListener);

    }

    /**
     * 显示蒙层
     */
    @JSMethod
    public void show() {
        showAnimation();
    }


    /**
     * 隐藏蒙层
     */
    @JSMethod
    public void hide() {
        hideAnimation();
    }

    /**
     * 设置动画类型
     */
    @WXComponentProp(name = "animation")
    public void setAnimationType(String animationType) {
        if ("center".equalsIgnoreCase(animationType)) {
            animationType = SCALE;
        } else if ("bottom".equalsIgnoreCase(animationType)) {
            animationType = TRANSLATE;
            mCurrentPosition = BOTTOM;
        }
        this.mCurrentAnimationType = animationType;
    }

    /**
     * 设置动画位置
     */
    @WXComponentProp(name = "position")
    public void setPosition(String position) {
        this.mCurrentPosition = position;
    }

    private boolean shouldShow() {
        return isAnimating || mCurrentStatus == STATUS_SHOW;
    }

    private boolean shouldHide() {
        return isAnimating || mCurrentStatus == STATUS_HIDE;
    }

    /**
     * 设置动画时长
     */
    @WXComponentProp(name = "duration")
    public void setDuration(long duration) {
        this.mDuration = duration;
    }

    @WXComponentProp(name = "disableMaskEvent")
    public void disableMaskEvent(boolean disableMaskEvent) {
        this.mDisableMaskEvent = disableMaskEvent;
    }

    private void hideAnimation() {
        if (shouldHide()) return;
        mHideAnimation.setDuration(mDuration);
        mHideAnimation.start();
    }

    private void showAnimation() {
        if (shouldShow()) return;
        mContainer.setVisibility(View.VISIBLE);
        mShowAnimation.setDuration(mDuration);
        mShowAnimation.start();
    }

    @Override
    public void onClick(View v) {
        if (mDisableMaskEvent) {
            return;
        }
        hide();
        fireEvent("hide", null);
    }


    private class MaskAnimationListener implements ValueAnimator.AnimatorUpdateListener {

        @Override
        public void onAnimationUpdate(ValueAnimator animation) {
            float alpha = (float) animation.getAnimatedValue();
            BMMask.this.getHostView().setAlpha(alpha);
        }

    }

    private class MaskShowListener implements ValueAnimator.AnimatorListener {

        @Override
        public void onAnimationStart(Animator animation) {
            isAnimating = true;
            mContainer.setAlpha(0);
            if (getChildCount() > 0) {
                WXComponent child = getChild(0);
                if (child instanceof BMPop) {
                    if (mSubComponent == null) {
                        mSubComponent = (BMPop) child;
                    }
                    String type = mCurrentAnimationType;
                    String position = mCurrentPosition;
                    if (TextUtils.isEmpty(type) && TextUtils.isEmpty
                            (position)) {
                        type = TRANSLATE;
                        position = BOTTOM;
                    } else if (TextUtils.isEmpty(type) && TOP.equals
                            (position)) {
                        //医生端首页
                        type = APLHA;
                    } else if (TextUtils.isEmpty(position) && "bottom".equalsIgnoreCase(type)) {
                        type = TRANSLATE;
                        position = BOTTOM;
                    }
                    mSubComponent.showPop(mDuration, type, position);
                }
            }
        }

        @Override
        public void onAnimationEnd(Animator animation) {
            isAnimating = false;
            mCurrentStatus = STATUS_SHOW;
            mContainer.setVisibility(View.VISIBLE);
            fireEvent("show", null);
        }

        @Override
        public void onAnimationCancel(Animator animation) {

        }

        @Override
        public void onAnimationRepeat(Animator animation) {

        }
    }

    private class MaskHideListener implements ValueAnimator.AnimatorListener {

        @Override
        public void onAnimationStart(Animator animation) {
            isAnimating = true;
            if (getChildCount() > 0) {
                WXComponent child = getChild(0);
                if (child instanceof BMPop) {
                    if (mSubComponent == null) {
                        mSubComponent = (BMPop) child;
                    }
                    String type = mCurrentAnimationType;
                    String position = mCurrentPosition;
                    if (TextUtils.isEmpty(type) && TextUtils.isEmpty
                            (position)) {
                        type = TRANSLATE;
                        position = BOTTOM;
                    } else if (TextUtils.isEmpty(type) && TOP.equals
                            (position)) {
                        //医生端首页
                        type = APLHA;
                    } else if (TextUtils.isEmpty(position) && "bottom".equalsIgnoreCase(type)) {
                        type = TRANSLATE;
                        position = BOTTOM;
                    }
                    mSubComponent.hidePop(mDuration, type, position);
                }
            }
        }

        @Override
        public void onAnimationEnd(Animator animation) {
            isAnimating = false;
            mCurrentStatus = STATUS_HIDE;
        }

        @Override
        public void onAnimationCancel(Animator animation) {

        }

        @Override
        public void onAnimationRepeat(Animator animation) {

        }
    }

    void hideSelf() {
        if (mContainer != null) {
            mContainer.setVisibility(View.GONE);
        }
    }

}
