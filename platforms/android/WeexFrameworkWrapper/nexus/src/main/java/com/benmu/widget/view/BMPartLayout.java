package com.benmu.widget.view;

import android.content.Context;
import android.util.AttributeSet;
import android.view.Display;
import android.view.WindowManager;
import android.widget.RelativeLayout;

/**
 * Created by Carry on 2017/6/30.
 */

public class BMPartLayout extends RelativeLayout {
    private int mPart;
    private Context mContext;
    private int mSrceenWidth;
    private int mRealWidhth;

    public BMPartLayout(Context context) {
        super(context);
        init(context);
    }

    public BMPartLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public BMPartLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context) {
        this.mContext = context;
        WindowManager manager = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
        Display display = manager.getDefaultDisplay();
        mSrceenWidth = display.getWidth();
    }

    public void setPart(int part) {
        this.mPart = part;
    }


    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        if (mPart == 0) {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        } else {
            mRealWidhth = mSrceenWidth / mPart;
            super.onMeasure(MeasureSpec.makeMeasureSpec(mRealWidhth, MeasureSpec.EXACTLY),
                    heightMeasureSpec);
        }
//        if (!mFlag) {
//            mRealWidth = mWidth / 6;
//        } else if (mFlag && mPart != 0) {
//            mRealWidth = (int) ((mWidth - MMUtil.getPXbyDP(mContext, 40)) / mPart);
//        }
//        int fixedWidth = MeasureSpec.makeMeasureSpec(mRealWidth, MeasureSpec.EXACTLY);
//        super.onMeasure(fixedWidth, heightMeasureSpec);
    }

    public int getRealWidth() {
        return mRealWidhth;
    }


}
