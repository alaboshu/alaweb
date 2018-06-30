import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()
request.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})
// 配置请求基地址
request.config.baseURL = 'http://localhost:8080'

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    if (err) {
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    }
    return promise.resolve()
  }
)

export default request
