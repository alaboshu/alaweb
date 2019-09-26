import api from '@/service/api.js'
export default {
  // 获取widget中的值，根据path
  async getByPath (widgets, path) {
    var widget = null
    for (var i = 0; i < widgets.length; i++) {
      var item = widgets[i]
      if (item.componentPath === path) {
        widget = item
      }
    }
    return widget
  },
  /// 加载所有的地址保存到缓存中去
  async loadAllAddress () {
    var address = {
      province: '',
      city: '',
      area: ''
    }
    address.province = await api.httpGet('/Api/Region/GetRegionData', {
      level: 2
    })
    address.city = await api.httpGet('/Api/Region/GetRegionData', {
      level: 3
    })
    address.area = await api.httpGet('/Api/Region/GetRegionData', {
      level: 4
    })
    // api.localSet('addressData', address)
    return address
  }
}
