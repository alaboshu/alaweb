# Agree

> 同意复选框

## 引入

``` js
import MpAgree from 'mp-weui/packages/agree'

export default {
  components: {
    MpAgree
  }
}
````

## 示例

``` html
<mp-agree
  url-text="《相关条款》"
  v-model="isAgree"
  url="/abc"
/>
```

## Props

### label

* Type: `string`
* Default: `阅读并同意`

说明文字。

### url

* Type: `string`

显示链接。

### urlText

* Type: `string`

显示链接文本。

### value

* Type: `boolean`

当前值。
