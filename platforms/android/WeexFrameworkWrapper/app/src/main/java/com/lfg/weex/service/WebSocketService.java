package com.lfg.weex.service;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.FileProvider;

import com.benmu.framework.manager.impl.FileManager;
import com.lfg.weex.R;
import com.lfg.weex.broadcast.NotifictionBroadcastReceiver;
import com.lfg.weex.constant.Constant;
import com.taobao.weex.WXEnvironment;

import java.io.File;

/**
 * Created by lifugui on 2017/10/19.
 */

public class WebSocketService extends Service {

    private NotifictionBroadcastReceiver broadcastReceiver = null;
    public static Boolean isDownloading = false;
    NotificationManager manager;
    Notification notification;
    String url;
    String version;
    String appName;
    public WebSocketService () {

    }
    @Override
    public IBinder onBind(Intent intent) {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // localBroadcastManager = LocalBroadcastManager.getInstance(this);
        broadcastReceiver = new NotifictionBroadcastReceiver();
        IntentFilter intentFilter = new IntentFilter("JumpToNotificationPage");
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        registerReceiver(broadcastReceiver, intentFilter);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            url = intent.getStringExtra("url");
            if (url != null) {
                version = intent.getStringExtra("version");
                appName = getResources().getString(R.string.app_name);
                manager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
                String title = appName + getResources().getString(R.string.update_download);
                refreshNotification(title,"0MB(0%)", null);
                isDownloading = true;
                new UpdateThread().execute();
            }
        }
        return super.onStartCommand(intent, flags, startId);
    }
    private void refreshNotification(String title, String text, PendingIntent pi) {
        notification = new NotificationCompat.Builder(this)
                .setContentTitle(title)
                .setContentText(text)
                .setTicker(title)
                .setWhen(System.currentTimeMillis())
                .setSmallIcon(R.mipmap.logo_white)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(),
                        R.mipmap.ic_launcher))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setContentIntent(pi)
                .setAutoCancel(true)
                .setOngoing(true)
                .build();
        manager.notify(Constant.NOTIFICATION_DOWNLOAD, notification);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(broadcastReceiver);
        stopSelf();
    }

    class UpdateThread extends AsyncTask<Void,Void, Integer> {
        @Override
        protected Integer doInBackground(Void... voids) {
            final File file = new File(FileManager.getTempBundleDir(WXEnvironment.sApplication), "temp.apk");
            final File rightfile = new File(FileManager.getTempBundleDir(WXEnvironment.sApplication), "right.apk");
            if (rightfile.exists()) {
                manager.cancel(Constant.NOTIFICATION_DOWNLOAD);
                Uri uri;
                Intent install = new Intent(Intent.ACTION_VIEW);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    uri = FileProvider.getUriForFile(WXEnvironment.sApplication, "com.lfg.weex.fileprovider",rightfile);
                    install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                } else {
                    uri = Uri.fromFile(rightfile);
                }
                install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                install.setDataAndType(uri, "application/vnd.android.package-archive");
                startActivity(install);
                isDownloading = false;
                return 0;
            }
            if (file.exists()) {
                FileManager.deleteFile(file);
            }
            DownloadUtil.get().download(url, file.getAbsolutePath(), new DownloadUtil.OnDownloadListener() {
                @Override
                public void onDownloadSuccess() {
                    String title = appName+version + getResources().getString(R.string.download_finished);
                    if (rightfile.exists()) FileManager.deleteFile(rightfile);
                    file.renameTo(rightfile);
                    Uri uri;
                    Intent install = new Intent(Intent.ACTION_VIEW);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        uri = FileProvider.getUriForFile(WXEnvironment.sApplication, "com.lfg.weex.fileprovider",rightfile);
                        install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    } else {
                        uri = Uri.fromFile(rightfile);
                    }
                    install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    install.setDataAndType(uri, "application/vnd.android.package-archive");
                    PendingIntent pi = PendingIntent.getActivity(WebSocketService.this,0, install,0);
                    refreshNotification(title,"", pi);
                    startActivity(install);
                    isDownloading = false;
                }

                @Override
                public void onDownloading(double totalMB, int progress) {
                    String sizeStr = totalMB < 1 ? String.format("%.1fKB", totalMB*1000) : String.format("%.1fMB", totalMB);
                    String title = appName + getResources().getString(R.string.update_download) + "("+ sizeStr + ")";
                    refreshNotification(title,getResources().getString(R.string.downloading) + progress+"%",null);
                }

                @Override
                public void onDownloadFailed() {
                    String title = appName + version + getResources().getString(R.string.download_failed);
                    refreshNotification(title,"",null);
                    FileManager.deleteFile(file);
                }
            });
            return null;
        }

        @Override
        protected void onPostExecute(Integer integer) {
            super.onPostExecute(integer);
        }
    }
}
