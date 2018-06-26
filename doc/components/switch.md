# Switch

> 开关

## 引入

``` js
import MpSwitch from 'mp-weui/packages/switch'

export default {
  components: {
    MpSwitch
  }
}
````

## 示例

使用

``` html
<mp-switch
  title="标题文字"
  v-model="value"
/>
```

禁用

``` html
<mp-switch
  title="标题文字"
  v-model="value"
  disabled
/>
```

## Props

### disabled

* Type: `boolean`
* Default: `false`

是否禁用。

### isInCell

* Type: `boolean`
* Default: `true`

是否在列表单元格中显示。

### title

* Type: `string`

标题，如果 isInCell 为 true，则显示在最左边。

### value

* Type: `boolean`

绑定值。
