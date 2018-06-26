# Checklist

> 复选框列表

## 引入

``` js
import MpChecklist from 'mp-weui/packages/checklist'

export default {
  components: {
    MpChecklist
  }
}
```

## 示例

定义数据项

``` js
this.options = [
  {
    label: '被禁用',
    value: 'A',
    disabled: true
  },
  {
    label: '选项B',
    value: 'B'
  },
  {
    label: '选项C',
    value: 'C'
  }
]
```

使用

``` html
<mp-checklist
  v-model="checkboxValue"
  :title="复选列表项"
  :options="options"
/>
```

## Props

### max

* Type: `number`

最多可选个数，超过后其他未选择的选项变成禁用状态。

### options

* Type: `object[]`

数据项。

### title

* Type: `string`

标题，显示在列表上方。

### value

* Type: `array`

绑定值。
