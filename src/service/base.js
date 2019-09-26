import api from '@/service/api'
import help from '@/service/core/helper'
import config from '@/service/config'
import crypto from '@/utils/crypto'
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
  // 当前租户
  tenant () {
    if (!api.isEmpty(api.localGet('tenant_sign'))) {
      return JSON.parse(
        crypto.decrypt(crypto.utf8(crypto.base64(api.localGet('tenant_sign'))))
      )
    } else {
      return null
    }
  },
  // 判断缓存是否有租户信息
  isHaveTenant (tenant) {
    if (tenant) {
      if (api.localGet('tenant_sign')) {
        if (
          crypto.encrypt(JSON.stringify(tenant)) !== api.localGet('tenant_sign')
        ) {
          api.localSet('tenant_sign', crypto.encrypt(JSON.stringify(tenant)))
        }
      } else {
        api.localSet('tenant_sign', crypto.encrypt(JSON.stringify(tenant)))
      }
    }
  },
  // 是否启用租户模式
  isTenant () {
    return config.isTenant
  },
  // 是否为管理员后台租户信息，处理s2b2c模式的时候需要用到
  isAdminTenant (widget) {
    var isTenant = false
    if (
      widget &&
      widget.route &&
      widget.route.path &&
      widget.route.path.indexOf('admin') !== -1
    ) {
      isTenant = true
    }
    return isTenant
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
    if (api.isEmpty(path)) {
      if (!api.isEmpty(option)) {
        path = option.path
      }
    }

    if (api.isEmpty(path)) {
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
