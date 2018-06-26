# Panel

> 面板

## 引入

``` js
import MpPanel from 'mp-weui/packages/panel'

export default {
  components: {
    MpPanel
  }
}
```

## 示例

定义数据项，图文组合列表

``` js
this.dataSource = [
  {
    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    icon: base64.icon60,
    title: '标题一'
  },
  {
    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    icon: base64.icon60,
    title: '标题一',
    url: '/abc'
  }
]
```

定义数据项，文字组合列表

``` js
this.dataSource = [
  {
    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    meta: ['文字来源', '时间', { value: '其它信息', divider: true }],
    title: '标题一',
  },
  {
    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    meta: ['文字来源', '时间', { value: '其它信息', divider: true }],
    title: '标题一',
  }
]
```

使用

``` html
<mp-panel
  :data-source="dataSource"
  title="图文组合列表"
/>

<mp-panel
  :data-source="dataSource"
  title="文字组合列表"
  type="text"
/>
```

## Props

### dataSource

* Type: `object[]`

数据项。

### title

* Type: `string`

显示标题。

### type

* Type: `string`
* Default: `appmsg`
* Option: `appmsg`、`text`

类型。
