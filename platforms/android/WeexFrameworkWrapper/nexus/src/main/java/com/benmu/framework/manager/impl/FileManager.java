package com.benmu.framework.manager.impl;

import android.content.Context;
import android.os.Environment;

import com.benmu.framework.manager.Manager;
import com.benmu.framework.utils.ZipUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * Created by Carry on 2017/8/7.
 */

public class FileManager extends Manager{
    public static final String BASE_DIR = "benmu";
    public static final String BUNDLE_NAME = "bundle.zip";
    public static final String TEMP_BUNDLE_NAME = "temp_pages.zip";
    public static final String JS_BUNDLE = "/.bundle";
    public static final String JS_TEMP_REPERTORY = "/.temp_bundle";
    public static final String PATCH_NAME = "patch.zip";
    public static final String TEMP_NEW_BUNDLE_NAME = "newPages.zip";
    public static final String TEMP_FILE = "/.temp_file";
    public static final String PAGES_DIR = JS_BUNDLE + "/bundle/pages";
    public static final String ICONFONT_DIR = JS_BUNDLE + "/bundle/iconfont";
    public static final String BASEJS_DIR = JS_BUNDLE + "/bundle/config";
    public static final String MEDIATOR_DIR = JS_BUNDLE + "/bundle/mediator";

    public static boolean isSDCardAvailable() {
        return Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
    }

    public static File getTempFilePath(Context context) {
        return getPath(TEMP_FILE, context);
    }


    private static File getPath(String fileName, Context context) {
        File file = new File(getBasePath(context), fileName);
        if (!file.exists()) {
            file.mkdirs();
        }
        return file;
    }


    public static File getBasePath(Context context) {
        File appDir = null;
        if (isSDCardAvailable()) {
            appDir = new File(context.getExternalFilesDir(null), BASE_DIR);
        }
        if (appDir == null) {

            appDir = new File(context.getFilesDir(), BASE_DIR);
        }
        if (!appDir.exists()) {
            appDir.mkdirs();
        }
        return appDir;
    }

    public static File getAppPath(String path, Context context) {
        File appFile = new File(getBasePath(context), path);
        if (!appFile.exists()) {
            appFile.mkdirs();
        }

        return appFile;
    }

    public static File getBundleDir(Context context) {
        return getAppPath(JS_BUNDLE, context);
    }


    public static File getPagesDir(Context context) {
        return getAppPath(PAGES_DIR, context);
    }

    public static File getIconDir(Context context) {
        return getAppPath(ICONFONT_DIR, context);
    }

    public static File getBaseJsDir(Context context) {
        return getAppPath(BASEJS_DIR, context);
    }

    public static File getMediatorDir(Context context) {
        return getAppPath(MEDIATOR_DIR, context);
    }

    public static File getTempBundleDir(Context context) {
        return getAppPath(JS_TEMP_REPERTORY, context);
    }


    public static File getPathBundleDir(Context context, String path) {
        return new File(getBundleDir(context), path);
    }


    public static boolean isExists(String path) {
        File file = new File(path);
        return file.exists();
    }


    public static String loadJs(String path) {
        String str = null;
        try {
            FileInputStream inputStream = new FileInputStream(new File(path));
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();
            str = new String(buffer, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return str;
    }

    public static byte[] loadLocalFile(String path) {
        try {
            FileInputStream inputStream = new FileInputStream(new File(path));
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();
            return buffer;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }

    public static boolean isEmptyDir(File file) {
        if (file != null && file.isDirectory()) {
            File[] files = file.listFiles();
            return files.length == 0;
        }
        throw new RuntimeException("dir is null or not a directory");
    }


    public static File getFileInDir(File file, int index) {
        if (file != null && file.isDirectory()) {
            File[] files = file.listFiles();
            if (files.length > index) {
                return files[index];
            }
            return null;

        }
        return null;
    }


    public static void unZip(File fromFile, File toFile) {
        if (toFile == null || fromFile == null) {
            return;
        }
        try {
            ZipUtil.unZip(fromFile.getAbsolutePath(), toFile.getAbsolutePath());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static byte[] extractZip(File zipFile, String entryName) {
        ZipFile zf = null;
        ZipEntry ze = null;
        byte[] buffer = null;
        try {
            zf = new ZipFile(zipFile);
            ze = zf.getEntry(entryName);
            InputStream in = zf.getInputStream(ze);
            int size = in.available();
            buffer = new byte[size];
            in.read(buffer);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return buffer;
    }


    public static void clearDir(File dir) {
        if (dir.isFile()) {
            dir.delete();
            return;
        }
        if (dir.isDirectory()) {
            File[] childFile = dir.listFiles();
            if (childFile == null || childFile.length == 0) {
                dir.delete();
                return;
            }
            for (File f : childFile) {
                clearDir(f);
            }
            dir.delete();
        }

    }


    public static void deleteFile(File file) {
        if (file != null && file.exists()) {
            file.delete();
        }
    }

    public static void renameFile(File path, String oldname, String newname) {
        if (!oldname.equals(newname)) {//新的文件名和以前文件名不同时,才有必要进行重命名
            File oldfile = new File(path, oldname);
            File newfile = new File(path, newname);
            if (!oldfile.exists()) {
                return;//重命名文件不存在
            }
            if (newfile.exists())//若在该目录下已经有一个文件和新文件名相同，则不允许重命名
                System.out.println(newname + "已经存在！");
            else {
                oldfile.renameTo(newfile);
            }
        } else {
            System.out.println("新文件名和旧文件名相同...");
        }
    }
}
