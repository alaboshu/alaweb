package com.benmu.framework.model;

import java.util.List;

/**
 * Js,上传文件成功，返回数据
 */

public class UploadResultBean extends BaseResultBean {
    public List<String> data;

    public void setData(List<String> data) {
        this.data = data;
    }
}
