<template>
  <zk-login></zk-login>
</template>
<script>
  export default {
    created () {
      if (this.$user.isLogin()) {
        uni.reLaunch({
          url: '/pages/tabbar/user_index'
        })
      }
    }
  }
</script>
