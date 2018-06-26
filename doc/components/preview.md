# Preview

> 表单预览

## 引入

``` js
import MpPreview from 'mp-weui/packages/preview'

export default {
  components: {
    MpPreview
  }
}
```

## 示例

定义数据项

``` js
this.rows = [
  {
    label: '商品',
    value: '电动打蛋机'
  },
  {
    label: '标题标题',
    value: '名字名字名字'
  }
]
```

使用

``` html
<mp-preview
  confirm-text="操作"
  value="￥2400.00"
  title="付款金额"
  :rows="rows"
/>
```

## Props

### cancelText

* Type: `string`
* Default: `取消`

取消按钮文字。

### confirmText

* Type: `string`
* Default: `确定`

确定按钮文字。

### rows

* Type: `object[]`

预览数据项。

### showCancel

* Type: `boolean`
* Default: `false`

是否显示取消按钮。

### title

* Type: `string`

标题。

### value

* Type: `string`

显示数据。

## Events

### onCancel

* Parameter: `$event`

点击取消按钮事件

### onConfirm

* Parameter: `$event`

点击确定按钮事件
