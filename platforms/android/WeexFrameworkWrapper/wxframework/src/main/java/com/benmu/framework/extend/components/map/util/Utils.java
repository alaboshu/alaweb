package com.benmu.framework.extend.components.map.util;

import java.io.FileInputStream;
import java.io.IOException;

/**
 * Created by budao on 2017/2/10.
 */

public class Utils {
  public static boolean isGif(String file) {
    FileInputStream imgFile = null;
    try {
      imgFile = new FileInputStream(file);
      byte[] header = new byte[3];
      int length = imgFile.read(header);
      return length == 3 && header[0] == (byte) 'G' && header[1] == (byte) 'I' && header[2] == (byte) 'F';
    } catch (Exception e) {
      // ignore
    } finally {
      if (imgFile != null) {
        try {
          imgFile.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }

    return false;
  }
}
