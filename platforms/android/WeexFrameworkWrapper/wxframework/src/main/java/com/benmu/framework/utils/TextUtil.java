package com.benmu.framework.utils;

import com.alibaba.fastjson.JSON;

import java.util.ArrayList;
import java.util.List;

import okio.Buffer;

/**
 * Created by liuyuanxiao on 18/1/16.
 */

public class TextUtil {
    public static List<Object> conversionObject(List<String> data) {
        List<Object> mData = new ArrayList<>();
        for (String d : data) {
            try {
                mData.add(JSON.parse(d));
            } catch (Exception e) {
                mData.add(d);
            }
        }
        return mData;

    }

    /**
     * https://github.com/square/okhttp/issues/2802
     * Returns {@code s} with control characters and non-ASCII characters replaced with '?'.
     */
    public static String toHumanReadableAscii(String s) {
        for (int i = 0, length = s.length(), c; i < length; i += Character.charCount(c)) {
            c = s.codePointAt(i);
            if (c > '\u001f' && c < '\u007f') continue;

            Buffer buffer = new Buffer();
            buffer.writeUtf8(s, 0, i);
            for (int j = i; j < length; j += Character.charCount(c)) {
                c = s.codePointAt(j);
                buffer.writeUtf8CodePoint(c > '\u001f' && c < '\u007f' ? c : '?');
            }
            return buffer.readUtf8();
        }
        return s;
    }
}
