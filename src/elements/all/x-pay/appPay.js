export default {
  async appWxPay (jsThis, paras, orderId) {
    var response = await jsThis.$api.httpPost('api/pay/WechatAppPay', paras)
    if (response.status === 1) {
      var orderInfo = response.result
      uni.requestPayment({
        provider: 'wxpay',
        orderInfo: orderInfo, // 微信、支付宝订单数据
        success: function (res) {
          jsThis.$api.to('/pages/index?path=order_show&id=' + orderId)
        },
        fail: function (err) {
          jsThis.$api.toastWarn('用户取消或者订单过期')
          // jsThis.$api.toastWarn(JSON.stringify(err.errMsg))
          console.log(err)
        }
      })
    }
  },
  async appAliPay (jsThis, data, orderId) {
    var orderInfo = data.result.message
    uni.requestPayment({
      provider: 'alipay',
      orderInfo: orderInfo, // 微信、支付宝订单数据
      success: function (res) {
        jsThis.$api.to('/pages/index?path=order_show&id=' + orderId)
      },
      fail: function (err) {
        jsThis.$api.toastWarn('用户取消或者订单过期')
        // jsThis.$api.toastWarn(JSON.stringify(err.errMsg))
        console.log(err)
      }
    })
  }
}
