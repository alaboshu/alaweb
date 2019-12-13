import token from '@/service/all/token'
import api from '@/service/api'
import user from '@/service/user'
import globalConfig from '@/service/config'
import axios from 'axios'
import axiosWx from 'wx-axios-promise'

export default {
  async get (apiUrl, data) {
    var axiosApi = this.axiosCore()
    this.getAxios(apiUrl)
    var response = await axiosApi.get(globalConfig.apiBaseUrl + apiUrl, {
      params: data
    })
    return response.data
  },
  async post (apiUrl, data) {
    var axiosApi = this.axiosCore()
    this.getAxios(apiUrl)
    var response = await axiosApi.post(globalConfig.apiBaseUrl + apiUrl, data)
    return response.data
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return response
  },
  async delete (apiUrl, data) {
    var axiosApi = this.axiosCore()
    var para = this.parseParams(data)
    var response = await axiosApi.delete(globalConfig.apiBaseUrl + apiUrl + '?' + para)
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
  axiosCore () {
    if (api.client() === 'WeChatLite' || api.client() === 'WeChat') {
      return axiosWx()
    }
    return axios
  },
  getAxios (apiUrl) {
    axios.interceptors.request.use((config) => {
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
