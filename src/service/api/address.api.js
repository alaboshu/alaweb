import api from '@/service/api.js'
export default {
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
