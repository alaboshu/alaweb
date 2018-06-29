package com.benmu.framework.utils;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

import java.io.File;
import java.lang.reflect.Field;

/**
 * Created by Carry on 2017/10/21.
 */
public class ResourceUtil {

    public static Uri getSafeUri(Context context, String path, String fileName) {
//        Uri parse=null;
//        if (Build.VERSION.SDK_INT >= 24) {
////            try {
//            File file = new File(path);
//            if (!file.exists()) file.mkdirs();
//            return FileProvider.getUriForFile(context, "com.benmu.wx.fileprovider", file);
//                parse = Uri.parse(MediaStore.Images.Media.insertImage(context.getContentResolver
//                        (), path,path.substring(path.lastIndexOf("/")+1), null));
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//            }
//            return parse;
//        } else {
        return Uri.fromFile(new File(path));
//        }
    }


    public static int getMipmapId(String packName, String resourceName) {
        Class mipmap = null;
        try {
            mipmap = Class.forName(packName + ".R$mipmap");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (mipmap == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added necessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }

        return getResourceId(mipmap, resourceName);
    }

    public static int getDrawableId(String packName, String resourceName) {
        Class drawable = null;
        try {
            drawable = Class.forName(packName + ".R$drawable");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (drawable == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added necessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }

        return getResourceId(drawable, resourceName);
    }

    public static int getLayoutId(String packName, String resourceName) {
        Class layout = null;
        try {
            layout = Class.forName(packName + ".R$layout");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (layout == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added neccessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }
        return getResourceId(layout, resourceName);
    }

    public static int getId(String packName, String resourceName) {
        Class id = null;
        try {
            id = Class.forName(packName + ".R$id");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (id == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added neccessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }
        return getResourceId(id, resourceName);
    }

    public static int getStringId(String packName, String resourceName) {
        Class string = null;
        try {
            string = Class.forName(packName + ".R$string");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (string == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added neccessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }
        return getResourceId(string, resourceName);
    }

    public static int getAttrId(String packName, String resourceName) {
        Class attr = null;
        try {
            attr = Class.forName(packName + ".R$attr");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (attr == null) {
            throw new IllegalArgumentException(
                    "ResClass is not initialized. Please make sure you have added neccessary " +
                            "resources. Also make sure you have "
                            + packName
                            + ".R$* configured in obfuscation. field="
                            + resourceName);
        }
        return getResourceId(attr, resourceName);
    }


    private static int getResourceId(Class classType, String resourceName) {
        try {
            Field field = classType.getField(resourceName);
            return field.getInt(resourceName);
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("ResourceHelper",
                    "Error getting resource. Make sure you have copied all resources (res/) from " +
                            "SDK to your project.");
        }
        return -1;
    }
}
