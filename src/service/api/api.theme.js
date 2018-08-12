import {
  THEME_GETPAGE_GET
} from '@/service/api/apiUrl'
import {
  api
} from '@/service/api'

export default {
  async pageInfo (clientType, path) {
    var response = await api.get(
      THEME_GETPAGE_GET,
      'clientType=' + clientType + '&url=' + path
    )
    // console.info(path + '页信息', response)
    return {
      widgets: response.layouts[0].widgets,
      title: response.title
    }
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
    if (result.value == null) {
      // 从数据库中获取数据
      var response = await api.get(result.apiUrl, 'dataId=' + result.dataId)
      result.value = response
    }
    console.info(result.path + '数据', result)
    return result
  }
}
