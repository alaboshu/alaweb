// 公共函数
import store from 'src/store/index'

exports.install = function (Vue, options) {
  // 操作错误信息提示，跳转到信息提示页面，并显示错误信息
  Vue.prototype.messageWarn = function (message) {
    this.$router.push({
      name: 'message',
      params: {
        message: message,
        type: 'warn'
      }
    })
  }
  // 当前登录用户 this.LoginUser() 获取
  Vue.prototype.LoginUser = function () {
    return store.state.userStore.loginUser
  }
  // 操作成功信息提示，跳转到信息提示页面，并显示成功信息
  Vue.prototype.messageSuccess = function (message) {
    this.$router.push({
      name: 'message',
      params: {
        message: message,
        type: 'success'
      }
    })
  }

  // 日期格式化函数
  Vue.prototype.formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str)
        )
      }
    }
    return fmt
  }

  Vue.prototype.padLeftZero = function (str) {
    return ('00' + str).substr(str.length)
  }

  // 获取访问终端类型
  Vue.prototype.ClientType = function () {
    var u = navigator.userAgent
    var client = 'WapH5'
    if (u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1) {
      client = 'Wechat' // 微信
      return client
    }
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
      client = 'WapH5' // android终端或者uc浏览器
      return client
    }
    return client
    //     app = navigator.appVersion
    //   return {
    //     // trident: u.indexOf('Trident') > -1,  // IE内核
    //     // presto: u.indexOf('Presto') > -1,  // opera内核
    //     // webKit: u.indexOf('AppleWebKit') > -1,  // 苹果、谷歌内核
    //     // gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  // 火狐内核
    //     // mobile: !!u.match(/AppleWebKit.*Mobile.*/) , // 是否为移动终端
    //     // ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) , // ios终端
    //     // android:  u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 , // android终端或者uc浏览器
    //     // iPhone: u.indexOf('iPhone') > -1,  // 是否为iPhone或者QQHD浏览器
    //     // iPad: u.indexOf('iPad') > -1 , // 是否iPad
    //     // webApp: u.indexOf('Safari') == -1,  // 是否web应该程序，没有头部与底部
    //     // weixin: u.toLowerCase().indexOf('micromessenger') > -1  // 是否是微信 */
    //   }
    // })(),
  }
}
