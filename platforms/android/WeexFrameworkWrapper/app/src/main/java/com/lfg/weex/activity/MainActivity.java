package com.lfg.weex.activity;

import android.Manifest;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;

import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.PermissionManager;
import com.lfg.weex.R;


public class MainActivity extends AbstractWeexActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        renderPage();
        Log.d("lfg..", getResources().getString(R.string.download_failed));
        PermissionManager permissionManager = ManagerFactory.getManagerService(PermissionManager.class);
        if (!permissionManager.hasPermissions(this, Manifest.permission.RECEIVE_SMS)) {
            permissionManager.requestPermissions(this, Manifest.permission.RECEIVE_SMS, null);
        }
        if (!permissionManager.hasPermissions(this, Manifest.permission.READ_SMS)) {
            permissionManager.requestPermissions(this, Manifest.permission.READ_SMS, null);
        }
    }

    private void initView() {
        mContainer = (ViewGroup) findViewById(R.id.layout_container);
    }
}
