<template>
  <zk-auto-form type="UserRegMobileForm" @afterSave="afterSave" :afterSave="true" v-model="viewModel"></zk-auto-form>
</template>

<script>
  export default {
    data () {
      return {
        isMsg: false,
        viewModel: {
          parentUserName: 'adminsssss'
        }
      }
    },
    created () {
      if (this.$user.isLogin()) {
        uni.reLaunch({
          url: '/pages/user/index'
        })
      }
    },
    props: {
      widget: {}

    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.viewModel.parentUserName = this.widget.$route.usercode
      },
      afterSave (data) {
        // 注册成功后自动登录
        var para = {
          username: data.mobile,
          password: data.password
        }
        var _this = this
        if (data.status === 1) {
          uni.showToast({
            title: '您已注册成功，自动登录中...',
            icon: 'none',
            success: () => {
              _this.$user.login(para)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
