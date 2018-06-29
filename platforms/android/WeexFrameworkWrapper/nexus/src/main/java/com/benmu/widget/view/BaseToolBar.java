package com.benmu.widget.view;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.benmu.R;
import com.benmu.widget.utils.BaseCommonUtil;
import com.benmu.widget.utils.ColorUtils;


/**
 * Created by Carry on 17/2/23. 自定义toolbar
 */


public class BaseToolBar extends LinearLayout {
    private View mChildView;
    public ImageView mLeftIcon;
    public TextView mTitle;
    private TextView mRightText;
    public ImageView mRightIcon;
    private LinearLayout mContainer;
    private OnTitleClick mOnTitleClick;
    private OnLeftIconClick mOnLeftListenner;
    private OnRightIconClick mOnRightListenner;
    private OnWebViewClosed mOnWebViewClosedListenner;
    public TextView mWebViewClosed;
    public Context mContext;
    private ViewGroup mRightViewGroper;

    public BaseToolBar(Context context) {
        this(context, null, 0);
    }

    public BaseToolBar(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public BaseToolBar(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.mContext = context;
        initView();
        initListenner();
    }

    /**
     * set nav test color
     */
    public void setNavigationItemColor(String color, View view) {
        if (view == null || TextUtils.isEmpty(color)) return;
        if (view instanceof ViewGroup) {
            ViewGroup viewGroup = (ViewGroup) view;
            int childCount = viewGroup.getChildCount();
            for (int i = 0; i < childCount; i++) {
                View childView = viewGroup.getChildAt(i);
                if (childView instanceof ViewGroup) {
                    setNavigationItemColor(color, childView);
                } else if (childView instanceof TextView) {
                    ((TextView) childView).setTextColor(ColorUtils.getColor(color));
                }else if(childView instanceof ImageView){
                    ImageView imageItem=(ImageView)childView;
                    Drawable drawable = imageItem.getDrawable();
                    if(drawable instanceof BitmapDrawable){
                        BitmapDrawable drawable1 = (BitmapDrawable) drawable;
                        Bitmap bitmap = drawable1.getBitmap();
                        Bitmap bitmap1 = BaseCommonUtil.tintBitmap(bitmap, ColorUtils.getColor
                                (color));
                        imageItem.setImageBitmap(bitmap1);
                    }
                }
            }
        }
    }

    private void initListenner() {
        if (mTitle != null) {
            mTitle.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mOnTitleClick != null) {
                        mOnTitleClick.onClick(v);
                    }
                }
            });
        }
        if (mLeftIcon != null) {
            mLeftIcon.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mOnLeftListenner != null) {
                        mOnLeftListenner.onClick(v);
                    }
                }
            });
        }

        if (mRightIcon != null) {
            mRightIcon.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mOnRightListenner != null) {
                        mOnRightListenner.onClick(v);
                    }
                }
            });
        }

        if (mRightText != null) {
            mRightText.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mOnRightListenner != null) {
                        mOnRightListenner.onClick(v);
                    }
                }
            });
        }

        if (mWebViewClosed != null) {
            mWebViewClosed.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (mOnWebViewClosedListenner != null) {
                        mOnWebViewClosedListenner.onClick(v);
                    }
                }
            });
        }
    }


    public void setBackground(int resId) {
        if (mContainer != null) {
            mContainer.setBackgroundResource(resId);
        }
    }

    public void setBackgroundColor(int color) {
        mContainer.setBackgroundColor(color);
    }

    public void setNavigationVisible(boolean b) {
        setVisibility(b ? VISIBLE : GONE);
    }

    public void setTitle(CharSequence title) {
        if (mTitle != null) {
            mTitle.setText(title);
        }
    }

    public void setLeftIconVisible(boolean b) {
        if (mLeftIcon != null) {
            mLeftIcon.setVisibility(b ? VISIBLE :
                    GONE);
        }
    }

    public TextView getLeftTextView() {
        mWebViewClosed.setVisibility(View.VISIBLE);
        return mWebViewClosed;
    }

    public ImageView getLeftIcon() {
        return mLeftIcon;
    }

    public TextView getRightText() {
        return mRightText;
    }

    public ImageView getRightIcon() {
        return mRightIcon;
    }

    public TextView getTitleTextView() {
        return mTitle;
    }

    public void setLeftTextColor(String color) {
        if (mWebViewClosed != null) {
            mWebViewClosed.setTextColor(ColorUtils.getColor(color));
        }
    }

    public void setLeftIcon(int resId) {
        if (mLeftIcon != null) {
            mLeftIcon.setImageResource(resId);
        }
    }


    public void setRightText(CharSequence title) {
        if (mRightText != null) {
            mRightText.setVisibility(View.VISIBLE);
            mRightText.setText(title);
        }
    }

    public void setRightTextColor(String color) {
        if (mRightText != null) {
            mRightText.setTextColor(ColorUtils.getColor(color));
        }
    }

    public void setRightIcon(int resId) {
        if (mRightIcon != null) {
            mRightIcon.setImageResource(resId);
        }
    }


    public void setRightIconVisible(boolean b) {
        if (mRightIcon != null) {
            mRightIcon.setVisibility(b ? VISIBLE :
                    GONE);
        }
    }

    public void setOnTitleListenner(OnTitleClick listenner) {
        this.mOnTitleClick = listenner;
    }

    public void setTitleColor(String color) {
        if (mTitle != null) {
            mTitle.setTextColor(ColorUtils.getColor(color));
        }
    }


    private void initView() {
        if (mChildView == null) {
            mChildView = View.inflate(getContext(), R.layout.layout_custom_toolbar, null);
        }
        LayoutParams params = new LayoutParams(ViewGroup.LayoutParams
                .MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        addView(mChildView, params);
        mContainer = (LinearLayout) mChildView.findViewById(R.id.toolbar_container);
        mLeftIcon = (ImageView) mChildView.findViewById(R.id.toolbar_left_icon);
        mTitle = (TextView) mChildView.findViewById(R.id.toolbar_title);
        mRightViewGroper = (ViewGroup) mChildView.findViewById(R.id.toolbar_right);
        mRightText = (TextView) mChildView.findViewById(R.id.toolbar_right_text);
        mRightIcon = (ImageView) mChildView.findViewById(R.id.toolbar_right_icon);
        mWebViewClosed = (TextView) mChildView.findViewById(R.id.action_bar_tvitem_webclose);
    }

    public void setOnWebViewClosedVisiblty(boolean visiblty) {
        mWebViewClosed.setVisibility(visiblty ? VISIBLE : GONE);
    }

    public interface OnLeftIconClick {
        void onClick(View v);
    }

    public interface OnRightIconClick {
        void onClick(View v);
    }

    public interface OnWebViewClosed {
        void onClick(View v);
    }

    public interface OnTitleClick {
        void onClick(View v);
    }

    public void setOnWebClosedListenner(OnWebViewClosed listenner) {
        this.mOnWebViewClosedListenner = listenner;
    }

    public void setOnLeftListenner(OnLeftIconClick listenner) {
        this.mOnLeftListenner = listenner;
    }

    public void setOnRightListenner(OnRightIconClick listenner) {
        this.mOnRightListenner = listenner;
    }


}
