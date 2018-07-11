import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()
request.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})
// 配置请求基地址
request.config.baseURL = 'http://admin.czhait.com/'

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    if (err) {
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    }
    return promise.resolve()
  }
)

export default request
