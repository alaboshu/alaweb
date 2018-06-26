# Field

> 表单输入

## 引入

``` js
import MpField from 'mp-weui/packages/field'

export default {
  components: {
    MpField
  }
}
```

::: tip 提示
必须与 `CellGroup` 配合使用。
:::

## 示例

``` html
<mp-cell-group title="表单">
  <mp-field
    placeholder="请输入qq"
    type="number"
    label="qq"
  />
  <mp-field
    placeholder="请输入手机号"
    label="手机号"
    type="number"
    vcode
  />
</mp-cell-group>
```

::: warning 特别说明
由于 mpvue [暂不支持组件嵌套](https://trello.com/c/UKF5tFv9/34-%E6%94%AF%E6%8C%81%E6%9B%B4%E5%A4%8D%E6%9D%82%E7%9A%84-slot)，所以上述方式暂不适用，具体使用请参考[示例代码](https://github.com/youngluo/mp-weui/blob/master/src/pages/field/index.vue)。

使用 `v-model` 可能会出现光标闪烁情况，请使用 `change` 事件代替。
:::

## Props

### autoHeight

* Type: `boolean`

是否自动增高。当 type 为 textarea 时生效，设置 autoHeight 时，style.height 不生效。

### confirmType

* Type: `string`
* Default: `done`
* Option: `send → 发送`、`search → 搜索`、`next → 下一个`、`go → 前往`、`done → 完成`

设置键盘右下角按钮的文字，当 type 为 textarea 时无效。

### cursorSpacing

* Type: `number`
* Default: `0`，当 type 为 textarea 时，默认为 `20`

指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离。

### disabled

* Type: `boolean`
* Default: `false`

是否禁用输入框。

### fields

* Type: `string`
* Default: `day`
* Option: `year`、`month`、`day`

日期选择器粒度，当 type 为 date 时有效。

### label

* Type: `string`

说明文字。

### maxlength

* Type: `number`
* Default: `-1`

最大输入长度，设置为 -1 时不限制最大长度。

### placeholder

* Type: `string`

输入框为空时占位符。

### state

* Type: `string`
* Option: `success`、`warning`、`error`

表单域状态。

### type

* Type: `string`
* Default: `text`
* Option: `text`、`number`、`idcard → 身份证输入键盘`、`digit → 带小数点的数字键盘`、`date`、`time`

input 类型。

### vcode

* Type: `boolean`
* Default: `false`

是否显示验证码。

### vcodeSrc

* Type: `string`

验证码图片地址。

### vcodeText

* Type: `string`
* Default: `获取验证码`

验证码显示文本。

## Events

### blur

* Parameter: `$event`

输入框失去焦点时触发事件

### focus

* Parameter: `$event`

输入框聚焦时触发事件

### change

* Parameter: `value`

输入框数据变化时触发事件
