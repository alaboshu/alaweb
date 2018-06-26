# Loadmore

> 加载更多

## 引入

``` js
import MpLoadmore from 'mp-weui/packages/loadmore'

export default {
  components: {
    MpLoadmore
  }
}
```

## 示例

显示 loading

``` html
<mp-loadmore type="loading" />
```

当数据为空时显示文本

``` html
<mp-loadmore not-content="暂无数据" />
```

## Props

### loadingText

* Type: `string`
* Default: `正在加载`

当 `type` 为 `loading` 时，可自定义显示文本。

### notContent

* Type: `string`
* Default: `暂无数据`

当 `type` 为 `line` 时，当数据为空时显示的内容。

### type

* Type: `string`
* Default: `line`
* Option: `line`、`lineDot`、`loading`

类型。
