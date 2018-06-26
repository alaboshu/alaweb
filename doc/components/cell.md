# Cell

> 单元格，可用作列表信息展示

## 引入

``` js
import MpCell from 'mp-weui/packages/cell'

export default {
  components: {
    MpCell
  }
}
```

::: tip 提示
必须与 `CellGroup` 配合使用。
:::

## 示例

带说明的列表项

``` html
<mp-cell-group title="带说明的列表项">
  <mp-cell
    content="标题文字"
    label="说明文字"
  />
</mp-cell-group>
```

带图标、说明的列表项

``` html
<mp-cell-group title="带图标、说明的列表项">
  <mp-cell
    :icon-src="icon"
    content="标题文字"
    label="说明文字"
  />
</mp-cell-group>
```

带跳转的列表项

``` html
<mp-cell-group title="带跳转的列表项">
  <mp-cell
    content="标题文字"
    href="/weui"
  />
</mp-cell-group>
```

::: warning 特别说明
由于 mpvue [暂不支持组件嵌套](https://trello.com/c/UKF5tFv9/34-%E6%94%AF%E6%8C%81%E6%9B%B4%E5%A4%8D%E6%9D%82%E7%9A%84-slot)，所以上述方式暂不适用，具体使用请参考[示例代码](https://github.com/youngluo/mp-weui/blob/master/src/pages/list/index.vue)。
:::

## Props

### content

* Type: `string`

显示内容。

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
