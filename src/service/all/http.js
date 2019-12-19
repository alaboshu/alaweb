import token from '@/service/all/token'
import api from '@/service/api'
import user from '@/service/user'
import globalConfig from '@/service/config'
import axios from 'axios'
import axiosWx from 'wx-axios-promise'

export default {
  async get(apiUrl, data) {
    var axiosApi = this.axiosCore(apiUrl)
    this.getAxios(apiUrl)
    const timer = api.loadingOpen(500) // 500ms内不提示加载

    var para = this.parseParams(data)
    try {
      var response = await axiosApi.get(globalConfig.apiBaseUrl + apiUrl + '?' + para).then(res => {
        return res
      })
      api.loadingClose(timer)
      return response.data
    } catch (e) {
      api.loadingClose(timer)
      return ''
    }
  },
  async post(apiUrl, data) {
    var axiosApi = this.axiosCore(apiUrl)
    this.getAxios(apiUrl)
    var response = await axiosApi.post(globalConfig.apiBaseUrl + apiUrl, data)
    return response.data
  },
  //  Put方法：改
  async put(apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return response
  },
  async delete(apiUrl, data) {
    var axiosApi = this.axiosCore(apiUrl)
    var para = this.parseParams(data)
    var response = await axiosApi.delete(globalConfig.apiBaseUrl + apiUrl + '?' + para)
    return response.data
  },
  parseParams(data) {
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
  axiosCore(apiUrl) {
    if (api.client() !== 'WapH5') {
      return axiosWx({
        header: {
          ...this.getHead(apiUrl)
        }
      })
    }
    return axios
  },
  getAxios(apiUrl) {
    var axiosApi = this.axiosCore(apiUrl)
    axiosApi.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        ...this.getHead(apiUrl)
      }
      return config
    })
  },
  getHead(apiUrl) {
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
