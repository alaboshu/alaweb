package com.benmu.framework.model;

import java.io.Serializable;

/**
 * js 滑动漂移量获取
 */
public class BMScrollBean implements Serializable {
    public static class OffSet {
        public int x;
        public int y;

        public OffSet(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    public static class Size {
        public int height;
        public int width;

        public Size(int height, int width) {
            this.height = height;
            this.width = width;
        }
    }
}
