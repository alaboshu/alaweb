import token from '@/service/all/token'
import api from '@/service/api'
import user from '@/service/user'
import globalConfig from '@/service/config'
import axios from 'wx-axios-promise'

export default {
  async get (apiUrl, data) {
    var axiosWx = axios()
    this.getAxios(apiUrl)
    var response = await axiosWx.get(globalConfig.apiBaseUrl + apiUrl, data)
    return response.data
  },
  async post (apiUrl, data) {
    this.getAxios(apiUrl)
    var axiosWx = axios()
    var response = await axiosWx.post(globalConfig.apiBaseUrl + apiUrl, data)
    return response.data
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return response
  },
  async delete (apiUrl, data) {
    this.getAxios(apiUrl)
    var para = this.parseParams(data)
    var axiosWx = axios()
    var response = await axiosWx.delete(globalConfig.apiBaseUrl + apiUrl + '?' + para)
    return response.data
  },
  parseParams (data) {
    try {
      var tempArr = []
      for (var i in data) {
        var key = encodeURIComponent(i)
        var value = encodeURIComponent(data[i])
        tempArr.push(key + '=' + value)
      }
      var urlParamsStr = tempArr.join('&')
      return urlParamsStr
    } catch (err) {
      return ''
    }
  },
  getAxios (apiUrl) {
    var axiosWx = axios()
    axiosWx.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        ...this.getHead(apiUrl)
      }
      return config
    })
  },
  getHead (apiUrl) {
    var headObj = {
      'zk-token': token.getToken(apiUrl),
      'zk-user-id': user.id(),
      'zk-user-token': token.getUserToken(apiUrl),
      'zk-tenant': api.tenant(),
      'zk-timestamp': token.timestamp()
    }
    return headObj
  }
}
