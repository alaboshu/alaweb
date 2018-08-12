import {
  THEME_GETPAGE_GET
} from '@/service/api/apiUrl'
import {
  api
} from '@/service/api'

export default {
  async pageInfo (clientType, path) {
    var response = await api.get(THEME_GETPAGE_GET, 'clientType=' + clientType + '&url=' + path)
    // console.info(path + '页信息', response)
    return {
      widgets: response.layouts[0].widgets,
      title: response.title
    }
  },
  async widgetInfo (clientType, path) {
    var response = await api.get(THEME_GETPAGE_GET, 'clientType=' + clientType + '&url=' + path)
    console.info(path + '页信息', response)
    return {
      widgets: response.layouts[0].widgets,
      title: response.title
    }
  }
}
