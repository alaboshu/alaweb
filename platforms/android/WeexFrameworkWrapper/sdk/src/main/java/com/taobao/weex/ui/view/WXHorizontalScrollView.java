/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.ui.view;

import android.content.Context;
import android.graphics.Rect;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.HorizontalScrollView;

import com.taobao.weex.common.Constants;
import com.taobao.weex.common.WXThread;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class WXHorizontalScrollView extends HorizontalScrollView implements IWXScroller,
        WXGestureObservable {

    private WXGesture wxGesture;
    private ScrollViewListener mScrollViewListener;
    private List<ScrollViewListener> mScrollViewListeners;
    private boolean scrollable = true;
    private boolean mPageEnable = false;
    private int mCurrentPage = 0;
    private int mPageWidth;
    private static final int NEXT = 100;
    private static final int PRE = 101;
    private static final int STAY = 102;
    private static final int THRESHOLD_VELOCITY = 1;
    private int mChildCount;
    private boolean mLock = false;
    private long mDownTimeStamp;

    @Override
    public boolean postDelayed(Runnable action, long delayMillis) {
        return super.postDelayed(WXThread.secure(action), delayMillis);
    }

    public WXHorizontalScrollView(Context context) {
        super(context);
        init();
    }

    private void init() {
        setWillNotDraw(false);
        setOverScrollMode(View.OVER_SCROLL_NEVER);
    }

    public WXHorizontalScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();

    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);

        if (mScrollViewListener != null) {
            mScrollViewListener.onScrollChanged(this, l, t, oldl, oldt);
        }
        if (mScrollViewListeners != null) {
            for (ScrollViewListener listener : mScrollViewListeners) {
                listener.onScrollChanged(this, l, t, oldl, oldt);
            }
        }
    }

    public void setScrollViewListener(ScrollViewListener scrollViewListener) {
        this.mScrollViewListener = scrollViewListener;
    }

    @Override
    public void destroy() {

    }

    public void addScrollViewListener(ScrollViewListener scrollViewListener) {
        if (mScrollViewListeners == null) {
            mScrollViewListeners = new ArrayList<>();
        }
        if (!mScrollViewListeners.contains(scrollViewListener)) {
            mScrollViewListeners.add(scrollViewListener);
        }
    }

    public void removeScrollViewListener(ScrollViewListener scrollViewListener) {
        mScrollViewListeners.remove(scrollViewListener);
    }

    @Override
    public void registerGestureListener(WXGesture wxGesture) {
        this.wxGesture = wxGesture;
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        if (!scrollable) {
            return true; // when scrollable is set to false, then eat the touch event
        }

        if (mPageEnable) {
            handlePageEnable(ev);
        }
        boolean result = mPageEnable;
        if (!mPageEnable) {
            result = super.onTouchEvent(ev);
        }

        if (wxGesture != null) {
            result |= wxGesture.onTouch(this, ev);
        }
        return result;
    }


    public interface ScrollViewListener {

        void onScrollChanged(WXHorizontalScrollView scrollView, int x, int y, int oldx, int oldy);
    }

    public boolean isScrollable() {
        return scrollable;
    }

    public void setScrollable(boolean scrollable) {
        this.scrollable = scrollable;
    }

    public Rect getContentFrame() {
        return new Rect(0, 0, computeHorizontalScrollRange(), computeVerticalScrollRange());
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        onReceiveChild();
    }

    private void onReceiveChild() {
        if (getChildCount() > 0) {
            View firstChild = getChildAt(0);
            if (firstChild != null) {
                int childCount = ((ViewGroup) firstChild).getChildCount();
                if (childCount > 0) {
                    final View child = ((ViewGroup) firstChild).getChildAt(0);
                    ((ViewGroup) firstChild).getChildAt(0).getViewTreeObserver()
                            .addOnGlobalLayoutListener(new ViewTreeObserver
                                    .OnGlobalLayoutListener() {


                                @Override
                                public void onGlobalLayout() {
                                    mPageWidth = child.getWidth();
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                                        child.getViewTreeObserver().removeOnGlobalLayoutListener
                                                (this);
                                    } else {
                                        child.getViewTreeObserver().removeGlobalOnLayoutListener
                                                (this);
                                    }
                                }
                            });
                }
                mChildCount = childCount;
            }
        }
    }

    public void setPageEnable(boolean enable) {
        this.mPageEnable = enable;
    }

    public boolean getPageEnable() {
        return mPageEnable;
    }

    public void setCurrentPage(int page) {
        this.mCurrentPage = page;
    }

    private int mDownX;
    private int mLastMoveX;

    private void handlePageEnable(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                break;
            case MotionEvent.ACTION_MOVE:
                mockDownEvent(ev);
                if (mLastMoveX == 0) {
                    mLastMoveX = mDownX;
                }
                int moveX = (int) ev.getX();
                scrollBy(mLastMoveX - moveX, 0);
                mLastMoveX = moveX;
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                boolean isFiling = false;
                mLastMoveX = 0;
                long upTimeStamp = new Date().getTime();
                float v = Math.abs(ev.getX() - mDownX) / (upTimeStamp - mDownTimeStamp);
                if (v > THRESHOLD_VELOCITY) {
                    isFiling = true;
                }
                if (Math.abs(ev.getX() - mDownX) > mPageWidth / 2 || isFiling) {
                    if (ev.getX() > mDownX) {
                        move(PRE);
                    } else {
                        move(NEXT);
                    }
                } else {
                    move(STAY);
                }
                mLock = false;
                break;
        }
    }

    private void mockDownEvent(MotionEvent ev) {
        if (!mLock) {
            mDownX = (int) ev.getX();
            mDownTimeStamp = new Date().getTime();
            mLock = true;
        }


    }

    private void move(int action) {
        if (NEXT == action) {
            if (mCurrentPage < mChildCount - 1) {
                mCurrentPage++;
            }
        } else if (PRE == action) {
            if (mCurrentPage > 0) {
                mCurrentPage--;
            }
        }
        post(new Runnable() {
            @Override
            public void run() {
                smoothScrollTo(mCurrentPage * mPageWidth, 0);
            }
        });

    }


}
