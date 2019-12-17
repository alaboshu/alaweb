import api from '@/service/api'
export default {
  to (url) {
    url = this.convertUrl(url)
    if (url.indexOf('/pages/tabbar') > -1) {
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
  },
  backUrl () {
    var historys = api.vuexLocalGet('browse_historys')
    var url = '/pages/tabbar/index'
    var currentUrl = historys[0]
    // 登录页面后退
    if (currentUrl.indexOf('user_login') > -1) {
      url = '/pages/tabbar/index'
    }
    if (historys && historys.length > 1) {
      url = historys[1]
    }
    return url
  },
  back () {
    var url = this.backUrl()
    var historys = api.vuexLocalGet('browse_historys')
    if (url.indexOf('/pages/tabbar') > -1 || url === '/' || url.indexOf('pages/tabbar') > -1) {
      // 兼容小程序跳转
      if (api.client() === 'WeChatLite' && url.indexOf('pages/tabbar') > -1) {
        url = '/' + url
      }
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
    historys.splice(0, 1)
    api.vuexLocalSet('browse_historys', historys)
  },
  // 历史记录
  add (url) {
    var historys = api.vuexLocalGet('browse_historys')
    if (!historys) {
      historys = []
    } else {
      historys = historys.filter(r => r !== url)
    }
    historys.unshift(url)
    if (historys.length > 10) {
      historys.pop()
    }
    api.vuexLocalSet('browse_historys', historys)
  },
  convertUrl (url) {
    if (url.indexOf('/tabbar') > -1 || url.indexOf('/pages/index') > -1) {
      return url
    } else {
      var showSplit
      var toPagesUrl = url
      if (url.indexOf('?') > -1) {
        toPagesUrl = url.split('?')[0]
        showSplit = url.split('?')[1]
      }
      var linkSplit = toPagesUrl.split('/')
      url = '/pages/index?path='
      if (linkSplit.length === 2) {
        url += linkSplit[1]
      } else if (linkSplit.length === 3) {
        url += linkSplit[1] + '_' + linkSplit[2]
      } else if (linkSplit.length === 4) {
        url += linkSplit[1] + '_' + linkSplit[2] + '_' + linkSplit[3]
      }
      if (showSplit) {
        url += `&${showSplit}`
      }
      return url
    }
  }
}
