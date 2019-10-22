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
  async toTabConfig (autoFormConfig) {
    var formConfig = autoFormConfig
    formConfig.columns = []
    if (autoFormConfig && autoFormConfig.groups) {
      autoFormConfig.groups.forEach(group => {
        var tab = {
          type: 'tab',
          name: group.groupName,
          columns: group.items
        }
        formConfig.columns.push(tab)
      })
    }
    formConfig.groups = null
    return formConfig
  },
  async toNoTabConfig (autoFormConfig) {
    if (autoFormConfig) {
      autoFormConfig.columns = autoFormConfig.groups[0].items
    }
    autoFormConfig.groups = null
    return autoFormConfig
  }
}
