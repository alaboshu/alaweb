// zk-list的结构以及所实现的功能已比较复杂，具有超高难度
// 为了减低维护成本，在没有认真了解属性之前 请勿轻易新增属性，
// 请勿轻易新增属性，以下属性基本上能够满足绝大部分需求了，有其他的需求可以在外部控制
let props = {
  widget: {}, // 数据类型Type、过滤方式filter、标题等信息，通过diy方式传过来
  type: {
    type: String,
    required: false
  }, // 类型必须填写，通过Type和后台Api/Auto/List来获取数据
  pageSize: {
    type: Number,
    default: 10
  },
  isTemplate: {
    type: Boolean,
    default: false
  }, // 是否模板显示,原则上zk-list可以显示任何样式的内容包括
  isShowPage: {
    type: Boolean,
    default: true
  } // 是否显示分页,
}

export default props
