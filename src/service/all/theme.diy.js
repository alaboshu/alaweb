import api from '@/service/api'
import Vue from 'vue'

export default {
  async page(clientType, path) {
    var result = {
      layouts: {},
      title: ''
    }
    if (path === '/') {
      path = '/pages/index'
    }
    var para = {
      clientType: clientType,
      url: path
    }
    var response = await api.get('/api/theme/getpageinfo', para)
    if (response !== null) {
      result.title = response.title
      if (response.layouts.length >= 1) {
        result.layouts = response.layouts
      }
    }
    return result
  },

  // 模块信息,para 为附加参数
  async widget(widget, config, appendPara) {
    var result = {
      path: config.path,
      widgetId: config.WidgetId,
      dataId: config.DataId,
      defaultDataId: config.DataId,
      apiUrl: config.ApiUrl,
      value: null
    }
    if (widget !== null && widget !== undefined) {
      result.apiUrl = widget.apiUrl
      result.dataId = widget.dataId
      result.widgetId = widget.widgetId
      result.value = widget.widgetValue
    }
    if (result.value === null || result.value === undefined) {
      // 从数据库中获取数据
      if (result.apiUrl === null) {} else {
        var loginUserId = 0
        if (Vue.prototype.$user.loginUser !== undefined && Vue.prototype.$user.loginUser !== null) {
          loginUserId = Vue.prototype.$user.loginUser.id
        }
        var para = {
          dataId: result.dataId,
          widgetId: result.widgetId,
          defaultDataId: result.defaultDataId,
          // 以下为额外参数
          userId: loginUserId,
          ...appendPara // 附加参数
        }
        var response = await api.get(result.apiUrl, para)
        result.value = response
      }
    }
    return result
  }
}
