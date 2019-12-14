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
      return resposne.result
    }
    return null
  }
}
