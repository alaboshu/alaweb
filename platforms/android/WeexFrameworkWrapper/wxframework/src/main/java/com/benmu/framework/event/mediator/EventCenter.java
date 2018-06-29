package com.benmu.framework.event.mediator;

import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.squareup.otto.Subscribe;
import com.taobao.weex.bridge.JSCallback;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Carry on 2017/8/7. eventCenter between native and js
 */

public class EventCenter {
    private static EventCenter mInstance = new EventCenter();
    private Map<String, List<Event>> mEvents;
    private HashSet<String> mWxInstances;

    public static EventCenter getInstance() {
        return mInstance;
    }

    private EventCenter() {
    }

    public void init() {
        mEvents = new HashMap<String, List<Event>>();
        mWxInstances = new HashSet<>();
        ManagerFactory.getManagerService(DispatchEventManager.class).getBus().register(this);
    }

    @Subscribe
    public void on(Intent intent) {
        if (WXConstant.WXEventCenter.EVENT_JS_ON.equals(intent.getAction())) {
            Event event = (Event) intent.getSerializableExtra("data");
            List<Event> list = mEvents.get(event.getType());
            if (list == null) {
                list = new ArrayList<>();
            }
            list.add(event);
            mEvents.put(event.getType(), list);
            if (!TextUtils.isEmpty(event.getInstanceId())) {
                mWxInstances.add(event.getInstanceId());
            }

        }
    }

    @Subscribe
    public void emit(Intent intent) {
        if (WXConstant.WXEventCenter.EVENT_JS_EMIT.equals(intent.getAction())) {
            Log.e("emit", "==========");
            Emit emit = (Emit) intent.getSerializableExtra("data");
            List<Event> list = mEvents.get(emit.getType());
            if (list != null) {
                Iterator<Event> iterator = list.iterator();
                while (iterator.hasNext()) {
                    Event event = iterator.next();
                    if (event.getJsCallback() != null && mWxInstances.contains(event
                            .getInstanceId())) {
                        Log.e("test", "emit>>>>>>>" + emit.getParams());
                        event.getJsCallback().invokeAndKeepAlive(emit.getParams());
                        if (event.isOnce()) {
                            iterator.remove();
                        }
                    } else {
                        iterator.remove();
                    }

                }
            }
        }
    }

    @Subscribe
    public void off(Intent intent) {
        if (WXConstant.WXEventCenter.EVENT_JS_OFF.equals(intent.getAction())) {
            Off off = (Off) intent.getSerializableExtra("data");
            mEvents.remove(off.getType());
            if (off.getCallback() != null) {
                off.getCallback().invoke(null);
            }
        }
    }

    @Subscribe
    public void offall(Intent intent) {
        if (WXConstant.WXEventCenter.EVENT_JS_OFFALL.equals(intent.getAction())) {
            mEvents.clear();
        }
    }


    @Subscribe
    public void destoryInstance(Intent intent) {
        if (WXConstant.WXEventCenter.EVENT_INSTANCE_DESTORY.equals(intent.getAction())) {
            String destoryInstanceId = intent.getStringExtra("data");
            if (mWxInstances.contains(destoryInstanceId)) {
                mWxInstances.remove(destoryInstanceId);
            }
        }
    }

    public static class Event implements Serializable {
        private String instanceId;
        private boolean once;
        private JSCallback jsCallback;
        private String bundle_url;
        private String type;

        public Event(String instanceId, boolean once, JSCallback jsCallback, String bundle_url,
                     String type) {
            this.instanceId = instanceId;
            this.once = once;
            this.jsCallback = jsCallback;
            this.bundle_url = bundle_url;
            this.type = type;
        }

        public String getBundle_url() {
            return bundle_url;
        }

        public void setBundle_url(String bundle_url) {
            this.bundle_url = bundle_url;
        }

        public Event() {
        }

        public String getInstanceId() {
            return instanceId;
        }

        public void setInstanceId(String instanceId) {
            this.instanceId = instanceId;
        }

        public boolean isOnce() {
            return once;
        }

        public void setOnce(boolean once) {
            this.once = once;
        }

        public JSCallback getJsCallback() {
            return jsCallback;
        }

        public void setJsCallback(JSCallback jsCallback) {
            this.jsCallback = jsCallback;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }


    public static class Emit implements Serializable {
        private String type;
        private Object params;

        public Emit(String type, Object params) {
            this.type = type;
            this.params = params;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Object getParams() {
            return params;
        }

        public void setParams(Object params) {
            this.params = params;
        }
    }

    public static class Off implements Serializable {
        private String type;
        private JSCallback callback;

        public Off(String type, JSCallback callback) {
            this.type = type;
            this.callback = callback;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public JSCallback getCallback() {
            return callback;
        }

        public void setCallback(JSCallback callback) {
            this.callback = callback;
        }
    }
}
