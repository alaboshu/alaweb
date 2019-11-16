export default {

  // 记录十条页面跳转信息,只做数据记录
  histModel (jsThis) {
    var historys = jsThis.$api.vuexLocalGet('historys_record_links')
    var pageView = jsThis.$base.fullPath()
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
    jsThis.$api.vuexLocalSet('historys_record_links', historys)
    addPath = true
  }
}
