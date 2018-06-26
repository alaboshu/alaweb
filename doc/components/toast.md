# Toast

> 消息提示框

## 引入

``` js
import Toast from 'mp-weui/packages/toast'
```

## 示例

基础用法，可指定 `duration`

``` js
Toast('提示信息', [duration])
```

传入一个对象

``` js
Toast(options)
```

`Toast` 提供了 `loading`、`success` 和 `close` 3个方法

执行 `Toast.loading` 返回 `close` 方法，用于手动关闭 `loading` ，也可以调用 `Toast.close`

``` js
Toast.loading() // 默认显示“数据加载中”

Toast.loading(message)
```

`Toast.success` 提示成功信息

``` js
Toast.success(message)
```

## Options

### duration

* Type: `number`
* Default: `1500`

提示延迟时间，单位毫秒。

### icon

* Type: `string`
* Option: `success`、`loading`、`none`

图标。

### image

* Type: `string`

自定义图标的本地路径，`image` 的优先级高于 `icon` 。

### mask

* Type: `boolean`
* Default: `true`

是否显示透明蒙层，防止触摸穿透。

### title

* Type: `string`

提示内容。
