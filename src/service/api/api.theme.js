import {
  THEME_GETPAGEINFO_GET
} from '@/service/api/apiUrl'
import {
  api
} from '@/service/api'

export default {
  async pageInfo (clientType, path) {
    var result = {
      layouts: {},
      title: ''
    }
    if (path === '/') {
      path = '/pages/index'
    }
    var response = await api.get(THEME_GETPAGEINFO_GET, 'clientType=' + clientType + '&url=' + path)
    // console.info(path + '页信息', response)
    if (response !== null) {
      result.title = response.title
      if (response.layouts.length >= 1) {
        result.layouts = response.layouts
      }
    }
    // console.info(path + '返回值', result)
    return result
  },
  async widgetInfo (widget, config) {
    // console.info('配置数据', config)
    var result = {
      path: config.Path,
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
      result.value = widget.value
    }
    console.info('widget_value', result.value)
    if (result.value === null || result.value === undefined) {
      // 从数据库中获取数据
      if (result.apiUrl === null) {
        console.error('模块的Property.js配置出错', result)
      } else {
        var para = {
          dataId: result.dataId,
          widgetId: result.widgetId,
          defaultDataId: result.defaultDataId
        }
        console.info('参数', para)
        var response = await api.get(result.apiUrl, para)
        console.info('请求数据', response)
        result.value = response
      }
    }
    // console.info(result.path + '数据', result)
    return result
  }
}
