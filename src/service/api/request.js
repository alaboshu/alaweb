import wx from 'wx'
import Fly from 'flyio'
import {
  apiBaseUrl,
  projectId,
  key,
  privateKey
} from '@/service/api/config'
const request = new Fly()
request.interceptors.request.use((config, promise) => {
  config.headers['Zk-Project-Id'] = projectId
  config.headers['Zk-Key'] = key
  config.headers['Zk-Private-Key'] = privateKey
  return config
})
// 配置请求基地址
request.config.baseURL = apiBaseUrl

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
