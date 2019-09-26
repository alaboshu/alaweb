export default {
  success (message) {
    uni.showToast({
      title: message,
      duration: 4000
    })
  },
  warn (message) {
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 4000
    })
  },
  botton (message) {
    uni.showToast({
      title: message,
      duration: 4000
    })
  },
  center (message) {
    uni.showToast({
      title: message,
      duration: 4000
    })
  }
}
