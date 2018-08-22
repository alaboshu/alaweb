import request from './request'
import Vue from 'vue'
export default {
  //  Get方法：查
  // islocal==true时，先请求本地sqlite数据，如果内容存在，延时30s(页面完全打开后)，请求远程数据，同时把最新的数据保存到sqlite中
  async get (apiUrl, data) {
    var response = await request.get(apiUrl, data)
    // console.info('get数据', response)
    if (response.status === 1) {
      return response.result
    } else {
      Vue.prototype.$toast.warn(response.message)
    }
  },
  //  Post方法 :增
  async post (apiUrl, data) {
    var response = await request.post(apiUrl, data)
    if (response.status === 1) {
      return response.result
    } else {
      Vue.prototype.$toast.warn(response.message)
    }
  },
  //  Put方法：改
  async put (apiUrl, data) {
    var response = await request.put(apiUrl, data)
    if (response.status === 1) {
      return response
    } else {
      Vue.prototype.$toast.warn(response.message)
    }
  },
  //  delete方法：删
  async delete (apiUrl, data) {
    var response = await request.delete(apiUrl, data)
    if (response.status === 1) {
      return response
    } else {
      Vue.prototype.$toast.warn(response.message)
    }
  }
}
