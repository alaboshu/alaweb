package com.benmu.framework.update;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;
import com.benmu.framework.BMWXEnvironment;
import com.benmu.framework.constant.Constant;
import com.benmu.framework.http.okhttp.callback.FileCallBack;
import com.benmu.framework.http.okhttp.callback.StringCallback;
import com.benmu.framework.http.okhttp.exception.HttpException;
import com.benmu.framework.manager.ManagerFactory;
import com.benmu.framework.manager.impl.AxiosManager;
import com.benmu.framework.manager.impl.FileManager;
import com.benmu.framework.manager.impl.ParseManager;
import com.benmu.framework.manager.impl.VersionManager;
import com.benmu.framework.model.JsVersionInfoBean;
import com.benmu.framework.model.Md5MapperModel;
import com.benmu.framework.model.VersionBean;
import com.benmu.framework.model.VersionJson;
import com.benmu.framework.utils.BaseCommonUtil;
import com.benmu.framework.utils.L;
import com.benmu.framework.utils.Md5Util;
import com.benmu.framework.utils.SharePreferenceUtil;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;

import me.ele.patch.BsPatch;
import okhttp3.Call;

/**
 * Created by Carry on 2017/11/23.
 * 版本检查
 */

public class VersionChecker {
    private static final String TAG = "VersionChecker";
    private JsVersionInfoBean newVersion;
    private String mUpdateUrl;
    private Context mContext;
    private int mCurrentStatus=Constant.Version.SLEEP;

    public VersionChecker(Context context) {
        this.mContext = context;
    }

    public void checkVersion() {
        if(mCurrentStatus==Constant.Version.UPDATING)return;
        Update();
    }


    private void readyUpdate() {
        mUpdateUrl = BMWXEnvironment.mPlatformConfig.getUrl().getBundleUpdate();
        if (TextUtils.isEmpty(mUpdateUrl)) return;

        if (Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive(mContext))) {
            mCurrentStatus=Constant.Version.UPDATING;
            VersionManager versionManager = ManagerFactory.getManagerService(VersionManager.class);
            versionManager.checkBundleUpdate(mContext, mUpdateUrl,
                    true, new StringCallback() {
                        @Override
                        public void onError(Call call, Exception e, int id) {
                            Log.e(TAG, "获取更新失败");
                            mCurrentStatus=Constant.Version.SLEEP;
                        }

                        @Override
                        public void onResponse(String response, int id) {
                            VersionBean version = ManagerFactory.getManagerService(ParseManager
                                    .class).parseObject(response,
                                    VersionBean
                                            .class);
                            if (version == null) {
                                Log.e(TAG, "返回结果异常");
                                mCurrentStatus=Constant.Version.SLEEP;
                                return;
                            }
                            switch (version.resCode) {
                                case 0://需要更新
                                    if (!TextUtils.isEmpty(version.data.path)) {
                                        if (version.data.diff) {
                                            //更新插分包
                                            Log.e(TAG, "检查插分包");
                                            download(version, false);
                                        } else {
                                            //下载全量包
                                            Log.e(TAG, "检查全量包");
                                            downloadCompleteZip();
                                        }
                                    } else {
                                        //下载全量包
                                        Log.e(TAG, "检查全量包");
                                        downloadCompleteZip();
                                    }
                                    break;
                                case 401:
                                    Log.e(TAG, "JS文件查询失败!");
                                    mCurrentStatus=Constant.Version.SLEEP;
                                    break;
                                case 4000:
                                    Log.e(TAG, "当前版本已是最新!");
                                    mCurrentStatus=Constant.Version.SLEEP;
                                    break;
                                default:
                                    Log.e(TAG, "resCode:" + version.resCode);
                                    mCurrentStatus=Constant.Version.SLEEP;
                                    break;

                            }
                        }
                    });

        }
    }


    /**
     * 下载全量包
     */
    private void downloadCompleteZip() {
        VersionManager versionManager = ManagerFactory.getManagerService(VersionManager.class);
        versionManager.checkBundleUpdate(mContext, mUpdateUrl,
                false, new StringCallback() {
                    @Override
                    public void onError(Call call, Exception e, int id) {
                        L.e(TAG, "检查全量包失败!，更新失败");
                    }

                    @Override
                    public void onResponse(String response, int id) {
                        VersionBean version = ManagerFactory.getManagerService(ParseManager
                                .class).parseObject(response, VersionBean
                                .class);
                        if (version != null && !TextUtils.isEmpty(version.data.path)) {
                            L.e(TAG, "检查全量包成功!，开始下载");
                            download(version, true);
                        }
                    }
                });
    }

    /**
     * 下载包
     */
    public void download(final VersionBean version, final boolean complete) {
        try {
            if (version == null) {
                mCurrentStatus=Constant.Version.SLEEP;
                return;
            }
            VersionManager versionManager = ManagerFactory.getManagerService(VersionManager.class);
            versionManager.downloadBundle(version.data.path, new FileCallBack(FileManager
                    .getTempBundleDir(mContext).getAbsolutePath(), version.data.diff ? FileManager
                    .PATCH_NAME : FileManager.TEMP_BUNDLE_NAME) {
                @Override
                public void onError(Call call, Exception e, int id) {
                    Log.e(TAG, "下载插分包出错");
                    if (!complete) {
                        downloadCompleteZip();
                    } else {
                        mCurrentStatus=Constant.Version.SLEEP;
                    }
                }

                @Override
                public void onResponse(File response, int id) {
                    Log.e("version", "下载成功" + response.getAbsolutePath());
                    if (version.data.diff) {
                        bsPatch();
                    } else {
                        File download = new File(FileManager.getTempBundleDir(mContext)
                                , FileManager.TEMP_BUNDLE_NAME);
                        if (checkZipValidate(download)) {
                            RenameDeleteFile();
                            //更改本地jsversion
                            SharePreferenceUtil.setDownLoadVersion(mContext,
                                    ManagerFactory.getManagerService(ParseManager.class)
                                            .toJsonString(newVersion));
                            newVersion = null;
                            mCurrentStatus=Constant.Version.SLEEP;
                        } else {
                            L.e(TAG, "更新包md5校验失败，更新失败");
                            FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                    (mContext), FileManager.TEMP_BUNDLE_NAME));
                            newVersion = null;
                            mCurrentStatus=Constant.Version.SLEEP;
                        }
                    }

                }


            });
        } catch (Exception e) {
            mCurrentStatus=Constant.Version.SLEEP;
            e.printStackTrace();
        }


    }


    /**
     * MD5 效验
     */
    private boolean checkZipValidate(File file) {
        if (file.exists()) {
            byte[] json = FileManager.extractZip(file, "md5.json");
            if (json == null) {
                return false;
            }
            try {
                Md5MapperModel mapper = ManagerFactory.getManagerService(ParseManager.class)
                        .parseObject(new String(json, "UTF-8"),
                                Md5MapperModel.class);
                //校验文件正确性
                List<Md5MapperModel.Item> lists = mapper.getFilesMd5();
                // 按照md5值从小到大排列
                Collections.sort(lists);
                //所有md5想加得到总的md5
                String total = "";
                for (Md5MapperModel.Item item : lists) {
                    total = total + item.getMd5();
                }
                String finalMd5 = Md5Util.getMd5code(total);
                //比较md5是否正确
                newVersion = new JsVersionInfoBean(mapper.getJsVersion(), mapper.getAndroid(),
                        mapper.getTimestamp());
                return mapper.getJsVersion().equals(finalMd5);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return false;
    }


    /**
     * 插分生成全量包
     */
    private void bsPatch() {

        File oldFile = new File(FileManager.getTempBundleDir(mContext), FileManager
                .BUNDLE_NAME);
        File newFile = new File(FileManager.getTempBundleDir(mContext), FileManager
                .TEMP_BUNDLE_NAME);
        File patchFile = new File(FileManager.getTempBundleDir(mContext), FileManager
                .PATCH_NAME);
        if (oldFile.exists() && patchFile.exists()) {
            BsPatch.workAsync(oldFile.getAbsolutePath(), newFile.getAbsolutePath(), patchFile
                    .getAbsolutePath(), new BsPatch.BsPatchListener() {
                @Override
                public void onSuccess(String oldPath, String newPath, String patchPath) {
                    Log.e(TAG, "bspath 命令成功");
                    //验证下载包是否正确
                    File download = new File(FileManager.getTempBundleDir
                            (mContext), FileManager
                            .TEMP_BUNDLE_NAME);
                    boolean validate = checkZipValidate(download);
                    if (validate) {
                        Log.e(TAG, "下载patch md5校验成功");
                        FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                (mContext), FileManager.BUNDLE_NAME));
                        FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                (mContext), FileManager.PATCH_NAME));
                        FileManager.renameFile(FileManager.getTempBundleDir
                                        (mContext),
                                FileManager.TEMP_BUNDLE_NAME, FileManager
                                        .BUNDLE_NAME);
                        //更改本地jsversion
                        SharePreferenceUtil.setDownLoadVersion(mContext, ManagerFactory
                                .getManagerService(ParseManager.class).toJsonString(newVersion));
                        newVersion = null;
                        mCurrentStatus=Constant.Version.SLEEP;
                    } else {
                        Log.e(TAG, "下载patch md5校验出错");
                        //删除生成的新包和patch包
                        FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                (mContext), FileManager.PATCH_NAME));
                        FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                (mContext), FileManager.TEMP_BUNDLE_NAME));
                        newVersion = null;
                        mCurrentStatus=Constant.Version.SLEEP;
                    }

                }

                @Override
                public void onFail(String oldPath, String newPath, String patchPath, Exception e) {
                    Log.e(TAG, "bspath 命令失败");
                    FileManager.deleteFile(new File(FileManager.getTempBundleDir
                            (mContext), FileManager.PATCH_NAME));
                    FileManager.deleteFile(new File(FileManager.getTempBundleDir
                            (mContext), FileManager.TEMP_BUNDLE_NAME));
                    mCurrentStatus=Constant.Version.SLEEP;
                }
            });
        }


    }


    /**
     * 删除旧的Js包,更新新Js包名称
     */
    private void RenameDeleteFile() {
        FileManager.deleteFile(new File(FileManager.getTempBundleDir
                (mContext), FileManager.BUNDLE_NAME));
        FileManager.renameFile(FileManager.getTempBundleDir
                        (mContext),
                FileManager.TEMP_BUNDLE_NAME, FileManager
                        .BUNDLE_NAME);
    }

    public void GetVersionInfo(String url, StringCallback callback) {
        AxiosManager axiosManager = ManagerFactory.getManagerService(AxiosManager.class);
        axiosManager.get(url, null, null, callback, url,0);
    }

    private void Update() {
        mUpdateUrl = BMWXEnvironment.mPlatformConfig.getUrl().getBundleUpdate();
        if (TextUtils.isEmpty(mUpdateUrl)) return;
        mCurrentStatus = Constant.Version.UPDATING;
        if (Constant.INTERCEPTOR_ACTIVE.equals(SharePreferenceUtil.getInterceptorActive(mContext))) {
            GetVersionInfo(mUpdateUrl, new StringCallback() {
                @Override
                public void onError(Call call, Exception e, int id) {
                    Log.e(TAG, "检查更新失败");
                    mCurrentStatus = Constant.Version.SLEEP;
                }

                @Override
                public void onResponse(String response, int id) {
                    VersionJson version = ManagerFactory.getManagerService(ParseManager
                            .class).parseObject(response, VersionJson.class);
                    if (version == null || version.android == null) {
                        Log.e(TAG, response);
                        Log.e(TAG, "返回结果异常");
                        mCurrentStatus=Constant.Version.SLEEP;
                        return;
                    }
                    CheckUpdate(version.android);
                }
            });
        }
    }
    public void CheckUpdate(List<VersionJson.Version> android) {
        if (android == null) return ;
        String version = BaseCommonUtil.getVersionName(mContext);
        String versionCode = BaseCommonUtil.getVersionCode(mContext);
        String jsVerison = SharePreferenceUtil.getVersion(mContext);
        if (TextUtils.isEmpty(jsVerison)) {
            jsVerison = "";
        } else {
            ParseManager parseManager = ManagerFactory.getManagerService(ParseManager.class);
            JsVersionInfoBean jsVersionInfoBean = parseManager.parseObject(jsVerison,
                    JsVersionInfoBean.class);
            if (jsVersionInfoBean == null) {
                jsVerison = "";
            } else {
                jsVerison = jsVersionInfoBean.getJsVersion();
            }
        }
        Boolean isAppNewest = true;
        for (int i = 0; i < android.size(); i++) {
            // 更新js bundle
            if (android.get(i).version.equals(version) && versionCode.equals(android.get(i).versionCode)) {
                if (android.get(i).jsVersion.equals(jsVerison)) {
                    Log.d(TAG, "已是最新版Js Bundle");
                    mCurrentStatus = Constant.Version.SLEEP;
                } else {
                    String patchName = Md5Util.getMd5code(jsVerison + android.get(i).jsVersion);
                    String url = android.get(i).path + "jsVersion/" + patchName + ".zip";
                    DownloadJsBundle(url,android.get(i),true);
                }
            }
            // 检查app更新
            if (Integer.parseInt(android.get(i).versionCode) > Integer.parseInt(versionCode)) {
                // 版本更新
                versionCode = android.get(i).versionCode;
                Log.e(TAG, "setUpdateInfo");
                isAppNewest = false;
                SharePreferenceUtil.setUpdateInfo(mContext, ManagerFactory
                        .getManagerService(ParseManager.class).toJsonString(android.get(i)));
            }
        }
        if (isAppNewest) {
            SharePreferenceUtil.setUpdateInfo(mContext, null);
            File file = new File(FileManager.getTempBundleDir(mContext),"temp.apk");
            if (file.exists()) {
                FileManager.deleteFile(file);
            }
        }
    }
    public void DownloadJsBundle(String url, final VersionJson.Version versionBean, final Boolean diff) {
        if (!diff) {
            if (versionBean == null) {
                mCurrentStatus=Constant.Version.SLEEP;
                return;
            }
            url = versionBean.path + "jsVersion/" + versionBean.jsVersion + ".zip";
        }
        try {
            VersionManager versionManager = ManagerFactory.getManagerService(VersionManager.class);
            versionManager.downloadBundle(url, new FileCallBack(FileManager
                    .getTempBundleDir(mContext).getAbsolutePath(), diff ? FileManager
                    .PATCH_NAME : FileManager.TEMP_BUNDLE_NAME) {
                @Override
                public void onError(Call call, Exception e, int id) {
                    if (diff) {
                        Log.e(TAG, "下载插分包出错");
                        if (e instanceof HttpException) {
                            HttpException httpException = (HttpException) e;
                            int code = httpException.getmErrorCode();
                            if (code == 404) {  // 找不到差分包, 则下载全量包
                                DownloadJsBundle("", versionBean, false);
                            } else {
                                mCurrentStatus=Constant.Version.SLEEP;
                            }
                        } else {
                            mCurrentStatus=Constant.Version.SLEEP;
                        }
                    } else {
                        Log.e(TAG, "下载全量包出错");
                        mCurrentStatus=Constant.Version.SLEEP;
                    }
                }

                @Override
                public void onResponse(File response, int id) {
                    Log.e(TAG, "下载成功" + response.getAbsolutePath());
                    if (diff) {
                        bsPatch();
                    } else {
                        File download = new File(FileManager.getTempBundleDir(mContext)
                                , FileManager.TEMP_BUNDLE_NAME);
                        if (checkZipValidate(download)) {
                            RenameDeleteFile();
                            //更改本地jsversion
                            SharePreferenceUtil.setDownLoadVersion(mContext,
                                    ManagerFactory.getManagerService(ParseManager.class)
                                            .toJsonString(newVersion));
                            newVersion = null;
                            mCurrentStatus=Constant.Version.SLEEP;
                        } else {
                            L.e(TAG, "更新包md5校验失败，更新失败");
                            FileManager.deleteFile(new File(FileManager.getTempBundleDir
                                    (mContext), FileManager.TEMP_BUNDLE_NAME));
                            newVersion = null;
                            mCurrentStatus=Constant.Version.SLEEP;
                        }
                    }
                }
            });
        } catch (Exception e) {
            mCurrentStatus=Constant.Version.SLEEP;
            e.printStackTrace();
        }
    }
}

