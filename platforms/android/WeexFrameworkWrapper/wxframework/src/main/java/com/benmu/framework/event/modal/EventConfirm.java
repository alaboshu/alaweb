package com.benmu.framework.event.modal;

import android.content.Context;
import android.content.DialogInterface;

import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.model.ModalBean;
import com.benmu.widget.view.BMAlert;
import com.taobao.weex.bridge.JSCallback;

/**
 * Created by Carry on 2017/8/23.
 */

public class EventConfirm {

    public void confirm(String options, final JSCallback cancel, final JSCallback ok, Context context) {
        ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
        ModalBean bean = parseManager.parseObject(options, ModalBean.class);
        ModalManager.BmAlert.showAlert(context, bean.getTitle(), bean
                .getMessage(), bean.getOkTitle(), new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if (ok != null) {
                    String value = ((BMAlert)dialog).getInputValue();
                    ok.invoke(value);
                }
            }
        }, bean.getCancelTitle(), new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if (cancel != null) {
                    cancel.invoke(null);
                }
            }
        }, bean.getTitleAlign(), bean.getMessageAlign(), bean.isPrompt(), bean.getPromptType(), bean.getPromptPlaceholder());
    }
}
