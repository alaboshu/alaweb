package com.benmu.widget.view;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.TextView;

import com.benmu.R;


/**
 * Created by Carry on 17/2/8.
 */

public class BMLoding extends Dialog {

    boolean isCenter = false;
    boolean canWatchOutsideTouch = true;
    boolean dimBehindEnabled = false;
    private TextView tv_message;

    /**
     * 设置dialog是否可以响应下面activity的事件
     *
     * @method: setWatchOutsideTouch
     * @description: TODO
     * @author: DongFuhai
     * @return: void
     * @date: 2013-9-18 下午3:46:09
     */
    public BMLoding setWatchOutsideTouch(boolean canWatchOutsideTouch) {
        this.canWatchOutsideTouch = canWatchOutsideTouch;
        return this;
    }

    /**
     * 设置dialog背景是不是变灰。默认是不变灰的
     *
     * @method: setDimBehindEnabled
     * @description: TODO
     * @author: DongFuhai
     * @return: void
     * @date: 2013-9-18 下午4:09:11
     */
    public BMLoding setDimBehindEnabled(boolean dimBehindEnabled) {
        this.dimBehindEnabled = dimBehindEnabled;
        return this;
    }

    public BMLoding setCentered(boolean isCenter) {
        this.isCenter = isCenter;
        return this;
    }

    public BMLoding(Context context) {
        super(context, R.style.AnimDialogLoading);
    }

    private BMLoding(Context context, boolean cancelable,
                     OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    public BMLoding(Context context, int theme) {
        super(context, R.style.AnimDialogLoading);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (canWatchOutsideTouch) {
            getWindow().setFlags(
                    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL);
            getWindow().setFlags(
                    WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH,
                    WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH);
        }

        setContentView(R.layout.layout_animloading);
        tv_message = (TextView) findViewById(R.id.tv_message);
        setCanceledOnTouchOutside(false);
    }

    @Override
    public void dismiss() {
        super.dismiss();
    }

//    @Override
//    public void show() {
//        initXY();
//        try {
//            super.show();
//        } catch (Exception ex) {
//        }
//    }

    private void initXY() {
        // 100 - (getWindow().getWindowManager().getDefaultDisplay().getHeight()
        // / 2)
        // Log.i("tag",
        // "height==>"+getWindow().getWindowManager().getDefaultDisplay().getHeight());
        // LayoutParams params = new LayoutParams();
        // if (dimBehindEnabled) {
        // params.flags = LayoutParams.FLAG_DIM_BEHIND;
        // params.dimAmount = 0.5f;
        // } // 默认全部透明
        // if(!isCenter)
        // params.y = -200;
        // getWindow().setAttributes(params);
    }

    public void setMessage(String message) {
        if (this.tv_message != null) {
            tv_message.setText(message);
        }
    }

}



