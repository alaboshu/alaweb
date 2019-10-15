/* eslint-disable */
// eslint-disable-next-line
import token from '@/service/all/token'
import h5Fly from 'flyio'
import Fly from 'flyio/dist/npm/wx'
import api from '@/service/api'
import store from '@/service/store'
import base from '@/service/base'
import user from '@/service/user'
import globalConfig from '@/service/config'

export default {
  //  Get方法：查
  async get(apiUrl, data) {
    // if (data.loginUserId !== undefined) {
    //   if (data.loginUserId === 0) {
    //     data.loginUserId = -1
    //   }
    // }
    // const timer = api.loadingOpen(350)
    uni.showLoading({
      title: '加载中..'
    })
    const response = await this.getRequest(apiUrl, data).get(apiUrl, data)
    // api.loadingClose(timer)
    uni.hideLoading()
    return this.responseStatus(response, apiUrl)
  },
  //  Post方法 :增
  async post(apiUrl, data, notTenant) {
    var response = await this.getRequest(apiUrl, data, notTenant).post(
      apiUrl,
      data
    )
    return this.responseStatus(response, apiUrl)
  },
  //  Put方法：改
  async put(apiUrl, data) {
    var response = await this.getRequest(apiUrl).put(apiUrl, data)
    return this.responseStatus(response, apiUrl)
  },
  //  delete方法：删
  async delete(apiUrl, data) {
    var response = await this.getRequest(apiUrl).delete(apiUrl, data)
    return this.responseStatus(response)
  },
  // 请求状态判断
  responseStatus(response, url) {
    if (response === undefined) {
      if (!base.isBuild()) {
        api.toastWarn('获取失败')
      }
    } else {
      if (response.status !== 1) {
        // api.toastWarn(response.message)
      }
    }
    return response
  },
  getClientRequest() {
    var request
    if (api.client() === 'WapH5') {
      request = h5Fly
      return request
    } else if (api.client() === 'WeChat') {
      request = Fly
      return request
    } else if (api.client() === 'WeChatLite') {
      request = new Fly()
      return request
    }
  },
  getRequest(apiUrl, data, notTenant) {
    const request = new Fly()
    var tenant = base.tenant()
    var userId = user.id()
    if (notTenant !== undefined) {
      // autoOrder 判断是否租户
      tenant = ''
    }
    if (data !== undefined) {
      // autoForm,zkList 判断是否租户
      if (data.isTenant !== undefined) {
        if (data.isTenant) {
          if (!api.config().isCustomerShop) {
            tenant = user.loginUser().tenant.sign
          }
          userId = user.id(data.isTenant)
        }
      }
    }
    request.interceptors.request.use((config, promise) => {
      config.headers['zk-token'] = token.getToken(apiUrl)
      config.headers['zk-user-id'] = userId
      config.headers['zk-user-token'] = token.getUserToken(apiUrl)
      config.headers['zk-tenant'] = tenant
      config.headers['zk-timestamp'] = token.timestamp()
      return config
    })
    request.config.baseURL = globalConfig.apiBaseUrl
    // request.config.baseURL = config.app().url
    if (data !== undefined) {
      if (data.isTenant) {
        // console.info('租户模式，请求地址', user.serviceUrl(), tenant)
        request.config.baseURL = user.serviceUrl()
      }
    }
    if (base.isDiy()) {
      var clientHost = api.vuexGet('diyClientHost')
      if (clientHost !== undefined) {
        config.headers['zk-diy-token'] = token.getDiyToken(apiUrl)
        request.config.baseURL = clientHost
      }
    }
    request.interceptors.response.use(
      (response, promise) => {
        var result = promise.resolve(response.data)
        return result
      },
      (err, promise) => {
        if (err) {
          // api.toastWarn(err.message)
        }
        var result = promise.resolve()
        return result
      }
    )
    return request
  }
}
