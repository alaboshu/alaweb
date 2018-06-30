package com.benmu.framework.adapter.router;

import android.app.Activity;
import android.util.Log;

import java.util.Stack;

/**
 * Created by Carry on 2017/8/21. activity stack tracker
 */

public class RouterTracker {
    private static Stack<ActivityStackFrame> mTotal = new Stack<>();
    private static String TAG = "RouterTracker";

    public static void push(Activity activity, String stackName) {
        if (mTotal.size() == 0) {
            ActivityStackFrame frame = new ActivityStackFrame();
            frame.setName(stackName);
            Stack<Activity> activities = new Stack<>();
            activities.push(activity);
            frame.setActivities(activities);
            mTotal.push(frame);
        } else {
            ActivityStackFrame frame = mTotal.peek();
            frame.getActivities().push(activity);
        }
    }


    public static void push(Activity activity) {
        push(activity, activity.getClass().getSimpleName());
    }


    /**
     * 此方法用于创建新的activity栈
     *
     * @param activity 新的activity
     */
    public static void newInstancePush(Activity activity, String stackName) {
        ActivityStackFrame newInstance = new ActivityStackFrame();
        newInstance.setName(stackName);
        Stack<Activity> activities = new Stack<>();
        activities.push(activity);
        newInstance.setActivities(activities);
        mTotal.push(newInstance);
    }

    /**
     * 移除最上方activity栈最上方activity
     *
     * @return 移除的activity
     */
    public static Activity popActivity() {
        if (mTotal.isEmpty()) return null;
        return pop(mTotal.peek());
    }

    /**
     * 移除最上方栈帧
     *
     * @return 移除的栈帧
     */

    public static ActivityStackFrame popStackFrame() {
        if (mTotal.isEmpty()) return null;
        return pop();
    }

    /**
     * 得到最上方activity
     */
    public static Activity peekActivity() {
        if (mTotal.isEmpty()) return null;
        ActivityStackFrame peek = mTotal.peek();
        if (null == peek.getActivities() || peek.getActivities().isEmpty()) return null;

        return peek.getActivities().peek();
    }


    /**
     * 得到最上方栈帧
     */
    public static ActivityStackFrame peekStackFrame() {
        if (mTotal.isEmpty()) return null;
        return mTotal.peek();
    }

    /**
     * 移除某个activity
     */
    public static void removeActivity(Activity activity) {
        ActivityStackFrame findFrame = null;
        outer:
        for (ActivityStackFrame frame : mTotal) {
            Stack<Activity> activities = frame.getActivities();
            for (Activity item : activities) {
                if (item == activity) {
                    findFrame = frame;
                    notifyActivityRemove(activity,true);
                    break outer;
                }
            }
        }
        if (findFrame != null) {
            removeActivitySinglely(activity, findFrame);
        }
    }
    /**
     * 生命周期自变化导致移除某个activity
     */
    public static void autoRemoveActivity(Activity activity) {
        ActivityStackFrame findFrame = null;
        outer:
        for (ActivityStackFrame frame : mTotal) {
            Stack<Activity> activities = frame.getActivities();
            for (Activity item : activities) {
                if (item == activity) {
                    findFrame = frame;
                    notifyActivityRemove(activity,false);
                    break outer;
                }
            }
        }
        if (findFrame != null) {
            removeActivitySinglely(activity, findFrame);
        }
    }
    /**
     * 根据名字移除栈帧
     */

    public static void removeStackFrame(String name) {
        ActivityStackFrame findFrame = null;
        for (ActivityStackFrame frame : mTotal) {
            if (frame.getName().equals(name)) {
                findFrame = frame;
                break;
            }
        }
        if (findFrame != null) {
            removeFrameEntirely(findFrame);
        }
    }

    /**
     * 根据activity移除栈帧
     */
    public static void removeStackFrame(Activity activity) {
        ActivityStackFrame findFrame = null;
        outer:
        for (ActivityStackFrame frame : mTotal) {
            Stack<Activity> activities = frame.getActivities();
            for (Activity item : activities) {
                if (item == activity) {
                    findFrame = frame;
                    break outer;
                }
            }
        }
        if (findFrame != null) {
            removeFrameEntirely(findFrame);
        }
    }

    /**
     * 移除activity直到
     *
     * @param surplus 剩余activity的数量
     */
    public static void clearActivitySurplus(int surplus) {
        int length = length();
        while (!mTotal.isEmpty()) {
            ActivityStackFrame frame = mTotal.peek();
            Stack<Activity> activities = frame.getActivities();
            while (!activities.isEmpty()) {
                if (length == surplus) {
                    return;
                }
                pop(frame);
                length--;
            }
        }
    }

    /**
     * 得到activity数量
     */
    public static int length() {
        int length = 0;
        for (ActivityStackFrame frame : mTotal) {
            for (Activity item : frame.getActivities()) {
                length++;
            }
        }
        return length;
    }


    /**
     * pop最上方activity 并通知activity销毁
     */
    private static Activity pop(ActivityStackFrame frame) {
        Stack<Activity> activities = frame.getActivities();
        if (null == activities || activities.isEmpty()) return null;
        Activity activity = activities.pop();
        notifyActivityRemove(activity,true);
        if (activities.isEmpty()) {
            //当前栈帧中activity全部弹出，弹出当前栈帧
            if (mTotal.size() > 1) {
                mTotal.pop();
            }
        }
        return activity;
    }

    /**
     * pop最上方栈帧 并通知栈帧所有activity销毁
     */

    private static ActivityStackFrame pop() {
        ActivityStackFrame frame = mTotal.pop();
        removeFrameEntirely(frame);
        return frame;
    }

    /**
     * 移除某个activity
     */
    private static void removeActivitySinglely(Activity act, ActivityStackFrame frame) {
        Stack<Activity> activities = frame.getActivities();
        activities.remove(act);
        if (activities.isEmpty()) {
            //当前栈帧中activity全部弹出，弹出当前栈帧
            mTotal.remove(frame);
        }
    }


    private static void removeFrameEntirely(ActivityStackFrame frame) {
        Stack<Activity> activities = frame.activities;
        for (Activity activity : activities) {
            notifyActivityRemove(activity,true);
        }
        activities.clear();
        mTotal.remove(frame);
    }


    private static void notifyActivityRemove(Activity act,boolean force) {
        if (act instanceof RouterTrackerListener) {
            RouterTrackerListener routerTrackerListener = (RouterTrackerListener) act;
            routerTrackerListener.onDetach(act,force);
        } else {
            Log.e(TAG, act.getClass().getName() + "is unTrack");
        }
    }


    private static class ActivityStackFrame {
        private Stack<Activity> activities;
        private String name;

        public ActivityStackFrame(Stack<Activity> activities, String name) {
            this.activities = activities;
            this.name = name;
        }

        ActivityStackFrame() {
        }

        Stack<Activity> getActivities() {
            return activities;
        }

        void setActivities(Stack<Activity> activities) {
            this.activities = activities;
        }

        int getLength() {
            return activities.size();
        }


        String getName() {
            return name;
        }

        void setName(String name) {
            this.name = name;
        }
    }

    public interface RouterTrackerListener {
        void onAttach(Activity activity);

        void onAttach(Activity activity, String activityName);

        void onDetach(Activity activity,boolean force);

        void onDetach(Activity activity, String activityName);
    }
}
