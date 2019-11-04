<template>
  <view class="recharge">
    <zk-recharge-block :widget="widget"></zk-recharge-block>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        widget: {}
      }
    },
    onLoad (options) {
      this.widget = options[0]
    }
  }
</script>
<style lang="scss" scoped>
  .recharge {
    width: 100%;
    height: 100%;
    background: #f7f8fa;
  }
</style>
