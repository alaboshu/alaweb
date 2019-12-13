import Vue from 'vue'
export default {

  // 下拉刷新，只在最后一个是列表时触发
  scrollChange () {
    if (Vue.prototype.$refs.scrollItem) {
      var scrollItem = Vue.prototype.$refs.scrollItem
      if (scrollItem.$refs.widgetItem) {
        var swiperWidget = scrollItem.$refs.widgetItem[scrollItem.$refs.widgetItem.length - 1]
        if (swiperWidget.widget.name === 'zk-product-list') {
          swiperWidget.$refs.zkProductList.scrollView()
        }
      }
    }
  }
}
