export default {
  onShow () {
    this.isLogin()
  },
  onReady () {
    this.isLogin()
  },
  methods: {
    isLogin () {
      if (this.$user.isLogin() === false) {
        uni.showModal({
          title: '未登录',
          content: '请先登录',
          success: res => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/user/login'
              })
            } else if (res.cancel) {
              uni.reLaunch({
                url: '/'
              })
            } else {
              // this.init()
            }
          }
        })
      }
    }
  }
}
