// 使用 localStorage特性，来作为本地存储
export default {
  //  存储localStorage
  setStore (name, data) {
    data = JSON.stringify(data)
    window.localStorage.setItem(name, data)
  },

  //  获取localStorage
  getStore (name) {
    if (!name) return
    var data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    }
  },

  //  根据时间存储localStorage
  setStoreByTime (name, data) {
    // let timestamp = Math.round(new Date().getTime() / 1000)
    var value = {
      time: Math.round(new Date().getTime()),
      data: data
    }
    value = JSON.stringify(value)
    // console.info('缓存数据', value)
    window.localStorage.setItem(name, value)
  },

  // 根据时间 获取localStorage
  getStoreByTime (name) {
    if (!name) return
    var value = window.localStorage.getItem(name)
    if (value) {
      var data = JSON.parse(value)
      return data.data
    }
  },

  // 缓存中是否有值
  hasValue (name) {
    if (!name) return false
    var data = window.localStorage.getItem(name)
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
  removeStore (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
