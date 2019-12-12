import user from '@/service/user'
import api from '@/service/api'
export default {
  to (url) {
    url = this.getCurrentPath(url)
    if (url.indexOf('/pages/tabbar') > -1) {
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
    this.historys(url)
  },
  back (url) {
    var historys = this.vuexLocalGet('browse_historys')
    if (url === 'login' && user.isLogin() === false) {
      uni.reLaunch({
        url: '/pages/tabbar/index'
      })
      return false
    }
    if (historys && historys.length > 1) {
      if (url === '/pages/user?path=order_show') {
        this.to('/pages/index?path=order_index')
      } else if (url === '/pages/user?path=order_index') {
        this.to('/pages/user/index', true)
      } else if (url === 'login' && user.isLogin() === false) {
        uni.navigateBack({
          delta: 1
        })
      } else {
        if (getCurrentPages().length === 1) {
          uni.reLaunch({
            url: '/pages/tabbar/index'
          })
        } else {
          if (this.client() === 'AppPlus') {
            uni.navigateBack({
              delta: 1
            })
          } else {
            if (
              getCurrentPages()[getCurrentPages().length - 1] &&
              getCurrentPages()[getCurrentPages().length - 1].option &&
              getCurrentPages()[getCurrentPages().length - 1].option.path ===
              'user_login'
            ) {
              var historys = this.vuexLocalGet('browse_historys')
              var backUrl = historys[historys.length - 1]
              uni.reLaunch({
                url: backUrl
              })
            } else {
              uni.navigateBack({
                delta: 1
              })
            }
          }
        }
      }
    } else {
      uni.reLaunch({
        url: '/pages/tabbar/index'
      })
    }
  },
  // 历史记录，保留5条
  historys (url) {
    var historys = api.vuexLocalGet('browse_historys')
    if (!historys) {
      historys = []
      historys[0] = url
      this.vuexLocalSet('browse_historys', historys)
    } else {
      historys[historys.length] = url
      if (historys.length > 5) {
        historys.splice(0, 1)
      }
      this.vuexLocalSet('browse_historys', historys)
    }
  },
  getCurrentPath (toPages) {
    var url
    var toPagesUrl = toPages
    var showSplit
    if (toPages.indexOf('?') > -1) {
      toPagesUrl = toPages.split('?')[0]
      showSplit = toPages.split('?')[1]
    }
    if (toPagesUrl.indexOf('/tabbar') === -1) {
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
    } else {
      url = toPages
    }
    return url
  }
}
