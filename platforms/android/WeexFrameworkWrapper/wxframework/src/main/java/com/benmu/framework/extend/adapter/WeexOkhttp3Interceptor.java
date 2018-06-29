package com.benmu.framework.extend.adapter;/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
*/


import android.support.annotation.Nullable;

import com.taobao.weex.devtools.inspector.network.DefaultResponseHandler;
import com.taobao.weex.devtools.inspector.network.NetworkEventReporter;
import com.taobao.weex.devtools.inspector.network.NetworkEventReporterManager;
import com.taobao.weex.devtools.inspector.network.RequestBodyHelper;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.atomic.AtomicInteger;

import okhttp3.Connection;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okio.BufferedSink;
import okio.BufferedSource;
import okio.Okio;

/**
 * Provides easy integration with <a href="http://square.github.io/okhttp/">OkHttp</a> 3.x by way of
 * the new <a href="https://github.com/square/okhttp/wiki/Interceptors">Interceptor</a> system. To
 * use:
 * <pre>
 *   OkHttpClient client = new OkHttpClient.Builder()
 *       .addNetworkInterceptor(new WeexOkhttp3Interceptor())
 *       .build();
 * </pre>
 */
public class WeexOkhttp3Interceptor implements Interceptor {
    private NetworkEventReporter mEventReporter;

    private final AtomicInteger mNextRequestId = new AtomicInteger(0);

    public WeexOkhttp3Interceptor() {
        mEventReporter = NetworkEventReporterManager.get();
        if (mEventReporter == null) {
            mEventReporter = NetworkEventReporterManager.newEmptyReporter();
        }
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        String requestId = String.valueOf(mNextRequestId.getAndIncrement());

        Request request = chain.request();
        mEventReporter = NetworkEventReporterManager.get();
        RequestBodyHelper requestBodyHelper = null;
        if (mEventReporter != null) {
            requestBodyHelper = new RequestBodyHelper(mEventReporter, requestId);
            OkHttpInspectorRequest inspectorRequest =
                    new OkHttpInspectorRequest(requestId, request, requestBodyHelper);
            mEventReporter.requestWillBeSent(inspectorRequest);
        }

        Response response;
        try {
            response = chain.proceed(request);
        } catch (IOException e) {
            if (mEventReporter != null) {
                mEventReporter.httpExchangeFailed(requestId, e.toString());
            }
            throw e;
        }

        if (mEventReporter != null) {
            if (requestBodyHelper.hasBody()) {
                requestBodyHelper.reportDataSent();
            }

            Connection connection = chain.connection();
            mEventReporter.responseHeadersReceived(
                    new OkHttpInspectorResponse(
                            requestId,
                            request,
                            response));

            ResponseBody body = response.body();
            MediaType contentType = null;
            InputStream responseStream = null;
            if (body != null) {
                contentType = body.contentType();
                responseStream = body.byteStream();
            }

            responseStream = mEventReporter.interpretResponseStream(
                    requestId,
                    contentType != null ? contentType.toString() : null,
                    response.header("Content-Encoding"),
                    responseStream,
                    new DefaultResponseHandler(mEventReporter, requestId));
            if (responseStream != null) {
                response = response.newBuilder()
                        .body(new ForwardingResponseBody(body, responseStream))
                        .build();
            }
        }

        return response;
    }

    private static class OkHttpInspectorRequest implements NetworkEventReporter.InspectorRequest {
        private final String mRequestId;
        private final Request mRequest;
        private RequestBodyHelper mRequestBodyHelper;

        public OkHttpInspectorRequest(
                String requestId,
                Request request,
                RequestBodyHelper requestBodyHelper) {
            mRequestId = requestId;
            mRequest = request;
            mRequestBodyHelper = requestBodyHelper;
        }

        @Override
        public String id() {
            return mRequestId;
        }

        @Override
        public String friendlyName() {
            // Hmm, can we do better?  tag() perhaps?
            return null;
        }

        @Nullable
        @Override
        public Integer friendlyNameExtra() {
            return null;
        }

        @Override
        public String url() {
            return mRequest.url().toString();
        }

        @Override
        public String method() {
            return mRequest.method();
        }

        @Nullable
        @Override
        public byte[] body() throws IOException {
            RequestBody body = mRequest.body();
            if (body == null) {
                return null;
            }
            OutputStream out = mRequestBodyHelper.createBodySink(firstHeaderValue("Content-Encoding"));
            BufferedSink bufferedSink = Okio.buffer(Okio.sink(out));
            try {
                body.writeTo(bufferedSink);
            } finally {
                bufferedSink.close();
            }
            return mRequestBodyHelper.getDisplayBody();
        }

        @Override
        public int headerCount() {
            return mRequest.headers().size();
        }

        @Override
        public String headerName(int index) {
            return mRequest.headers().name(index);
        }

        @Override
        public String headerValue(int index) {
            return mRequest.headers().value(index);
        }

        @Nullable
        @Override
        public String firstHeaderValue(String name) {
            return mRequest.header(name);
        }
    }

    private static class OkHttpInspectorResponse implements NetworkEventReporter.InspectorResponse {
        private final String mRequestId;
        private final Request mRequest;
        private final Response mResponse;

        public OkHttpInspectorResponse(
                String requestId,
                Request request,
                Response response) {
            mRequestId = requestId;
            mRequest = request;
            mResponse = response;
        }

        @Override
        public String requestId() {
            return mRequestId;
        }

        @Override
        public String url() {
            return mRequest.url().toString();
        }

        @Override
        public int statusCode() {
            return mResponse.code();
        }

        @Override
        public String reasonPhrase() {
            return mResponse.message();
        }

        @Override
        public boolean connectionReused() {
            // Not sure...
            return false;
        }

        @Override
        public int connectionId() {
            return requestId().hashCode();
        }

        @Override
        public boolean fromDiskCache() {
            return mResponse.cacheResponse() != null;
        }

        @Override
        public int headerCount() {
            return mResponse.headers().size();
        }

        @Override
        public String headerName(int index) {
            return mResponse.headers().name(index);
        }

        @Override
        public String headerValue(int index) {
            return mResponse.headers().value(index);
        }

        @Nullable
        @Override
        public String firstHeaderValue(String name) {
            return mResponse.header(name);
        }
    }

    private static class ForwardingResponseBody extends ResponseBody {
        private final ResponseBody mBody;
        private final BufferedSource mInterceptedSource;

        public ForwardingResponseBody(ResponseBody body, InputStream interceptedStream) {
            mBody = body;
            mInterceptedSource = Okio.buffer(Okio.source(interceptedStream));
        }

        @Override
        public MediaType contentType() {
            return mBody.contentType();
        }

        @Override
        public long contentLength() {
            return mBody.contentLength();
        }

        @Override
        public BufferedSource source() {
            // close on the delegating body will actually close this intercepted source, but it
            // was derived from mBody.byteStream() therefore the close will be forwarded all the
            // way to the original.
            return mInterceptedSource;
        }
    }
}
