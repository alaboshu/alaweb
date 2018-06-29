package com.benmu.framework.manager.impl;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;

import com.benmu.framework.manager.Manager;
import com.benmu.framework.model.UniversalResultModule;
import com.taobao.weex.bridge.JSCallback;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Carry on 2017/8/21.
 */

public class PermissionManager extends Manager{
    public static final int RUNTIME_PERMISSION = 23;
    private PermissionListener mListenner;

    public interface PermissionListener {

        void onPermissionsGranted(List<String> perms);

        void onPermissionsDenied(List<String> perms);

        void onPermissionRequestRejected();

    }

    public boolean hasPermissions(Context context, String... perms) {
        for (String perm : perms) {
            boolean hasPerm = (ContextCompat.checkSelfPermission(context, perm) == PackageManager
                    .PERMISSION_GRANTED);
            if (!hasPerm) {
                return false;
            }
        }

        return true;
    }
    public void requestPermissions(Object object, PermissionListener listener,
                                   final String... perms) {
        this.mListenner = listener;
        executePermissionsRequest(object, perms, RUNTIME_PERMISSION);
    }
    public void requestPermissions(Object object, final String perms, final JSCallback callback) {
        requestPermissions(object, new PermissionListener() {
            @Override
            public void onPermissionsGranted(List<String> perms) {
                if (callback != null) {
                    callback.invoke(new UniversalResultModule("", 19, null));
                }
            }

            @Override
            public void onPermissionsDenied(List<String> perms) {
                if (callback != null) {
                    callback.invoke(new UniversalResultModule("noPermission", 119, null));
                }
            }

            @Override
            public void onPermissionRequestRejected() {

            }
        }, perms);
    }

    public void onRequestPermissionsResult(Object object, int
            requestCode, String[] permissions,
                                           int[] grantResults) {

        if (requestCode == RUNTIME_PERMISSION) {
            checkCallingObjectSuitability(object);

            // Make a collection of granted and denied permissions from the request.
            ArrayList<String> granted = new ArrayList<>();
            ArrayList<String> denied = new ArrayList<>();
            for (int i = 0; i < permissions.length; i++) {
                String perm = permissions[i];
                if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                    granted.add(perm);
                } else {
                    denied.add(perm);
                }
            }

            if (mListenner == null) return;

            // Report granted permissions, if any.
            if (!granted.isEmpty()) {
                // Notify callbacks
                mListenner.onPermissionsGranted(granted);
            }

            // Report denied permissions, if any.
            if (!denied.isEmpty()) {
                mListenner.onPermissionsDenied(denied);
            }
        }
    }

    private boolean shouldShowRequestPermissionRationale(Object object, String perm) {
        if (object instanceof Activity) {
            return ActivityCompat.shouldShowRequestPermissionRationale((Activity) object, perm);
        } else if (object instanceof Fragment) {
            return ((Fragment) object).shouldShowRequestPermissionRationale(perm);
        } else {
            return false;
        }
    }

    private void executePermissionsRequest(Object object, String[] perms, int requestCode) {
        checkCallingObjectSuitability(object);

        if (object instanceof Activity) {
            ActivityCompat.requestPermissions((Activity) object, perms, requestCode);
        } else if (object instanceof Fragment) {
            ((Fragment) object).requestPermissions(perms, requestCode);
        }
    }

    private Activity getActivity(Object object) {
        if (object instanceof Activity) {
            return ((Activity) object);
        } else if (object instanceof Fragment) {
            return ((Fragment) object).getActivity();
        } else {
            return null;
        }
    }

    private void checkCallingObjectSuitability(Object object) {
        // Make sure Object is an Activity or Fragment
        if (!((object instanceof Fragment) || (object instanceof Activity))) {
            throw new IllegalArgumentException("Caller must be an Activity or a Fragment.");
        }
    }
}
