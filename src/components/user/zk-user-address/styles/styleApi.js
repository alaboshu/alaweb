export default {
  // 获取地址列表
  async getAddress (jsThis) {
    var para = {
      loginUserId: jsThis.$user.id()
    }
    var resposne = await jsThis.$api.httpGet('/api/useraddress/get', para)
    if (resposne.status === 1) {
      if (resposne.result.length === 0) {
        this.$api.localRemove('default_address')
      }
      var data = this.sortAddress(resposne.result)
      return data
    }
    return null
  },
  // 处理默认地址为第一位
  sortAddress (data) {
    var dataIndex = data.findIndex(r => r.isDefault === true)
    data.splice(0, 0, data.splice(dataIndex, 1)[0])
    return data
  },
  // 编辑地址处理
  async editAddress (jsThis, data) {
    var para = {
      LoginUserId: jsThis.$user.id(),
      id: data.id
    }
    var resposne = await jsThis.$api.httpGet('/api/useraddress/single', para)
    if (resposne.status === 1) {
      var singleMsg = resposne.result
      jsThis.addressInput.name = singleMsg.name
      jsThis.addressInput.mobile = singleMsg.mobile
      jsThis.addressInput.address = singleMsg.address
      jsThis.addressInput.isDefault = singleMsg.isDefault
      jsThis.addressInput.regionId = singleMsg.regionId
    }
  }
}
