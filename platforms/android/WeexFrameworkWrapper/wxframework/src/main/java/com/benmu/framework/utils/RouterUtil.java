package com.benmu.framework.utils;

import android.app.Activity;
import android.util.Log;

import java.util.Stack;

/**
 * Created by Carry on 17/1/11.
 */

public class RouterUtil {
    private static Stack<Activity> mStack = new Stack<>();
    private static Stack<Activity> mPresents = new Stack<>();

    public static void init() {
        if (mStack == null) {
            mStack = new Stack<>();
        }
        if (mPresents == null) {
            mPresents = new Stack<>();
        }
    }

    public static void push(Activity activity) {
        if (mStack != null) {
            mStack.push(activity);
        }
    }


    /**
     * 弹出最上层
     */
    public static Activity peek() {
        Activity activity = null;
        if (mStack != null && mStack.size() > 0) {
            activity = mStack.peek();
        }
        return activity;
    }

    /**
     * 移除最上层
     */
    public static Activity pop() {
        Activity activity = null;
        if (mStack != null && mStack.size() > 0) {
            activity = mStack.pop();
        }
        return activity;
    }

    public static void remove(Activity activity) {
        if (mStack != null && activity != null) {
            mStack.remove(activity);
        }
    }

    public static void clearTillBottom() {
        if (mStack != null) {
            Activity activity = mStack.firstElement();
            Log.e("stack", "stack" + activity.getClass().getName());
            mStack.clear();
            mStack.push(activity);
        }
    }

    public static int getStackLength() {
        if (mStack != null) {
            return mStack.size();
        }
        return 0;
    }

    /**
     * 添加prensent页面到栈中
     */
    public static void pushPresent(Activity activity) {
        if (mPresents != null) {
            mPresents.push(activity);
        }
    }

    public static void removePresent(Activity activity) {
        if (mPresents != null && activity != null) {
            mPresents.remove(activity);
        }
    }

    /**
     * 清空present栈
     */
    public static void clearPresent() {
        if (mPresents != null) {
            for (Activity activity : mPresents) {
                mStack.remove(activity);
            }
            mPresents.clear();
        }
    }

    /**
     * 得到present栈
     *
     * @return 栈
     */
    public static Stack<Activity> getPresent() {
        if (mPresents != null) {
            return mPresents;
        }
        return new Stack<>();
    }

    public static Stack<Activity> getCurrentStack() {
        if (mStack != null) {
            return mStack;
        }
        return new Stack<>();
    }
}
