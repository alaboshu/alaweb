package com.benmu.framework.utils;

/**
 * Created by Carry on 2018/1/10.
 */

public class GeoUtils {
    //GCJ坐标系转百度坐标系
    public static double[] gcj02_To_Bd09(double lat, double lon) {
        double x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        double x = lon, y = lat;
        double z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        double tempLon = z * Math.cos(theta) + 0.0065;
        double tempLat = z * Math.sin(theta) + 0.006;
        return new double[]{tempLat, tempLon};
    }
}
