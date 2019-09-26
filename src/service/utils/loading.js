export default {
  open (time = 0) {
    return setTimeout(() => {
      uni.showLoading({
        title: '加载中..'
      })
    }, time)
  },
  close (timer) {
    uni.hideToast()
    uni.hideLoading()
    clearTimeout(timer)
  }
}
