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
  screenHeight () {
    return this.getSystemInfoSync().screenHeight
  },
  // 屏幕宽度
  screenWidth () {
    return this.getSystemInfoSync().windowWidth
  }
}
