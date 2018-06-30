package com.benmu.framework.manager.impl;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.provider.ContactsContract;
import android.text.TextUtils;

import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.Manager;

/**
 * Created by liuyuanxiao on 17/12/29.
 */

public class CommunicationManager extends Manager {

    public void sms(String recipients, String params, final Context context) {
        if (TextUtils.isEmpty(recipients)) return;
        Uri smsToUri = Uri.parse("smsto:" + recipients);

        Intent intent = new Intent(Intent.ACTION_SENDTO, smsToUri);

        intent.putExtra("sms_body", params);

        context.startActivity(intent);
    }

    public void contacts(final Context context) {
        if (context instanceof AbstractWeexActivity) {
            ((AbstractWeexActivity) context).startActivityForResult(new Intent(
                    Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI), Constant.REQUEST_CODE.REQUEST_CODE_CONTRACT);
        }
    }
}
