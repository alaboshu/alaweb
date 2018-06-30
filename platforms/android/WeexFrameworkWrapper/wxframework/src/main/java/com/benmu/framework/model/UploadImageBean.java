package com.benmu.framework.model;

import java.io.Serializable;
import java.util.List;

/**
 * 选择图片，数据，解析Bean
 */
public class UploadImageBean implements Serializable {
    public String url;
    public int maxCount; //最大可选择几张
    public double imageWidth;// 压缩后，图片最大宽度
    public double imageHeight; // 压缩后，图片最大宽度
    public boolean allowCrop;//是否需要剪切为圆形
    public String params; //上传附带参数 json
    public String header;
    public List<String> images; // 上传图片本地地址列表
}
