# Picker

> 选择器

## 引入

``` js
import MpPicker from 'mp-weui/packages/picker'

export default {
  components: {
    MpPicker
  }
}
```

## 示例

具体使用请参考[示例代码](https://github.com/youngluo/mp-weui/blob/master/src/pages/picker/index.vue)

单列选择器

``` html
<mp-picker
    v-model="value"
    :range="array"
  >
  <button type="default">单列选择器</button>
</mp-picker>
```

多列选择器

``` html
<mp-picker
  v-model="mValue"
  :range="mArray"
  multiple
>
  <button type="default">多列选择器</button>
</mp-picker>
```

## Props

### disabled

* Type: `boolean`
* Default: `false`

是否禁用。

### multiple

* Type: `boolean`
* Default: `false`

是否为多列选择，当为 `true` 时，`range` 为二维 `[]` 或者二维 `object[]` 。

### range

* Type: `[] | object[]`
* Default: `[]`

列表数据，当为 `object[]` 时，`object` 必须指定 `value` 键。

### rangeKey

* Type: `string`

当 `range` 是一个 `object[]` 时，通过 `rangeKey` 来指定 `object` 中 `key` 的值作为选择器显示内容。

## Events

### change

* Parameter: `value`

change事件。

## Slot

* --

自定义内容。
