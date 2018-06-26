# Uploader

> 上传组件

## 引入

``` js
import MpUploaderBase from 'mp-weui/packages/uploader-base'

export default {
  components: {
    MpUploaderBase
  }
}
```

## 示例

``` html
<mp-uploader-base
  @onSelect="onSelect"
  :file-list="files"
  title="文件上传"
  :max="max"
/>
```

获取文件列表

``` js
onSelect() {
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    count: this.max,
    success: (res) => {
      this.files = this.files.concat(res.tempFiles);
    },
  });
}
```

fileList示例

``` js
filelist = [
  {
    path: '', // 本地文件路径
    size: 1024, // 本地文件大小，单位：B
    failure: false, // 是否上传失败
    progress: 50, // 上传进度，0 - 100
  }
]
```

## Props

### fileList

* Type: `object[]`

上传文件列表。

### max

* Type: `number`

最多可以选择的图片张数。

### title

* Type: `string`

显示标题。

## Events

### onSelect

点击添加按钮事件。
