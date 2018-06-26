# Grid

> 九宫格

## 引入

``` js
import MpGrid from 'mp-weui/packages/grid'

export default {
  components: {
    MpGrid
  }
}
```

::: tip 提示
必须与 `GridGroup` 配合使用。
:::

## 示例

``` html
<mp-grid-group>
  <mp-grid
    icon-src="/static/images/icon_tabbar.png"
    label="Grid"
  />
</mp-grid-group>
```

::: warning 特别说明
由于 mpvue [暂不支持组件嵌套](https://trello.com/c/UKF5tFv9/34-%E6%94%AF%E6%8C%81%E6%9B%B4%E5%A4%8D%E6%9D%82%E7%9A%84-slot)，所以上述方式暂不适用，具体使用请参考[示例代码](https://github.com/youngluo/mp-weui/blob/master/src/pages/grid/index.vue)。
:::

## Props

### href

* Type: `string`

跳转链接。

### iconSrc

* Type: `string`

图标链接。

### label

* Type: `string`

说明文字。

## Events

### click

* Parameter: `$event`

点击事件。
