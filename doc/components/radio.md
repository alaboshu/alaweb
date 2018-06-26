# Radio

> 单选框列表

## 引入

``` js
import MpRadio from 'mp-weui/packages/radio'

export default {
  components: {
    MpRadio
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
<mp-radio
  v-model="radioValue"
  :options="options"
  :title="单选列表项"
/>
```

## Props

### options

* Type: `object[]`

数据项。

### title

* Type: `string`

标题，显示在列表上方。

### value

* Type: `string`

绑定值。
