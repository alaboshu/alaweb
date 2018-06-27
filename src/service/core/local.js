// 使用 localStorage特性，来作为本地存储
import store from 'src/store/index'
export default {
  //  存储localStorage
  setStore (name, data) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
      //  console.log("setStore"+name)
    }
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
  },
  //  存储登录用户的localStorage
  setLoginStore (name, data) {
    name = name + '___' + store.state.userStore.loginUser.id
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
      //  console.log("setStore"+name)
    }
    window.localStorage.setItem(name, data)
  },

  //  获取登录用户的localStorage
  getLoginStore (name) {
    name = name + '___' + store.state.userStore.loginUser.id
    if (!name) return
    var data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    }
  },
  //  删除登录用户的localStorage
  removeLoginStore (name) {
    name = name + '___' + store.state.userStore.loginUser.id
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
