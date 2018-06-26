# Message

> 提示页

## 引入

``` js
import MpMessage from 'mp-weui/packages/message'

export default {
  components: {
    MpMessage
  }
}
```

## 示例

``` html
<mp-message
  confirm-text="推荐操作"
  cancel-text="辅助操作"
  content="内容详情"
  title="操作成功"
  show-cancel
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

### content

* Type: `string`

显示内容。

### showCancel

* Type: `boolean`
* Default: `false`

是否显示取消按钮。

### title

* Type: `string`

标题。

### type

* Type: `string`
* Default: `success`
* Option: `success`、`error`

类型。
