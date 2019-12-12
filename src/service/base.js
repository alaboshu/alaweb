import api from '@/service/api'
export default {
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
      fullPath = 'http://localhost:2000/' + pages[0].route
    } else {
      fullPath = location.href
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
  }
}
