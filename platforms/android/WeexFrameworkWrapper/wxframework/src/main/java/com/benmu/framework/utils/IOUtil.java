package com.benmu.framework.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Carry on 2017/10/25.
 */

public class IOUtil {

    public static byte[] readInputStream(InputStream inputStream) {

        // 1.建立通道对象
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        // 2.定义存储空间
        byte[] buffer = new byte[1024];
        // 3.开始读文件
        int len = -1;
        try {
            if (inputStream != null) {
                while ((len = inputStream.read(buffer)) != -1) {
                    // 将Buffer中的数据写到outputStream对象中
                    outputStream.write(buffer, 0, len);
                }
            }
            // 4.关闭流
            outputStream.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}
