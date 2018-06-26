# Progress

> 进度条

## 引入

``` js
import MpProgress from 'mp-weui/packages/progress'

export default {
  components: {
    MpProgress
  }
}
```

## 示例

显示进度

``` html
<mp-progress :percent="50" />
```

显示取消按钮

``` html
<mp-progress
  :percent="80"
  show-cancel
/>
```

## Props

### animate

* Type: `boolean`
* Default: `false`

是否开启动画。

### animateMode

* Type: `string`
* Default: `forwards`
* Option: `backwards`、`forwards`

动画播放模式，`backwards` ：动画从头播；`forwards` ：动画从上次结束点接着播。

### backgroundColor

* Type: `string`
* Default: `#ebebeb`

进度条背景颜色。

### cancelSize

* Type: `number`
* Default: `22`

取消按钮尺寸。

### color

* Type: `string`
* Default: `#09bb07`

进度条颜色。

### percent

* Type: `number`

进度百分比 0 - 100 。

### showCancel

* Type: `boolean`
* Default: `false`

是否显示取消按钮。

### showInfo

* Type: `boolean`
* Default: `false`

是否在进度条右侧显示百分比。

### width

* Type: `number`
* Default: `3`

进度条线的宽度，单位 px 。

## Events

### onCancel

* Parameter: `$event`

点击取消按钮事件。
