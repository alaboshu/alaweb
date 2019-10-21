export default {
  // 将服务器数据格式转换成zk-auto-form所需要的格式
  async toConfig (serviceConfig) {
    var config
    if (serviceConfig && serviceConfig.groups.length > 1) {
      config = this.toTabConfig(serviceConfig)
    } else {
      config = this.toNoTabConfig(serviceConfig)
    }
    return config
  },
  async toTabConfig (serviceConfig) {
    var formConfig = {}
    formConfig.config = {
      name: serviceConfig.name,
      title: serviceConfig.title,
      bottonText: serviceConfig.bottonText,
      apiUrl: serviceConfig.service.postApi,
      successReturn: serviceConfig.service.successReturn
    }
    formConfig.list = []
    var tab = {
      type: 'tab',
      name: '标签',
      columns: [],
      icon: '',
      options: {},
      key: 590,
      model: 'tab_599',
      rules: ''
    }
    serviceConfig.groups.forEach(colunms => {
      var colunmsList = {
        name: colunms.groupName,
        list: []
      }
      colunms.items.forEach(items => {
        var item = {}
        item.dataSource = items.dataSource
        item.value = items.value
        item.type = items.type
        item.name = items.name
        item.icon = items.icon
        item.helpBlock = items.helpBlock
        item.model = items.field
        item.options = {
          placeholder: items.placeHolder
        }
        item.rules = items.rules
        colunmsList.list.push(item)
      })
      tab.columns.push(colunmsList)
    })
    //   formConfig.config.name’
    formConfig.list.push(tab)
    return formConfig
  },
  async toNoTabConfig (serviceConfig) {
    var autoFormConfig = {}
    if (serviceConfig) {
      autoFormConfig.config = {
        bottonText: serviceConfig.bottonText,
        name: serviceConfig.name,
        title: serviceConfig.title,
        alertText: serviceConfig.alertText,
        buttomHelpText: serviceConfig.buttomHelpText
      }
      autoFormConfig.list = []
      serviceConfig.groups[0].items.forEach((item, itemIndex) => {
        var objectItem = {
          type: item.type,
          name: item.name,
          dataSource: item.dataSource,
          model: item.field,
          helpBlock: item.helpBlock,
          rules: item.rules,
          icon: item.icon,
          value: item.value,
          jsonItems: item.jsonItems,
          options: {
            placeholder: item.placeHolder,
            sortOrder: item.sortOrder,
            editShow: item.editShow,
            listShow: item.listShow,
            required: item.required,
            validType: item.validType,
            width: item.width,
            maxlength: item.maxlength,
            minLength: item.minLength
          }
        }
        autoFormConfig.list.push(objectItem)
      })
    }
    console.info('表单信息', autoFormConfig)
    return autoFormConfig
  }
}
