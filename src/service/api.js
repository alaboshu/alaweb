import theme from '@/service/all/theme'
import http from '@/service/all/http'
import httpWx from '@/service/all/http.wx'
import local from '@/service/utils/local'
import loading from '@/service/utils/loading'
import toast from '@/service/utils/toast'
import help from '@/service/core/helper'
import config from '@/service/config'
import user from '@/service/user'
import store from '@/service/store'
// #ifdef H5
import share from '@/service/planform/h5/share'
// #endif

import shareApp from '@/service/planform/app/share'

// #ifdef APP-PLUS
const wushare = uni.requireNativePlugin('WUApp-Share')
// #endif
// // #ifndef H5
// import share from '@/service/planform/mp/share'
// // #endif

export default {
  // 当前租户
  tenant () {
    if (config.isTenant === true) {
      var tenant = this.vuexLocalGet('tenant')
      return tenant
    } else {
      return ''
    }
  },
  // 是否为租户模式
  isTenant () {
    return config.isTenant
  },
  // 输出信息,发布环境不输出
  info () {
    if (process.env.NODE_ENV === 'development') {
      console.info(arguments)
    }
  },
  // 添加日志
  async log () {
    var para = {
      message: JSON.stringify(arguments)
    }
    await this.httpPost('/api/logs/add', para)
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
    if (this.client() === 'WeChatLite') {
      return httpWx.get(apiUrl, data)
    }
    return http.get(apiUrl, data)
  },
  //   http请求,Post方法 :增
  async httpPost (apiUrl, data) {
    if (this.client() === 'WeChatLite') {
      return httpWx.post(apiUrl, data)
    }
    return http.post(apiUrl, data)
  },
  //   http请求,Put方法：改
  async httpPut (apiUrl, data) {
    return http.put(apiUrl, data)
  },
  //  http请求,delete方法：删
  async httpDelete (apiUrl, data) {
    if (this.client() === 'WeChatLite') {
      return httpWx.delete(apiUrl, data)
    }
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
  // 微信提示
  weixinModel (message) {
    uni.showModal({
      title: '提示',
      content: message,
      success: function (res) {
        if (res.confirm) {} else if (res.cancel) {}
      }
    })
  },
  /** 微信分享 */
  share (title, imageUrl, desc, url) {
    if (this.client() === 'AppPlus' && this.payType() === 4) {
      shareApp.appShare(title, url, desc, imageUrl)
    } else if (this.client() === 'AppPlus' && this.payType() === 3) {
      // #ifdef APP-PLUS
      wushare.iosShare({
          text: title,
          url: url
        },
        result => {
          if (result.completed) {} else {}
        }
      )
      // #endif
    } else {
      setTimeout(function () {
        return share.show(title, imageUrl, desc, url)
      }, 500)
    }
  },
  shareApp (title, imageUrl, summary, url) {
    shareApp.appShare(title, url, summary, imageUrl)
  },

  // 判断字符串是否为空，或在null 或者undefined
  isEmpty (str) {
    return help.isEmpty(str)
  },

  // 终端类型 ：包括小程序，APP，H5包括微信公众号的判断
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
    return 'WeChatLite'
    // #endif

    // #ifdef APP-PLUS
    // eslint-disable-next-line
    return 'AppPlus'
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
      // ios
      return 3
    } else if (
      this.client() === 'AppPlus' &&
      this.getSystemInfoSync().platform === 'android'
    ) {
      // adnroid
      return 4
    }
  },
  // 页面跳转
  // // 页面跳转
  to (url, isApp) {
    if (url === '/pages/tabbar/index' || url.includes('pages/tabbar')) {
      uni.reLaunch({
        url: url
      })
      return
    }
    if (this.client() === 'AppPlus') {
      if (user.isLogin() === false) {
        // var this = this
        uni.showModal({
          title: '未登录',
          content: '请先登录',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/user/login'
              })
            } else if (res.cancel) {}
          }
        })
      } else {
        if (isApp) {
          uni.switchTab({
            url: url
          })
        } else {
          uni.navigateTo({
            url: url
          })
        }
      }
    } else {
      if (isApp) {
        uni.switchTab({
          url: url
        })
      } else {
        uni.navigateTo({
          url: url
        })
      }
    }
    this.historys(url)
  },
  // 设置历史记录，保留5条历史记录
  historys (url) {
    var historys = this.vuexLocalGet('browse_historys')
    if (this.isEmpty(historys)) {
      historys = []
      historys[0] = url
      this.vuexLocalSet('browse_historys', historys)
    } else {
      historys[historys.length] = url
      if (historys.length > 5) {
        historys.splice(0, 1)
      }
      this.vuexLocalSet('browse_historys', historys)
    }
  },
  back (url) {
    var historys = this.vuexLocalGet('browse_historys')
    if (url === 'login' && user.isLogin() === false) {
      uni.reLaunch({
        url: '/pages/tabbar/index'
      })
      return false
    }
    if (historys && historys.length > 1) {
      if (url === '/pages/user?path=order_show') {
        this.to('/pages/index?path=order_index')
      } else if (url === '/pages/user?path=order_index') {
        this.to('/pages/user/index', true)
      } else if (url === 'login' && user.isLogin() === false) {
        uni.navigateBack({
          delta: 1
        })
      } else {
        if (getCurrentPages().length === 1) {
          uni.reLaunch({
            url: '/pages/tabbar/index'
          })
        } else {
          if (this.client() === 'AppPlus') {
            uni.navigateBack({
              delta: 1
            })
          } else {
            if (
              getCurrentPages()[getCurrentPages().length - 1] &&
              getCurrentPages()[getCurrentPages().length - 1].option &&
              getCurrentPages()[getCurrentPages().length - 1].option.path ===
              'user_login'
            ) {
              var historys = this.vuexLocalGet('browse_historys')
              var backUrl = historys[historys.length - 1]
              uni.reLaunch({
                url: backUrl
              })
            } else {
              uni.navigateBack({
                delta: 1
              })
            }
          }
        }
      }
    } else {
      uni.reLaunch({
        url: '/pages/tabbar/index'
      })
    }
  },
  vuexSet (name, value) {
    store.state[name] = value
  },
  vuexGet (name) {
    return store.state[name]
  },
  vuexLocalGet (name) {
    if (!store.state[name]) {
      return store.state[name]
    } else {
      if (!store.state[name]) {
        this.vuexSet(name, this.localGet(name))
        return this.localGet(name)
      } else {
        return null
      }
    }
  },
  vuexLocalSet (name, value) {
    store[name] = value
    local.set(name, value)
  }
}
