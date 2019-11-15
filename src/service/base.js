import api from '@/service/api'
import help from '@/service/core/helper'
export default {
  // 判断是生成环境还是开发环境
  isBuild () {
    if (process.env.NODE_ENV === 'development') {
      return false
    } else {
      return true
    }
  },
  isDiy () {
    if (process.env.ZK_DIY === 'true') {
      return true
    } else {
      return false
    }
  },
  diy (widget) {
    if (this.isDiy() && !help.isEmpty(widget)) {
      var diyWidget = {
        'component-path': widget.componentPath,
        'data-id': widget.dataId,
        'widget-id': widget.widgetId
      }
      return diyWidget
    }
    return null
  },
  // 当前页面的完整路径
  fullPath () {
    var pages = getCurrentPages()
    var fullPath
    if (api.client() === 'WeChatLite') {
      fullPath = 'http://192.168.1.121:2001/' + pages[0].route
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
  },
  to (toPages) {
    if (toPages.indexOf('/pages/tabbar') > -1) {
      uni.switchTab({
        url: toPages
      })
    } else {
      uni.navigateTo({
        url: toPages
      })
    }
  },
  /**
   * 返回按钮， 
   * 默认返回上一级
   * 可以设计返回级数
   * 超出则返回首页
   * 
   * 
   */
  back (delta = 1) {
    var historys = api.vuexLocalGet('historys_record_links')
    if (historys && historys.length > 0 && delta <= historys.length) {
      var data
      data.to = historys[delta - 1]
      if (delta === historys.length) {
        data.isTab = true
      }
      this.to(data, false)
      var dataModel = JSON.parse(JSON.stringify(historys))
      for (let i = 0; i < dataModel.length; i++) {
        if (i < delta) {
          dataModel.splice(i, 1)
        }
      }
      api.vuexLocalSet('historys_record_links', dataModel)
    } else {
      uni.switchTab({
        url: '/'
      })
    }
  }
}
