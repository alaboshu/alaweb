# Actionsheet

> 弹出式菜单

## 引入

``` js
import MpActionsheet from 'mp-weui/packages/actionsheet'

export default {
  components: {
    MpActionsheet
  }
}
```

## 示例

`value` 为 `actions` 的索引值。

``` html
<mp-actionsheet
  :actions="actions"
  v-model="value"
>
  <button type="default">ActionSheet</button>
</mp-actionsheet>
```

## Props

### actions

* Type: `string[]`

菜单项数组，数组长度最大为 6 个。

### itemColor

* Type: `string`
* Default: `#000`

菜单项文字颜色。

### wrapClassName

* Type: `string`

外层容器的类名。

## Slot

### --

自定义显示内容。
