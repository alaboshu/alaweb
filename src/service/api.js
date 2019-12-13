import theme from '@/service/all/theme'
import http from '@/service/all/http'
import history from '@/service/utils/history'
import local from '@/service/utils/local'
import loading from '@/service/utils/loading'
import toast from '@/service/utils/toast'
import help from '@/service/core/helper'
import config from '@/service/config'
import store from '@/service/store'
import share from '@/service/planform/share'

export default {
  // 页面跳转
  to (url) {
    history.to(url)
  },
  back () {
    history.back()
  },
  // 当前租户
  tenant () {
    if (config.isTenant === true) {
      var tenant = this.vuexLocalGet('tenant')
      return tenant
    } else {
      return ''
    }
  },
  // 输出信息,发布环境不输出
  info () {
    if (process.env.NODE_ENV === 'development') {
      console.info(arguments)
    }
  },

  // config信息
  config () {
    return config
  },
  async themePage (option, url) {
    return theme.page(option)
  },
  // 模块信息
  async themeWidget (widget, appendPara) {
    return theme.widget(widget, appendPara)
  },
  // http get
  async httpGet (apiUrl, data) {
    return http.get(apiUrl, data)
  },
  //   http请求,Post方法 :增
  async httpPost (apiUrl, data) {
    return http.post(apiUrl, data)
  },
  //   http请求,Put方法：改
  async httpPut (apiUrl, data) {
    return http.put(apiUrl, data)
  },
  //  http请求,delete方法：删
  async httpDelete (apiUrl, data) {
    return http.delete(apiUrl, data)
  },

  loadingOpen (time) {
    return loading.open(time)
  },
  loadingClose (time, isLoad) {
    return loading.close(time, isLoad)
  },
  // 获取缓存
  localGet (name) {
    return local.get(name)
  },
  // 设置缓存
  localSet (name, data) {
    return local.set(name, data)
  },
  // 删除缓存
  localRemove (name) {
    return local.remove(name)
  },
  // 成功提示
  toast (message) {
    return toast.success(message)
  },
  toastSuccess (message) {
    return toast.success(message)
  },
  // 错误提示
  toastWarn (message) {
    return toast.warn(message)
  },
  // 底部文字提示
  toastButton (message) {
    return toast.botton(message)
  },
  // 中间文字
  centerButton (message) {
    return toast.center(message)
  },
  // 弹出确认消息
  confirm (message) {
    var _this = this
    uni.showModal({
      title: '提示',
      content: message,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          _this.back()
        } else if (res.cancel) {
          this.back()
        }
      }
    })
  },
  /** 微信分享 */
  share (title, imageUrl, desc, url) {
    share.share(title, imageUrl, desc, url)
  },
  // 判断字符串是否为空
  isEmpty (str) {
    return help.isEmpty(str)
  },
  // 终端类型
  client () {
    // #ifdef H5
    var u = navigator.userAgent
    var client = 'WapH5'
    if (u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1) {
      client = 'WeChat' // 微信
    }
    return client
    // #endif

    // #ifdef MP-WEIXIN
    // eslint-disable-next-line
    return 'WeChatLite';
    // #endif

    // #ifdef APP-PLUS
    // eslint-disable-next-line
    return 'AppPlus';
    // #endif
  },
  // 支付类型
  payType () {
    if (this.client() === 'WapH5') {
      // 手机Wap
      return 2
    } else if (this.client() === 'WeChat') {
      // 微信
      return 5
    } else if (this.client() === 'WeChatLite') {
      // 小程序
      return 6
    } else if (
      this.client() === 'AppPlus' &&
      this.getSystemInfoSync().platform === 'ios'
    ) {
      return 3
    } else if (
      this.client() === 'AppPlus' &&
      this.getSystemInfoSync().platform === 'android'
    ) {
      return 4
    }
  },
  vuexSet (name, value) {
    store.state[name] = value
  },
  vuexGet (name) {
    return store.state[name]
  },
  vuexLocalGet (name) {
    var data = this.vuexGet(name)
    if (data) {
      return data
    } else {
      data = this.localGet(name)
      this.vuexSet(name, data)
      return data
    }
  },
  vuexLocalSet (name, value) {
    this.vuexSet(name, value)
    local.set(name, value)
  },
  // 添加日志
  async log () {
    var para = {
      message: JSON.stringify(arguments)
    }
    await this.httpPost('/api/logs/add', para)
  }
}
