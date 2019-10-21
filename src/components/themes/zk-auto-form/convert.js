export default {
  // 将服务器数据格式转换成zk-auto-form所需要的格式
  async toConfig (config) {
    if (!config.tooltip) {
      config.tooltip = {}
    }
    if (config && config.groups.length > 1) {
      config = this.toTabConfig(config)
    } else {
      config = this.toNoTabConfig(config)
    }
    return config
  },
  async toTabConfig (serviceConfig) {
    var formConfig = {}
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
    if (serviceConfig) {
      serviceConfig.columns = serviceConfig.groups[0].items
    }
    console.info('处理后的表单信息', serviceConfig)
    return serviceConfig
  }
}
