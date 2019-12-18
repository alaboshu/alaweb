<template>
  <view class="zk-user-reg">
    <zk-auto-form :widget="widget" :afterSave="true" @afterSave="afterSave"></zk-auto-form>
  </view>
</template>


<script>
  export default {
    props: {
      widget: {}
    },
    methods: {
      afterSave (data) {
        if (data.status === 1) {
          var para = {
            username: data.mobile,
            password: data.password
          }
          var _this = this
          uni.showModal({
            title: '提示',
            content: '您已注册完成，点击确认立即登录',
            showCancel: false,
            success: () => {
              _this.$user.login(para)
            }
          })
        }
      }
    }
  }
</script>
