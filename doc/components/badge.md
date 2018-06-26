# Badge

> 徽章

## 引入

``` js
import MpBadge from 'mp-weui/packages/badge'

export default {
  components: {
    MpBadge
  }
}
````

## 示例

指定颜色

``` html
<mp-badge color="#888" />
```

指定文本

``` html
<mp-badge text="20" />
```

## Props

### color

* Type: `string`
* Default: `#e64340`

显示颜色。

### text

* Type: `string`

显示文本。

### wrapClassName

* Type: `string`

外层容器的类名。
