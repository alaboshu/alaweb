import api from '@/service/api'
import screen from '@/service/utils/screen'
export default {
  // 屏幕宽度
  screenWidth () {
    return screen.width()
  },
  // 屏幕高度
  screenHeight () {
    return screen.height()
  },
  getSystemInfoSync () {
    return screen.getSystemInfoSync()
  },
  // 判断是生成环境还是开发环境
  isBuild () {
    if (process.env.NODE_ENV === 'development') {
      return false
    } else {
      return true
    }
  },
  // 完整路径
  fullPath () {
    var pages = getCurrentPages()
    var fullPath
    if (api.client() === 'WeChatLite') {
      fullPath = pages[pages.length - 1].route
      var path = this.parseParams(pages[pages.length - 1].options)
      if (path) {
        fullPath = `${pages[pages.length - 1].route}?${path}`
      }
    } else {
      fullPath = pages[0].$route.fullPath
    }
    return fullPath
  },

  // 实际页面路径
  path (option) {
    var path = null
    // 当前访问页面
    if (option && option.length > 0) {
      path = option[0].path
    }

    if (!path) {
      path = '/pages/index'
    }
    path = path
      .replace('_', '/')
      .replace('_', '/')
      .replace('_', '/')
    if (path.substr(0, 1) !== '/') {
      path = '/' + path
    }
    if (path === '/') {
      path = '/pages/index'
    }
    if (path === '/index') {
      path = '/pages/index'
    }
    path = path.replace('pages/', '')
    path = path.replace('/pages', '')
    path = path.replace('/views', '')
    path = path.replace('views/', '')
    var index = path.indexOf('?')
    if (index > 0) {
      path = path.substr(0, index)
    }
    return path
  },
  // 处理路由拼接
  parseParams (data) {
    try {
      var tempArr = []
      for (var i in data) {
        var key = encodeURIComponent(i)
        var value = encodeURIComponent(data[i])
        tempArr.push(key + '=' + value)
      }
      var urlParamsStr = tempArr.join('&')
      return urlParamsStr
    } catch (err) {
      return null
    }
  }
}
