import Vue from 'vue'
export default {

  // 记录十条页面跳转信息,只做数据记录
  histModel () {
    var historys = Vue.prototype.$api.vuexLocalGet('historys_record_links')
    var pageView = Vue.prototype.$base.fullPath()
    console.info('pageView', pageView)
    var pageIndex = pageView.indexOf('/pages')
    var pageLast = pageView.lenght
    var hisRoute = pageView.substr(pageIndex, pageLast)
    var addPath = true
    if (historys && historys.length > 0) {
      for (let i in historys) {
        if (historys[i] === hisRoute) {
          addPath = false
          historys.splice(0, 0, historys.splice(i, 1)[0])
        }
      }
      if (addPath && historys.length < 10) {
        historys.unshift(hisRoute)
      } else if (addPath) {
        historys.splice(historys.length - 1, 1)
        historys.unshift(hisRoute)
      }
    } else if (historys === null) {
      historys = []
      historys.push(hisRoute)
    }
    Vue.prototype.$api.vuexLocalSet('historys_record_links', historys)
    addPath = true
  },
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
