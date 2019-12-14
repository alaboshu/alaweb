export default {
  // 获取默认地址
  async getDefaultAddress (jsThis) {
    // var _this = this
    if (await jsThis.$api.localGet('default_address') === undefined) {
      let parameter = {
        userId: jsThis.$user.loginUser().id
      }
      var Single = await jsThis.$api.httpGet('/Api/UserAddress/Single', parameter)
      if (Single.status === 1) {
        jsThis.$api.localSet('default_address', Single.result)
        jsThis.addressMsg = Single.result
        jsThis.addressId = Single.result.id
        jsThis.addressType = true
      } else {
        jsThis.$api.toastWarn('请先添加地址')
        uni.showModal({
          title: '提示',
          content: '请先添加地址',
          showCancel: true,
          confirmText: '确定',
          success: (res) => {
            if (res.confirm) {
              // _jsThis.addAddress()
            } else if (res.cancel) {}
          }
        })
        jsThis.addressType = false
      }
    } else {
      jsThis.addressType = true
      jsThis.addressMsg = await jsThis.$api.localGet('default_address')
      jsThis.addressId = await jsThis.$api.localGet('default_address').id
    }
  }
}
