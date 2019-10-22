import convert from './convert.js'
import api from '@/service/api'
import crud from '@/service/crud'
// 所有的表单数据只从api/auto/form中获取，api/auto/save保存,统一
export default {
  async getForm (type, widget, route) {
    var para = {}
    if (type) {
      para.type = type
    } else if (route) {
      para.type = crud.getType(route)
    }
    if (!type) {
      api.toastWarn('表单type不存在,请传入')
    }
    var id = route.id
    if (id) {
      para = {
        ...para,
        id: id
      }
    }
    var response = await api.httpGet('/Api/Auto/Form', para)
    if (response.status === 1) {
      api.info('服务器返回信息', response.result)
      var result = convert.toConfig(response.result)
      return result
    } else {
      api.toastWarn(response.message)
    }
  },
  // 视图数据赋值
  getModel (autoFormConfig) {
    var formModel = {}
    console.info('应该就是你来', autoFormConfig)
    if (autoFormConfig && autoFormConfig.groups) {
      autoFormConfig.groups.forEach(group => {
        group.items.forEach(element => {
          if (!api.isEmpty(element.value)) {
            formModel[element.field] = element.value
          }
        })
      })
    }
    return formModel
  }
}
