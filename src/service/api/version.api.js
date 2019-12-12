import api from '@/service/api.js'

export default {
  // 获取类型的keyvalues对象 // 优先从Url中获取数据
  async checkVersion(type, apiUrl) {
    if (apiUrl) {
      var respone = await api.httpGet(apiUrl)
      if (respone.status === 1) {
        return respone.result
      }
    } else {
      var para = {
        type: type
      }
      respone = await api.httpGet('/Api/Type/GetKeyValue', para)
      if (respone.status === 1) {
        return respone.result
      }
    }
  }
}
