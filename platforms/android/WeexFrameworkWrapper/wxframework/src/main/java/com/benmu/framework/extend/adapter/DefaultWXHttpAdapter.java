package com.benmu.framework.extend.adapter;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.activity.AbstractWeexActivity;
import com.benmu.framework.adapter.router.RouterTracker;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.FileManager;
import com.benmu.framework.manager.impl.ModalManager;
import com.benmu.framework.manager.impl.PersistentManager;
import com.benmu.framework.manager.impl.VersionManager;
import com.benmu.framework.model.Md5MapperModel;
import com.benmu.framework.utils.BaseJsInjector;
import com.benmu.framework.utils.DebugableUtil;
import com.benmu.framework.utils.L;
import com.benmu.framework.utils.Md5Util;
import com.benmu.framework.utils.SharePreferenceUtil;
import com.benmu.framework.utils.TextUtil;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import okhttp3.Cache;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.internal.http.HttpMethod;

/**
 * Created by Carry on 2017/8/7. interceptor for js resource
 */

public class DefaultWXHttpAdapter implements IWXHttpAdapter {
    private ExecutorService mExecutorService;
    private Context mContext;
    private String[] mFileFilter = {".js", ".css", ".html"};
    private String mBaseJs;
    private BaseJsInjector mInjector;
    private OkHttpClient client;

    private void execute(Runnable runnable) {
        if (mExecutorService == null) {
            mExecutorService = Executors.newFixedThreadPool(3);
        }
        mExecutorService.execute(runnable);
    }


    public DefaultWXHttpAdapter(Context context) {
        this.mContext = context;
        mInjector = BaseJsInjector.getInstance();
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        if (DebugableUtil.isDebug()) {
            builder.addNetworkInterceptor(new WeexOkhttp3Interceptor());
        }
        client = builder.build();
    }

    @Override
    public void sendRequest(final WXRequest request, final OnHttpListener listener) {
        if (listener != null) {
            listener.onHttpStart();
        }

        if (!(Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive
                (mContext))) || !isInterceptor(request.url)) {
            fetchUrl(request, listener);
        } else {
            execute(new Runnable() {
                @Override
                public void run() {
                    doInterceptor(request, listener);
                }
            });
        }

    }


    private boolean isInterceptor(String url) {
        return url.endsWith(".js");
    }

    private void doInterceptor(WXRequest request, OnHttpListener listener) {
        WXResponse response = new WXResponse();
        String url = request.url;
        if (TextUtils.isEmpty(url)) {
            if (listener != null) {
                response.statusCode = "-1";
                response.errorCode = "-1";
                response.errorMsg = "Url Is Null";
                listener.onHttpFinish(response);
            }
            return;
        }
        String subPath = url.substring(url.indexOf("/dist/js") + 9);
        File bundleDir = ManagerFactory.getManagerService(FileManager.class).getBundleDir(mContext);
        File path = new File(bundleDir, "bundle/" + subPath);
        Log.e("bus", "bus>>>>>>>" + path.getAbsolutePath());
        if (listener != null) {
            listener.onHttpStart();
        }
        if (path.exists()) {
            //比较md5
            String targetMd5 = findMd5(path.getAbsolutePath());
            String currentMd5 = Md5Util.getFileMD5(path);
            if (currentMd5 == null) {
                //纪录错误   md5映射中找不到该路径
                if (listener != null) {
                    response.statusCode = "-1";
                    response.errorCode = "-1";
                    response.errorMsg = "Can not find:" + path.getAbsolutePath();
                    listener.onHttpFinish(response);
                }
                showError("No MD5 mapping exists");
                return;
            }
            if (!targetMd5.equals(currentMd5)) {
                //纪录错误  得到的md5与映射中md5不一致
                if (listener != null) {
                    response.statusCode = "-1";
                    response.errorCode = "-1";
                    response.errorMsg = "File mismatch with " + path.getAbsolutePath();
                    listener.onHttpFinish(response);
                }
                showError("Inconsistent MD5 in current MD5 and config file");
                return;
            }
            //文件正确  加载本地js
            byte[] bytes = ManagerFactory.getManagerService(FileManager.class).loadLocalFile(path
                    .getAbsolutePath());
            if (listener != null) {
                response.statusCode = 200 + "";
                if (isInterceptor(request.url)) {
//                    response.originalData = appendBaseJs(bytes);
                    response.originalData = bytes;
                    appendBaseJs(response, listener);
                } else {
                    //iconFont
                    response.originalData = bytes;
                    listener.onHttpFinish(response);
                }

            }
            hideError();
        } else {
            if (listener != null) {
                response.statusCode = "-1";
                response.errorCode = "-1";
                response.errorMsg = "File not Exist: " + path.getAbsolutePath();
                listener.onHttpFinish(response);
            }
            showError("File " + path.getAbsolutePath() + "not exist");
        }

    }

    private void hideError() {
        if (!DebugableUtil.isDebug()) return;
        Activity activity = RouterTracker.peekActivity();
        if (activity != null && activity instanceof AbstractWeexActivity) {
            AbstractWeexActivity abs = (AbstractWeexActivity) activity;
            abs.hideError();
        }
    }


    private void showError(final String message) {
        if (!DebugableUtil.isDebug()) return;
        final Activity activity = RouterTracker.peekActivity();
        if (activity != null && activity instanceof AbstractWeexActivity) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    AbstractWeexActivity abs = (AbstractWeexActivity) activity;
                    abs.showError();
                    ModalManager.BmToast.toast(mContext, message,
                            Toast.LENGTH_SHORT);
                }
            });
        }

    }


    private String findMd5(String path) {
        List<Md5MapperModel.Item> lists = ManagerFactory.getManagerService(PersistentManager
                .class).getFileMapper();
        if (lists == null) {
            VersionManager versionManager = ManagerFactory.getManagerService(VersionManager.class);
            versionManager.initMapper(BMWXEnvironment.mApplicationContext);
            lists = ManagerFactory.getManagerService(PersistentManager
                    .class).getFileMapper();
        }
        for (Md5MapperModel.Item item : lists) {
            if (path.endsWith(item.getPage())) {
                return item.getMd5();
            }
        }
        return "";
    }

    private void appendBaseJs(final WXResponse response, final OnHttpListener
            listener) {
        mInjector.injectBaseJs(mContext, response, new BaseJsInjector.InjectJsListener() {
            @Override
            public void onInjectStart(String origin) {

            }

            @Override
            public void onInjectFinish(WXResponse response) {
                L.e("DefaultWXHttpAdapter", "Inject Successful");
                if (listener != null) {
                    listener.onHttpFinish(response);
                }
            }

            @Override
            public void onInjectError() {
                Log.e("DefaultWXHttpAdapter", "basejs Inject Fail");
                if (listener != null) {
                    listener.onHttpFinish(response);
                }
            }
        });
    }


    private void fetchUrl(final WXRequest request, final OnHttpListener listener) {
        final WXResponse wxResponse = new WXResponse();
        String method = request.method == null ? "GET" : request.method.toUpperCase();
        String requestBodyString = request.body == null ? "{}" : request.body;

        RequestBody body = null;
        if (request.paramMap != null && request.paramMap.containsKey("Content-Type")) {
            body = HttpMethod.requiresRequestBody(method)
                    ? RequestBody.create(MediaType.parse(request.paramMap.get("Content-Type")), requestBodyString) : null;
        } else {
            body = HttpMethod.requiresRequestBody(method)
                    ? RequestBody.create(MediaType.parse("application/x-www-form-urlencoded;charset=UTF-8"), requestBodyString) : null;
        }
        Request.Builder requestBuilder = new Request.Builder()
                .url(request.url)
                .method(method, body);
        if (request.paramMap != null) {
            for (Map.Entry<String, String> param : request.paramMap.entrySet()) {
                requestBuilder.addHeader(param.getKey(),  TextUtil.toHumanReadableAscii(param.getValue()));
            }
        }

        client.newCall(requestBuilder.build()).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                wxResponse.errorMsg = e.getMessage();
                wxResponse.errorCode = "-1";
                wxResponse.statusCode = "-1";
                if (listener != null) {
                    listener.onHttpFinish(wxResponse);
                }
            }

            @Override
            public void onResponse(Call call, Response response) {
                byte[] responseBody = new byte[0];
                try {
                    responseBody = response.body().bytes();
                } catch (IOException e) {
                    e.printStackTrace();
                    wxResponse.errorMsg = e.getMessage();
                    wxResponse.errorCode = "-1";
                    wxResponse.statusCode = "-1";
                    if (listener != null) {
                        listener.onHttpFinish(wxResponse);
                    }
                }
                wxResponse.data = new String(responseBody);
                wxResponse.statusCode = String.valueOf(response.code());
                wxResponse.originalData = responseBody;
                wxResponse.extendParams = new HashMap<>();
                for (Map.Entry<String, List<String>> entry : response.headers().toMultimap().entrySet()) {
                    wxResponse.extendParams.put(entry.getKey(), entry.getValue());
                }

                if (response.code() < 200 || response.code() > 299) {
                    wxResponse.errorMsg = response.message();
                    if (listener != null) {
                        listener.onHttpFinish(wxResponse);
                    }
                } else {
                    if (isInterceptor(request.url)) {
                        appendBaseJs(wxResponse, listener);
//                    response.originalData = readInputStreamAsBytes(rawStream,
//                            listener);
                        if (listener != null) {
                            listener.onHttpFinish(wxResponse);
                        }
                    } else {
                        //iconFont
                        if (listener != null) {
                            listener.onHttpFinish(wxResponse);
                        }
                    }
                }
            }
        });
    }


    /**
     * Opens an {@link HttpURLConnection} with parameters.
     *
     * @return an open connection
     */
    private HttpURLConnection openConnection(WXRequest request, OnHttpListener listener) throws
            IOException {
        URL url = new URL(request.url);
        HttpURLConnection connection = createConnection(url);
        connection.setConnectTimeout(request.timeoutMs);
        connection.setReadTimeout(request.timeoutMs);
        connection.setUseCaches(false);
        connection.setDoInput(true);

        if (request.paramMap != null) {
            Set<String> keySets = request.paramMap.keySet();
            for (String key : keySets) {
                connection.addRequestProperty(key, request.paramMap.get(key));
            }
        }

        if ("POST".equals(request.method) || "PUT".equals(request.method) || "PATCH".equals
                (request.method)) {
            connection.setRequestMethod(request.method);
            if (request.body != null) {
                if (listener != null) {
                    listener.onHttpUploadProgress(0);
                }
                connection.setDoOutput(true);
                DataOutputStream out = new DataOutputStream(connection.getOutputStream());
                out.write(request.body.getBytes());
                out.close();
                if (listener != null) {
                    listener.onHttpUploadProgress(100);
                }
            }
        } else if (!TextUtils.isEmpty(request.method)) {
            connection.setRequestMethod(request.method);
        } else {
            connection.setRequestMethod("GET");
        }

        return connection;
    }

    private byte[] readInputStreamAsBytes(InputStream inputStream, OnHttpListener listener)
            throws IOException {
        if (inputStream == null) {
            return null;
        }
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();

        int nRead;
        int readCount = 0;
        byte[] data = new byte[2048];

        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
            readCount += nRead;
            if (listener != null) {
                listener.onHttpResponseProgress(readCount);
            }
        }

        buffer.flush();

        return buffer.toByteArray();
    }

    private String readInputStream(InputStream inputStream, OnHttpListener listener) throws
            IOException {
        if (inputStream == null) {
            return null;
        }
        StringBuilder builder = new StringBuilder();
        BufferedReader localBufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        char[] data = new char[2048];
        int len;
        while ((len = localBufferedReader.read(data)) != -1) {
            builder.append(data, 0, len);
            if (listener != null) {
                listener.onHttpResponseProgress(builder.length());
            }
        }
        localBufferedReader.close();
        return builder.toString();
    }

    /**
     * Create an {@link HttpURLConnection} for the specified {@code url}.
     */
    protected HttpURLConnection createConnection(URL url) throws IOException {
        return (HttpURLConnection) url.openConnection();
    }

    public interface IEventReporterDelegate {
        void preConnect(HttpURLConnection connection, String body);

        void postConnect();

        InputStream interpretResponseStream(InputStream inputStream);

        void httpExchangeFailed(IOException e);
    }

    private static class NOPEventReportDelegate implements com.taobao.weex.adapter
            .DefaultWXHttpAdapter
            .IEventReporterDelegate {
        @Override
        public void preConnect(HttpURLConnection connection, String body) {
            //do nothing
        }

        @Override
        public void postConnect() {
            //do nothing
        }

        @Override
        public InputStream interpretResponseStream(InputStream inputStream) {
            return inputStream;
        }

        @Override
        public void httpExchangeFailed(IOException e) {
            //do nothing
        }
    }
}
