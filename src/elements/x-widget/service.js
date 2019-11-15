export default {

  // 记录十条页面跳转信息,只做数据记录
  histModel (jsThis) {
    var pageView = jsThis.$base.fullPath()
    var hisRoute = pageView.substr(pageView.indexOf('/pages'), pageView.lenght - 1)
    var historys = jsThis.$api.vuexLocalGet('historys_record_links')
    if (historys && historys.length > 0) {
      historys.forEach((item, index) => {
        if (item === hisRoute) {
          historys.unshift(historys.splice(index, 1)[0])
        } else if (historys.length <= 10) {
          historys.unshift(hisRoute)
        } else {
          historys.splice(historys.length - 1, 1)
          historys.unshift(hisRoute)
        }
      })
    } else {
      historys = []
      historys.push(hisRoute)
    }
    jsThis.$api.vuexLocalSet('historys_record_links', historys)
  }
}
