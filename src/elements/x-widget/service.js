export default {

  // 下拉刷新，只在最后一个是列表时触发
  scrollChange (jsThis) {
    if (jsThis.$refs.scrollItem) {
      var scrollItem = jsThis.$refs.scrollItem
      if (scrollItem.$refs.widgetItem) {
        var swiperWidget = scrollItem.$refs.widgetItem[scrollItem.$refs.widgetItem.length - 1]
        if (swiperWidget.widget.name === 'zk-product-list') {
          if (jsThis.$api.client() === 'WeChatLite') {
            swiperWidget.$children[0].scrollView()
          } else {
            swiperWidget.$children[0].$children[0].scrollView()
          }
        }
      }
    }
  }
}
