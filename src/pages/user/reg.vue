<template>
  <view>
    <zk-head title="注册客户" :showHead="true"></zk-head>
    <zk-reg :widget="widget"></zk-reg>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        usercode: {},
        widget: {}
      }
    },
    onLoad (options) {
      this.widget.$route = options[0]
    }
  }
</script>
<style lang="scss" scoped>
</style>
