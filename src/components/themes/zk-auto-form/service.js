import api from '@/service/api'
// 所有的表单数据只从api/auto/form中获取，api/auto/save保存,统一
export default {
  // 视图数据赋值
  getModel (autoFormConfig) {
    var formModel = {}
    if (autoFormConfig && autoFormConfig.columns) {
      autoFormConfig.columns.forEach(group => {
        if (group.columns) {
          group.columns.forEach(element => {
            if (!api.isEmpty(element.value)) {
              formModel[element.field] = element.value
            }
          })
        }
      })
    }
    return formModel
  }
}
