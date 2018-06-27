import api from 'src/service/api/apistore.api'
import apiCommon from 'src/service/api/common.api'
import local from 'src/service/common/local'
import helper from 'src/service/common/helper'
import apiUser from 'src/service/api/user.api'
export default {
  // 微信登录
  async WechatLogin () {
    var openId1 = window.localStorage.getItem('wechat_openId')
    this.weixinLogin(openId1)
    var u = navigator.userAgent

    if (u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1) {
      try {
        if (!local.hasValue('wechat_openId')) {
          // 循环获取openId
          var appConfig = await this.getWeChatPayConfig()
          console.info(appConfig)
          // if (!appConfig.isEnable) {
          //   return // 后台未启用微信公众号支付
          // }
          // alert('开始获取openId' + appConfig.returnUrl)
          window.location.href = appConfig.returnUrl
          var openId = await this.getOpenIdCycle(appConfig)
          let i = 1
          while (helper.length(openId) < 12 && i < 5) {
            //  alert('获取opneId,第' + i + '次' + openId)
            openId = await this.getOpenIdCycle(appConfig)
            i++
          }
          if (helper.length(openId) >= 12) {
            window.localStorage.setItem('wechat_openId', openId)
            this.weixinLogin(openId)
          }
        }
      } catch (err) {
        //  alert('获取OpenId异常' + err)
      }
    }
  },

  async weixinLogin (openId) {
    var user = local.getStore('user')
    var autoLogin = window.localStorage.getItem('wechat_autoLoginByOpenId') // 是否自动登录
    if (autoLogin === undefined || autoLogin === null || autoLogin === 'true') {
      if (user === undefined || user === null || user.id < 1) {
        var response = await apiUser.loginByOpenId(openId)
        if (response.data.status === 1) {
          local.setStore('user', response.data.result)
        }
      }
    }
  },
  // 循环三次获取openId,直到成功
  async getOpenIdCycle (appConfig) {
    var code = this.getCodeCycle(appConfig)
    if (helper.length(code) > 12) {
      var data = {
        jsCode: code
      }
      var response = await api.weixinLogin(data)
      if (response.data.status === 1) {
        var openId = response.data.result.session.openid
        if (openId !== undefined && openId !== null) {
          if (helper.length(openId) > 12) {
            //  alert('open获取成功' + openId)
            return openId
          }
        }
      } else {
        alert('获取openId失败' + response.data.message)
      }
    }
    return ''
  },
  // 循环三次获取code
  getCodeCycle (appConfig) {
    var code = this.getCode(appConfig) // 第一次获取code
    let i = 1
    while (helper.length(code) < 12 && i < 5) {
      // alert('获取code,第' + i + '次' + code)
      code = this.getCode(appConfig) // 第二次获取code
      i++
    }
    if (helper.length(code) >= 12) {
      window.localStorage.setItem('wechat_code', code)
    }
    return code
  },
  getCode (appConfig) {
    // var retrunUrl = window.location.href
    var retrunUrl = appConfig.returnUrl
    // var retrunUrl = 'http://www.yiqipingou.com'
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    url += '?appid=' + appConfig.appId
    url += '&redirect_uri=' + encodeURIComponent(retrunUrl)
    url += '&response_type=code'
    url += '&scope=snsapi_base'
    url += '&state=STATE&connect_redirect=1'
    url += '#wechat_redirect'
    window.location.href = url
    var code = this.getQueryString('code')
    return code
  },
  // 获取微信公众号支付
  async getWeChatPayConfig () {
    var response = await apiCommon.GetConfigValue('WeChatPaymentConfig')
    console.info('微信配置', response)
    return response.data.result
  },
  getQueryString (name) {
    var querys = window.location.search
    // querys = 'http://www.yiqipingou.com/?code=081Du20u0OUokb1OjB0u0XCr0u0Du20I&state=STATE'
    // querys = url
    var num = querys.indexOf('?')
    var str = querys.substr(num + 1)
    var arr = str.split('&')
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        if (arr[i].substring(0, num) === name) {
          var code = arr[i].substr(num + 1)
          return code
        }
      }
    }
  },
  // 微信支付
  onBridgeReady (response) {
    // // 如果是微信支付，则将参数(parameter)给 公众号前端 让他在微信内H5调起支付
    // https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
    let data = JSON.parse(response.data.result.message)
    console.info('支付参数', data)
    // eslint-disable-next-line
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: data.appId, // 公众号名称，由商户传入
        timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, // 随机串
        package: data.package,
        signType: data.signType, // 微信签名方式：
        paySign: data.paySign // 微信签名
      },
      function (res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if (
          res.err_msg === 'get_brand_wcpay_request:ok' ||
          res.err_msg.indexOf('ok') > -1
        ) {
          window.location.href = response.data.result.url
        } else {
          // alert('支付失败' + res.err_msg)
          // alert(window.localStorage.getItem('wechat_openId'))
          // alert(response.data.result.message)
          // alert(response.data.result.url)
          window.location.href = response.data.result.url
        }
      }
    )
  }
}
