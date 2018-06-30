package com.benmu.widget.view;

import android.app.Activity;
import android.content.Context;
import android.graphics.PixelFormat;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.benmu.R;

import java.math.BigDecimal;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by Carry on 17/3/17.
 */

public class BMFloatingLayer {

    private static final String TAG = "FLOATINGLAYER";

    public  boolean ISSHOW = false;


    private WindowManager mWindowManager;
    private WindowManager.LayoutParams mLayoutParams;

    private Context mContext;

    private View mPopView;

    private AnimationTimerTask mAnimationTask;
    private Timer mAnimationTimer;
    private GetTokenRunnable mGetTokenRunnable;

    private FloatingLayerListener mListener;

    private Handler mHander = new Handler();

    private int mWidth;
    private int mHeight;
    private float mPrevX;
    private float mPrevY;
    private int mGetTokenPeriodTime = 500;
    private int mAnimatonPeriodTime = 16;
    private boolean isMove = false;
    private BigDecimal mStartClickTime;
    private float mDownX;
    private float mDownY;

    public BMFloatingLayer(Context context) {
        this.mContext = context;

        initView();
        initWindowManager();
        initLayoutParams();
        initDrag();
    }

    private void initView() {
        LayoutInflater layoutInflater = (LayoutInflater) mContext.getSystemService(Context
                .LAYOUT_INFLATER_SERVICE);
        mPopView = layoutInflater.inflate(R.layout.layout_floatlayer, null);
    }

    private void initWindowManager() {
        mWindowManager = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
    }

    private void initLayoutParams() {
        mWidth = mContext.getResources().getDisplayMetrics().widthPixels;
        mHeight = mContext.getResources().getDisplayMetrics().heightPixels;

        mLayoutParams = new WindowManager.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams
                .TYPE_APPLICATION_ATTACHED_DIALOG,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                        | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);
        mLayoutParams.gravity = Gravity.TOP | Gravity.LEFT;
        mLayoutParams.x = 0;
        mLayoutParams.y = mContext.getResources().getDisplayMetrics().heightPixels / 6 * 4;
    }

    private void initDrag() {
        mPopView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        mDownX = mPrevX = motionEvent.getRawX();
                        mDownY = mPrevY = motionEvent.getRawY();
                        mStartClickTime = BigDecimal.valueOf(System.currentTimeMillis());
                        break;
                    case MotionEvent.ACTION_MOVE:
                        float deltaX = motionEvent.getRawX() - mPrevX;
                        float deltaY = motionEvent.getRawY() - mPrevY;
                        mLayoutParams.x += deltaX;
                        mLayoutParams.y += deltaY;
                        mPrevX = motionEvent.getRawX();
                        mPrevY = motionEvent.getRawY();

                        if (mLayoutParams.x < 0) mLayoutParams.x = 0;
                        if (mLayoutParams.x > mWidth - mPopView.getWidth())
                            mLayoutParams.x = mWidth - mPopView.getWidth();
                        if (mLayoutParams.y < 0) mLayoutParams.y = 0;
                        if (mLayoutParams.y > mHeight - mPopView.getHeight() * 2)
                            mLayoutParams.y = mHeight - mPopView.getHeight() * 2;

                        try {
                            mWindowManager.updateViewLayout(mPopView, mLayoutParams);
                        } catch (Exception e) {
                            Log.d(TAG, e.toString());
                        }

                        if (deltaX > 10 | deltaY > 10) isMove = true;
                        break;
                    case MotionEvent.ACTION_CANCEL:
                    case MotionEvent.ACTION_UP:
                        isMove = false;
                        float upX = motionEvent.getRawX();
                        float upY = motionEvent.getRawY();
                        BigDecimal now = BigDecimal.valueOf(System.currentTimeMillis());
                        if (!isMove && (Math.abs(now.subtract(mStartClickTime).floatValue()) <
                                500) && (Math.abs(upX - mDownX) < 20 && Math.abs(upY - mDownY) < 20)) {
                            if (null != mListener) {
                                mListener.onClick();
                                return false;
                            }
                        }

                        mAnimationTimer = new Timer();
                        mAnimationTask = new AnimationTimerTask();
                        mAnimationTimer.schedule(mAnimationTask, 0, mAnimatonPeriodTime);

                        break;
                }

                return false;
            }
        });
    }

    public void show(Activity activity) {

        if (!ISSHOW) {
            mGetTokenRunnable = new GetTokenRunnable(activity);
            mHander.postDelayed(mGetTokenRunnable, 500);
        }
    }

    public void close() {
        try {
            if (ISSHOW) {
                mWindowManager.removeViewImmediate(mPopView);
                ISSHOW = false;
                if (null != mListener) {
                    mListener.onClose();
                }
            }
        } catch (Exception e) {
            Log.d(TAG, e.toString());
        }

    }

    public BMFloatingLayer setListener(FloatingLayerListener listener) {
        this.mListener = listener;
        return this;
    }

    public interface FloatingLayerListener {
        void onClick();

        void onShow();

        void onClose();
    }

    class AnimationTimerTask extends TimerTask {

        int mStepX;
        int mDestX;

        public AnimationTimerTask() {
            if (mLayoutParams.x > mWidth / 2) {
                mDestX = mWidth - mPopView.getWidth();
                mStepX = (mWidth - mLayoutParams.x) / 10;
            } else {
                mDestX = 0;
                mStepX = -((mLayoutParams.x) / 10);
            }

        }

        @Override
        public void run() {

            if (Math.abs(mDestX - mLayoutParams.x) <= Math.abs(mStepX)) {
                mLayoutParams.x = mDestX;
            } else {
                mLayoutParams.x += mStepX;
            }

            try {
                mHander.post(new Runnable() {
                    @Override
                    public void run() {
                        mWindowManager.updateViewLayout(mPopView, mLayoutParams);
                    }
                });
            } catch (Exception e) {
                Log.d(TAG, e.toString());
            }


            if (mLayoutParams.x == mDestX) {
                mAnimationTask.cancel();
                mAnimationTimer.cancel();
            }


        }
    }

    class GetTokenRunnable implements Runnable {

        int count = 0;
        private Activity mActivity;

        public GetTokenRunnable(Activity activity) {
            this.mActivity = activity;
        }

        @Override
        public void run() {

            if (null == mActivity)
                return;
            IBinder token = null;
            try {
                token = mActivity.getWindow().getDecorView().getWindowToken();
            } catch (Exception e) {
            }

            if (null != token) {

                try {
                    mLayoutParams.token = token;
                    mWindowManager.addView(mPopView,
                            mLayoutParams);
                    mActivity = null;
                    ISSHOW = true;
                    return;
                } catch (Exception e) {
                }
            }
            count++;
            mLayoutParams.token = null;
            if (count < 10 && null != mLayoutParams) {
                mHander.postDelayed(mGetTokenRunnable, 500);
            }

        }
    }
}
