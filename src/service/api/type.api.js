import api from '@/service/api.js'

export default {
  // 获取类型的keyvalues对象
  async getKeyValues (type) {
    var para = {
      type: type
    }
    var respone = await api.httpGet('/Api/Type/GetKeyValue', para)
    if (respone.status === 1) {
      return respone.result
    }
  }
}
