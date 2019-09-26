// 使用 localStorage特性，来作为本地存储
export default {
  //  存储localStorage
  set (name, data) {
    // data = JSON.stringify(data)
    uni.setStorageSync(name, data)
    // uni.setStorage({
    //   key: name,
    //   data: data
    // })
  },

  //  获取localStorage
  get (name) {
    if (!name) return
    var data = uni.getStorageSync(name)
    var data
    // await uni.getStorage({
    //   key: name,
    //   success: (res) => {
    //     data = res.data
    //   }
    // })
    if (data) {
      if (data !== undefined && data !== 'undefined') {
        // return JSON.parse(data)
        return data
      }
    }
    return undefined
  },

  //  根据时间存储localStorage
  setByTime (name, data) {
    // let timestamp = Math.round(new Date().getTime() / 1000)
    var value = {
      time: Math.round(new Date().getTime()),
      data: data
    }
    value = JSON.stringify(value)
    uni.setStorageSync(name, value)
  },

  // 根据时间 获取localStorage
  getByTime (name) {
    if (!name) return
    var value = uni.getStorageSync(name)
    if (value) {
      var data = JSON.parse(value)
      return data.data
    }
  },

  // 缓存中是否有值
  hasValue (name) {
    if (!name) return false
    var data = uni.getStorageSync(name)
    if (
      data === undefined ||
      data === null ||
      data === 'undefined' ||
      data === 'null'
    ) {
      return false
    }
    return true
  },

  //  删除localStorage
  remove (name) {
    if (!name) return
    uni.removeStorageSync(name)
  }
}
