<template>
  <div class="wx-login">
    <view>小程序登录</view>
    <button form-type="submit" open-type="getUserInfo" bindgetuserinfo="getUserInfo"></button>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.init()
    },
    methods: {
      init () {
        wx.getUserInfo({
          success: (res) => { }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wx-login {
    color: #ffffff;
  }
</style>
