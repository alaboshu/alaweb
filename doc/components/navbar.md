# Navbar

> 顶部选项卡

## 引入

``` js
import MpNavbar from 'mp-weui/packages/navbar'

export default {
  components: {
    MpNavbar
  }
}
```

## 示例

``` html
<mp-navbar
  v-model="activeIndex"
  :columns="columns"
>
  <mp-navbar-panel
    :active-index="activeIndex"
    :index="0"
  >
    选项一的内容
  </mp-navbar-panel>
  <mp-navbar-panel
    :active-index="activeIndex"
    :index="1"
  >
    选项二的内容
  </mp-navbar-panel>
  <mp-navbar-panel
    :active-index="activeIndex"
    :index="2"
  >
    选项三的内容
  </mp-navbar-panel>
</mp-navbar>
```

::: warning 特别说明
由于 mpvue [暂不支持组件嵌套](https://trello.com/c/UKF5tFv9/34-%E6%94%AF%E6%8C%81%E6%9B%B4%E5%A4%8D%E6%9D%82%E7%9A%84-slot)，所以上述方式暂不适用，具体使用请参考[示例代码](https://github.com/youngluo/mp-weui/blob/master/src/pages/navbar/index.vue)。
:::

## Props

**Navbar**

### columns

* Type: `string[]`
* Default: `[]`

选项卡标题。

### sliderWidth

* Type: `number`
* Default: `96`

滑块宽度。

### value

* Type: `number`
* Default: `0`

当前选项卡索引值。

**NavbarPanel**

### activeIndex

* Type: `number`
* Default: `0`

当前选中内容面板索引。

### index

* Type: `number`

选项卡内容面板索引。

## Slot

**Navbar**

### --

显示内容。
