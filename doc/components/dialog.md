# Dialog

> 对话框

## 引入

``` js
import Dialog from 'mp-weui/packages/dialog'
```

## 示例

传入一个对象

``` js
Dialog(options)
```

`Dialog` 提供了 `alert` 和 `confirm` 两个方法

`Dialog.alert` 使用方式

``` js
Dialog.alert(content)

Dialog.alert(content, title)

Dialog.alert(content, options)

Dialog.alert(content, title, options)
```

`Dialog.confirm` 使用方式

``` js
Dialog.confirm(content)

Dialog.confirm(content, title)

Dialog.confirm(content, options)

Dialog.confirm(content, title, options)
```

## Options

### cancelColor

* Type: `string`
* Default: `#000`

取消按钮文字颜色。

### cancelText

* Type: `string`
* Default: `取消`

取消按钮文字，最多 4 个字符。

### confirmColor

* Type: `string`
* Default: `#3cc51f`

确定按钮文字颜色。

### confirmText

* Type: `string`
* Default: `确定`

确定按钮文字，最多 4 个字符。

### content

* Type: `string`

提示内容。

### onCancel

* Type: `function(e)`

点击取消回调。

### onOk

* Type: `function(e)`

点击确定回调。

### showCancel

* Type: `Boolean`
* Default: `true`

是否显示取消按钮。

### title

* Type: `string`

提示标题。
