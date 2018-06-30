package com.benmu.framework.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * 解压Js.zip
 */
public class ZipUtil {
    public static void unZip(String zipFilePath, String outPath) throws Exception {
        ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry entry;
        String entryName;
        int index = 0;
        while ((entry = zipInputStream.getNextEntry()) != null) {
            if (index == 0) {
                if (!(entry.isDirectory() && "bundle".equals(entry.getName()))) {
                    outPath = outPath + File.separator + "bundle";
                }
            }
            entryName = entry.getName();
            System.out.println(entryName);
            if (entry.isDirectory()) {
                File folder = new File(outPath + File.separator + entryName);
                folder.mkdirs();
            } else {
                File file = new File(outPath + File.separator + entryName);
                FileOutputStream out = new FileOutputStream(file);
                int len;
                byte[] buffer = new byte[1024];
                while ((len = zipInputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, len);
                    out.flush();
                }
                out.close();
            }
            index++;
        }
        zipInputStream.close();
    }
}
