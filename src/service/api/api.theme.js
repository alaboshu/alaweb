import {
  THEME_GETPAGE_GET
} from '@/service/api/apiUrl'
import {
  api
} from '@/service/api'

export default {
  async pageInfo (clientType, path) {
    var result = {
      widgets: {},
      title: ''
    }
    var response = await api.get(THEME_GETPAGE_GET, 'clientType=' + clientType + '&url=' + path)
    console.info(path + '页信息', response)
    if (response !== null) {
      result.title = response.title
      if (response.layouts.lenth >= 1) {
        result.widgets = response.layouts[0].widgets
      }
    }
    return result
  },
  async widgetInfo (widget, config) {
    // console.info('模块信息', widget)
    // console.info('配置数据', config)
    var result = {
      path: config.path,
      widgetId: config.widgetId,
      dataId: config.dataId,
      apiUrl: config.apiUrl,
      value: null
    }
    if (widget !== null && widget !== undefined) {
      result.apiUrl = widget.apiUrl
      result.dataId = widget.dataId
      result.value = widget.value
    }
    if (result.value === null || result.value === undefined) {
      // 从数据库中获取数据
      var response = await api.get(result.apiUrl, 'dataId=' + result.dataId)
      // console.info('请求数据', response)
      result.value = response
    }
    console.info(result.path + '数据', result)
    return result
  }
}
