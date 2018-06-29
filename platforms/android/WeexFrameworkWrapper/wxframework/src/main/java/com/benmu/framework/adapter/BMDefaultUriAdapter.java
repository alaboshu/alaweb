package com.benmu.framework.adapter;

import android.net.Uri;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.adapter.URIAdapter;

import java.util.List;

/**
 * Created by liuyuanxiao on 18/1/11.
 */

public class BMDefaultUriAdapter implements URIAdapter {
    @NonNull
    @Override
    public Uri rewrite(WXSDKInstance instance, String type, Uri uri) {
        if (TextUtils.isEmpty(instance.getBundleUrl())) {
            return uri;
        }

        Uri base = Uri.parse(instance.getBundleUrl());
        Uri.Builder resultBuilder = uri.buildUpon();

        if (uri.isRelative() && !type.equals(URIAdapter.IMAGE)) {
            //When uri is empty, means use the base url instead. Web broswer behave this way.
            if (uri.getEncodedPath().length() == 0) {
                return base;
            } else {
                resultBuilder = buildRelativeURI(resultBuilder, base, uri, type);
                return resultBuilder.build();
            }
        }
        return uri;
    }

    private Uri.Builder buildRelativeURI(Uri.Builder resultBuilder, Uri base, Uri uri, String type) {
        if (uri.getAuthority() != null) {
            return resultBuilder.scheme(base.getScheme());
        } else {
            resultBuilder
                    .encodedAuthority(base.getEncodedAuthority())
                    .scheme(base.getScheme())
                    .path(null);

            if (uri.getPath().startsWith("/")) {
                //relative to root
                resultBuilder.appendEncodedPath(uri.getEncodedPath().substring(1));
            } else {
                List<String> segments = base.getPathSegments();
                //ignore last segment if not end with /
                int ignoreLast = 1;
                if (base.getPath().endsWith("/")) {
                    ignoreLast = 0;
                }
                for (int i = 0, len = segments.size() - ignoreLast; i < len; i++) {
                    resultBuilder.appendEncodedPath(segments.get(i));
                }
                resultBuilder.appendEncodedPath(uri.getEncodedPath());
            }
            return resultBuilder;
        }
    }
}