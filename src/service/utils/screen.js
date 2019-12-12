import store from '@/service/store'
export default {
  getSystemInfoSync () {
    if (store.state.getSystemInfoSync === null) {
      store.state.getSystemInfoSync = uni.getSystemInfoSync()
      return store.state.getSystemInfoSync
    } else {
      return store.state.getSystemInfoSync
    }
  },
  // 屏幕高度
  height () {
    return this.getSystemInfoSync().windowHeight
  },
  // 屏幕宽度
  width () {
    return this.getSystemInfoSync().windowWidth
  }
}
