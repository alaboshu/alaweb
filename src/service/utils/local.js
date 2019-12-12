// 本地存储
export default {
  set (name, data) {
    uni.setStorageSync(name, data)
  },
  get (name) {
    if (!name) return
    var data = uni.getStorageSync(name)
    var data
    if (data) {
      if (data !== undefined && data !== 'undefined') {
        return data
      }
    }
    return undefined
  },
  remove (name) {
    if (!name) return
    uni.removeStorageSync(name)
  }
}
