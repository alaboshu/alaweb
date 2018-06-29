package com.benmu.framework.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.TextView;

import com.benmu.framework.R;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.constant.WXConstant;
import com.benmu.framework.debug.ws.DebuggerWebSocket;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.dispatcher.DispatchEventManager;
import com.benmu.framework.model.JsVersionInfoBean;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.SharePreferenceUtil;

/**
 * Created by Carry on 2017/8/25.
 */

public class DebugActivity extends AbstractWeexActivity {
    private TextView tv_appversion;
    private TextView tv_jsverision;
    private CheckBox cb_inter, cb_hotrefresh;
    private DebuggerWebSocket debugSocket;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debug);
        initView();
    }

    private void initView() {
        tv_appversion = (TextView) findViewById(R.id.tv_appversion);
        tv_jsverision = (TextView) findViewById(R.id.tv_jsverision);
        cb_inter = (CheckBox) findViewById(R.id.cb_inter);
        cb_hotrefresh = (CheckBox) findViewById(R.id.cb_hotrefresh);

        tv_appversion.setText(BaseCommonUtil.getVersionName(this));
        String activeState = SharePreferenceUtil.getInterceptorActive(this);
        if (Constant.INTERCEPTOR_ACTIVE.equals(activeState)) {
            ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
            String jsVersion = parseManager.parseObject(SharePreferenceUtil.getVersion
                    (this), JsVersionInfoBean.class).getJsVersion();
            tv_jsverision.setText(jsVersion);

        }

        cb_hotrefresh.setEnabled(!Constant.INTERCEPTOR_ACTIVE.equals(activeState));
        cb_inter.setChecked(Constant.INTERCEPTOR_ACTIVE.equals(activeState));
        cb_inter.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                SharePreferenceUtil.setInterceptorActive(mAct, isChecked ? Constant
                        .INTERCEPTOR_ACTIVE : Constant.INTERCEPTOR_DEACTIVE);
                ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(new
                        Intent
                        (WXConstant.ACTION_INTERCEPTOR_SWTICH));
                if (isChecked) {
                    cb_hotrefresh.setEnabled(false);
                    cb_hotrefresh.setChecked(false);
                } else {
                    cb_hotrefresh.setEnabled(true);
                }

            }
        });


        cb_hotrefresh.setChecked(SharePreferenceUtil.getHotRefreshSwitch(this));
        cb_hotrefresh.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                Log.e("DebugActivity", "onCheckedChanged -> " + isChecked);
                SharePreferenceUtil.setHotRefreshSwitch(mAct, isChecked);
                ManagerFactory.getManagerService(DispatchEventManager.class).getBus().post(new
                        Intent
                        (WXConstant.ACTION_INTERCEPTOR_SWTICH));
            }
        });

    }


    public void refresh() {

    }

}
