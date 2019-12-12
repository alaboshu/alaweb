// zk-product-list组件，所有的属性为空是不过滤
let props = {
  widget: {
    styleStype: {
      type: String,
      default: '1'
    }, // 风格样式
    keyword: {
      type: String
    }, // 搜索关键字
    classIds: {
      type: Array
    }, // 商品分类,支持多个
    tagIds: {
      type: Array
    }, // 商品标签,支持多个
    priceStyleId: {
      type: String,
      default: 'E0000000-1478-49BD-BFC7-E73A5D699000'
    }, // 商城模式
    count: {
      type: Number,
      default: 0
    }, // 数量,指定数量显示，指定数量显示时不分页
    isPage: {
      type: Boolean,
      default: true
    }, // 是否分页加载，是的时候下拉刷新加载更多
    sortOrder: {
      type: Number,
      default: 0 // 0 默认排序 1价格 2时间 3查看次数 4销量 5 喜欢数量 6 收藏数量
    },
    orderType: {
      type: Number,
      default: 0 //  0升序，1降序
    } // 排序方式
  }
}

export default props
