package com.benmu.framework.model;

import java.io.Serializable;
import java.util.List;

/**
 * 图片预览数据解析
 */
public class BroeserImgModuleBean implements Serializable {


    private int index; // 所点击图片下标
    private int type;// 图片的来源是本地还是网路
    private List<String> images;//图片的网络地址

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getType() {
        return type;
    }

    public void setType(String stingType) {
        if (stingType == null) return;
        if (stingType.equals("local")) {
            //源于本地
            this.type = 1;
        } else if (stingType.equals("network")) {
            //源于网络
            this.type = 2;
        }
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }


}
