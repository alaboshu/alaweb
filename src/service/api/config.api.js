import api from '@/service/api.js'
export default {
  /// 获取配置信息
  async get (name) {
    var para = {
      parameter: name
    }
    var response = await api.httpGet('/Api/AutoConfig/GetAutoConfig', para)
    if (response.status === 1) {
      return response.result
    }
  },
  /// 获取多条数据
  async list (name) {
    var para = {
      type: name
    }
    var response = await api.httpGet('/Api/AutoConfig/GetAutoConfigList', para)
    if (response.status === 1) {
      return response.result
    }
  },
  /// 获取多条数据
  async keyValue (name) {
    var para = {
      type: name
    }
    var response = await api.httpGet('/Api/AutoConfig/GetKeyValuesByAutoConfig', para)
    if (response.status === 1) {
      return response.result
    }
  }
}
