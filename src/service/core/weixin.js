import helper from '@/service/core/helper'
import api from '@/service/api'
import user from '@/service/user'
import theme from '@/service/all/theme'
export default {
  // 微信登录,微信授权必须要发布到服务器上才可以测试
  async login () {
    if (api.client() === 'WeChat') {
      var openId = api.localGet('wechat_openId') // 用户已登录则openid在缓存中，请查看user.js中的login，和reg方法
      if (openId === undefined) {
        // 防止微信重复刷新
        var count = this.weixinLoginCount()
        if (count <= 3) {
          var allPageInfo = await theme.getAllPageList()
          // 服务端设置微信公众号支付
          if (allPageInfo.site.isWeiXinPay) {
            window.location.href = allPageInfo.site.weiXinUrl
            //  微信环境下获取code,微信和支付宝的授权认证都需要放在公网调试，发布到服务器上以后调试，本地环境获取不到code
            // 第一步：通过公网获取code，进行授权
            const code = helper.query('code')
            if (code) {
              // 向服务端获取微信用户的openId
              // 第二步：通过code，获取openId,同时返回用户信息
              var data = {
                jsCode: code
              }
              var response = await api.httpGet(
                '/api/apistore/weixinpublogin',
                data
              )
              if (response.status === 1) {
                // 微信公众号自动登录
                user.weixinPublogin(response.result)
              }
            }
          }
        }
      }
    }
  },
  // 记录微信登录次数
  weixinLoginCount () {
    var count = api.localGet('wechat_logincount') // 微信登录
    if (count === undefined) {
      count = 0
    } else {
      count = count + 1
    }
    api.localSet('wechat_logincount', count)
    return count
  },
  // 微信支付
  async onBridgeReady (response, paras) {
    // https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
    api.log('前台微信公众号信息记录', response, response.message)
    let data = JSON.parse(response.message)
    // eslint-disable-next-line
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        appId: data.appId, // 公众号名称，由商户传入
        timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, // 随机串
        package: data.package,
        signType: data.signType, // 微信签名方式：
        paySign: data.paySign // 微信签名
      },
      async function (res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if (
          res.err_msg === 'get_brand_wcpay_request:ok' ||
          res.err_msg.indexOf('ok') > -1
        ) {
          var parapay = {
            payId: paras.payId,
            clientType: paras.clientType,
            userId: paras.loginUserId,
            openId: paras.openId
          }
          await api.httpPost('Pay/PublicPayAsyncByPayId', parapay)
          window.location.href = response.url
        } else {
          window.location.href = response.url
        }
      }
    )
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        // eslint-disable-next-line
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        // eslint-disable-next-line
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        // eslint-disable-next-line
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      // eslint-disable-next-line
      onBridgeReady()
    }
  },
  // 小程序支付成功
  Pay (response) {
    // https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
    let data = JSON.parse(response.message)
    // eslint-disable-next-line
    wx.requestPayment({
      timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
      nonceStr: data.nonceStr, // 随机串
      package: data.package,
      signType: data.signType, // 微信签名方式：
      paySign: data.paySign, // 微信签名
      success: function (res) {
        wx.redirectTo({
          url: '/pages/index?path=order_index'
        })
        api.log('小程序支付成功', res, api.localGet('weixin_user'))
      },
      fail: function (res) {
        api.log('小程序支付失败', res, api.localGet('weixin_user'))
      },
      complete: function (res) {}
    })
  }
}
