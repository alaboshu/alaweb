# Slider

> 滑块

## 引入

``` js
import MpSlider from 'mp-weui/packages/slider'

export default {
  components: {
    MpSlider
  }
}
```

## 示例

基础使用

``` html
<mp-slider v-model="value" />
```

禁用

``` html
<mp-slider
  show-value
  value="30"
  disabled
/>
```

## Props

### activeColor

* Type: `string`
* Default: `#1aad19`

已选择的颜色。

### backgroundColor

* Type: `string`
* Default: `#e9e9e9`

背景条颜色。

### blockColor

* Type: `string`
* Default: `#ffffff`

滑块的颜色。

### disabled

* Type: `boolean`
* Default: `false`

是否禁用。

### max

* Type: `number`
* Default: `100`

最大值。

### min

* Type: `number`
* Default: `0`

最小值。

### showValue

* Type: `boolean`
* Default: `false`

是否显示当前 value。

### size

* Type: `number`
* Default: `28`

滑块的大小，取值范围为 12 - 28。

### step

* Type: `number`
* Default: `1`

步长，取值必须大于 0，并且可被(max - min)整除。

### value

* Type: `number`

绑定值。

## Events

### change

* Parameter: `$event`

拖动过程中触发的事件。
