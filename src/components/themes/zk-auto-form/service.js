import api from '@/service/api'
// 所有的表单数据只从api/auto/form中获取，api/auto/save保存,统一
export default {
  // 视图数据赋值
  getModel (autoFormConfig, dataModel) {
    var formModel = {}
    // 优先从数据库中赋值
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
    // 从
    if (autoFormConfig && autoFormConfig.columns) {
      autoFormConfig.columns.forEach(group => {
        if (group.field === 'parentUserName') {
          formModel[group.field] = group.value
        }
      })
    }


    // 从URL中获取的数据
    if (dataModel) {
      if (autoFormConfig && autoFormConfig.columns) {
        autoFormConfig.columns.forEach(group => {
          if (group.columns) {
            group.columns.forEach(element => {
              var value = dataModel[element.field]
              if (!api.isEmpty(value)) {
                formModel[element.field] = value
              }
            })
          } else {
            var value = dataModel[group.field]
            if (!api.isEmpty(value)) {
              formModel[group.field] = value
            }
          }
        })
      }
    }

    return formModel
  }
}
