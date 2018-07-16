import wx from 'wx'
import Fly from 'flyio'
import {
  apiBaseUrl,
  projectId,
  key,
  privateKey
} from '@/service/api/config'
const request = new Fly()
const timestamp = Math.round(new Date().getTime() / 1000)
request.interceptors.request.use((config, promise) => {
  config.headers['zk-project-id'] = projectId
  config.headers['zk-key'] = key
  config.headers['zk-private-key'] = privateKey
  config.headers['zk-timestamp'] = timestamp
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
