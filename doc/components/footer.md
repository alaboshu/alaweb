# Footer

> 页脚

## 引入

``` js
import MpFooter from 'mp-weui/packages/footer'

export default {
  components: {
    MpFooter
  }
}
```

## 示例

``` html
<mp-footer text="copyright © mp-weui" />
```

## Props

### fixed

* Type: `boolean`
* Default: `false`

是否固定在页面底部。

### links

* Type: `object[]`
* Default: `[]`

显示底部链接，`object` 格式为 `{ link: string, text: string }`。

### text

* Type: `string`

显示文本。
