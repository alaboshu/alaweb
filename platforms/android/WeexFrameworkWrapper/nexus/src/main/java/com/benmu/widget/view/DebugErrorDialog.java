package com.benmu.widget.view;

import android.app.Dialog;
import android.content.Context;
import android.text.TextUtils;
import android.text.method.ScrollingMovementMethod;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.benmu.R;

/**
 * Created by liuyuanxiao on 17/12/26.
 */

public class DebugErrorDialog {
    TextView messageTv;
    Dialog debugErrorDialog;

    public Dialog createErrorDialog(Context context) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View v = inflater.inflate(R.layout.dialog_debug_error_layout, null);// 得到加载view
        messageTv = (TextView) v.findViewById(R.id.tvMsg);
        messageTv.setMovementMethod(ScrollingMovementMethod.getInstance());
        debugErrorDialog = new Dialog(context, R.style.MyDialogStyle);// 创建自定义样式dialog
        debugErrorDialog.setCancelable(true); // 是否可以按“返回键”消失
        debugErrorDialog.setCanceledOnTouchOutside(false); // 点击加载框以外的区域
        debugErrorDialog.setContentView(v, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));// 设置布局
        /**
         *将显示Dialog的方法封装在这里面
         */
        Window window = debugErrorDialog.getWindow();
        WindowManager.LayoutParams lp = window.getAttributes();
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        window.setGravity(Gravity.CENTER);
        window.setAttributes(lp);
        window.setWindowAnimations(R.style.PopWindowAnimStyle);

        return debugErrorDialog;
    }

    public void setTextMsg(String msg) {
        String cMsg = messageTv.getText().toString();
        if (!TextUtils.isEmpty(cMsg)) {
            cMsg += "\n";
        }
        messageTv.setText(cMsg + msg);

    }

    public void show() {
        if (debugErrorDialog.isShowing()) return;
        ;
        debugErrorDialog.show();
    }

    public void dismiss() {
        if (debugErrorDialog.isShowing()) {
            debugErrorDialog.dismiss();
        }
    }
}
