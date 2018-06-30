package com.benmu.framework.adapter;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.BaseResultBean;
import com.benmu.framework.model.NavigatorBarModel;
import com.benmu.framework.utils.BMHookGlide;
import com.benmu.widget.utils.ColorUtils;
import com.benmu.widget.view.BaseToolBar;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.utils.WXUtils;

/**
 * Created by Carry on 2017/9/13.
 */

public class DefaultNavigationAdapter {

    public static void setLeftItem(String params, final JSCallback jscallback) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NavigatorBarModel navigatorBarModel = parseManager.parseObject(params, NavigatorBarModel
                .class);
        BaseToolBar navigationBar = getToolBar();
        if (navigationBar == null) return;

        setTextView(navigationBar.getLeftTextView(), navigatorBarModel);

        if (!TextUtils.isEmpty(navigatorBarModel.getImage())) {
            setImage(BMWXEnvironment.mApplicationContext, navigatorBarModel.getImage(),
                    navigationBar
                            .getLeftIcon());
        }

        if (jscallback != null) {

            navigationBar.setOnWebClosedListenner(new BaseToolBar.OnWebViewClosed() {
                @Override
                public void onClick(View v) {
                    jscallback.invokeAndKeepAlive(new BaseResultBean());
                }
            });
            navigationBar.setOnLeftListenner(new BaseToolBar.OnLeftIconClick() {
                @Override
                public void onClick(View v) {
                    jscallback.invokeAndKeepAlive(null);
                }
            });
        }
    }


    private static void setImage(Context context, String url, final ImageView image) {
        BMHookGlide.load(context, url)
                .apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL))
                .into(new SimpleTarget<Drawable>() {
                    @Override
                    public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                        image.setImageDrawable(resource);
                        image.setVisibility(View.VISIBLE);
                    }
                });
    }

    private static void setTextView(TextView textView, NavigatorBarModel navigatorBarModel) {
        if (textView == null) return;
        if (!TextUtils.isEmpty(navigatorBarModel.getFontSize())) {
            textView.setTextSize(WXUtils.getInt(navigatorBarModel.getFontSize()) / 2);
        }
        String fontWeight = navigatorBarModel.getFontWeight();
        if (!TextUtils.isEmpty(fontWeight) && !"normal".equals(fontWeight)) {
            textView.getPaint().setFakeBoldText(true);
        }else {
            textView.getPaint().setFakeBoldText(false);
        }
        String text = navigatorBarModel.getText();
        textView.setText(text);

        String textColor = navigatorBarModel.getTextColor();
        if (!TextUtils.isEmpty(textColor)) {
            textView.setTextColor(ColorUtils.getColor(textColor));
        } else {
            //传递颜色无效 检查基础配置中的颜色
            String navItemColor = BMWXEnvironment.mPlatformConfig.getPage().getNavItemColor();
            if (TextUtils.isEmpty(navItemColor)) {
                //没有设置基础颜色
                textView.setTextColor(ColorUtils.getColor("#ffffff"));
            } else {
                textView.setTextColor(ColorUtils.getColor(navItemColor));
            }
        }
        textView.setVisibility(View.VISIBLE);
    }

    public static void setRightItem(String params, final JSCallback jscallback) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NavigatorBarModel navigatorBarModel = parseManager.parseObject(params, NavigatorBarModel
                .class);
        BaseToolBar navigationBar = getToolBar();
        if (navigationBar == null) return;

        setTextView(navigationBar.getRightText(), navigatorBarModel);

        if (!TextUtils.isEmpty(navigatorBarModel.getImage())) {
            setImage(BMWXEnvironment.mApplicationContext, navigatorBarModel.getImage(),
                    navigationBar
                            .getRightIcon());
        }

        if (jscallback != null) {

            navigationBar.setOnRightListenner(new BaseToolBar.OnRightIconClick() {
                @Override
                public void onClick(View v) {
                    jscallback.invokeAndKeepAlive(new BaseResultBean());
                }
            });
        }
    }

    public static void setNavigationInfo(String params, final JSCallback jscallback) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NavigatorBarModel navigatorBarModel = parseManager.parseObject(params, NavigatorBarModel
                .class);
        BaseToolBar navigationBar = getToolBar();
        if (navigationBar == null) return;
        navigationBar.setVisibility(navigatorBarModel.isNavShow() ? View.VISIBLE : View.GONE);
        if (navigationBar.getVisibility() == View.GONE) return;
        if (jscallback != null)
            navigationBar.setOnTitleListenner(new BaseToolBar.OnTitleClick() {
                @Override
                public void onClick(View v) {
                    jscallback.invokeAndKeepAlive(new BaseResultBean());
                }
            });
    }

    public static void setCenterItem(String params, final JSCallback jscallback) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        NavigatorBarModel navigatorBarModel = parseManager.parseObject(params, NavigatorBarModel
                .class);
        BaseToolBar navigationBar = getToolBar();

        if (navigationBar == null) return;

        setTextView(navigationBar.getTitleTextView(), navigatorBarModel);

        if (jscallback != null)
            navigationBar.setOnTitleListenner(new BaseToolBar.OnTitleClick() {
                @Override
                public void onClick(View v) {
                    jscallback.invokeAndKeepAlive(new BaseResultBean());
                }
            });
    }

    private static BaseToolBar getToolBar() {
        Activity activity = RouterTracker.peekActivity();
        if (activity != null) {
            if (activity instanceof AbstractWeexActivity) {
                AbstractWeexActivity abs = (AbstractWeexActivity) activity;
                return abs.getNavigationBar();
            }
        }
        return null;
    }


}
