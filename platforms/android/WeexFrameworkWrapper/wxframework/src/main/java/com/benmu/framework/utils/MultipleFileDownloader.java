package com.benmu.framework.utils;

import android.os.SystemClock;
import android.util.Log;

import com.benmu.framework.http.okhttp.callback.FileCallBack;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.AxiosManager;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;

/**
 * Created by Carry on 2017/10/18.
 */

public class MultipleFileDownloader {
    private String mPath;
    private List<String> mList;
    private int mSize = 0;
    private onDownloadFinish mListener;
    private List<FileItem> paths;
    private List<FileItem> erros;

    public MultipleFileDownloader(String path, List<String> urls) {
        this.mPath = path;
        this.mList = urls;
        this.paths = new ArrayList<>();
        this.erros = new ArrayList<>();
    }

    public MultipleFileDownloader setOnFinshListener(onDownloadFinish listener) {
        this.mListener = listener;
        return this;
    }

    public void execute() {
        if (mList == null) return;
        AxiosManager axiosManager = ManagerFactory.getManagerService(AxiosManager.class);
        for (final String url : mList) {
            final String fileName = createFileName(url);
            axiosManager.download(url, new FileCallBack(mPath, fileName) {
                @Override
                public void onError(Call call, Exception e, int id) {
                    mSize++;
                    Log.e("url","error"+url);
                    erros.add(new FileItem(new File(mPath,fileName).getAbsolutePath(),fileName));
                    postResult(mSize);
                }

                @Override
                public void onResponse(File response, int id) {
                    mSize++;
                    Log.e("url",url);
                    paths.add(new FileItem(new File(mPath,fileName).getAbsolutePath(),fileName));
                    postResult(mSize);
                }
            });
        }

    }

    private void postResult(int count) {
        if (count == mList.size()) {
            //全部下载完成
            if (mListener != null) {
                mListener.onFinish(paths, erros);
            }
        }
    }

    private String createFileName(String url) {
        return SystemClock.currentThreadTimeMillis() + "." + BaseCommonUtil.getExtensionName(url);
    }

    public interface onDownloadFinish {
        void onFinish(List<FileItem> pathList, List<FileItem> errorList);
    }

    public class FileItem {
        private String path;
        private String name;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public FileItem(String path, String name) {
            this.path = path;
            this.name = name;
        }
    }

}
