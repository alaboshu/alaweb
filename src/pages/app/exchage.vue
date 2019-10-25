<template>
  <view class="exchange">
    <!-- <zk-head title="交换通宝" :showHead="true"></zk-head> -->
    <zk-exchange></zk-exchange>
  </view>
</template>
<script>
  export default {
    mounted () {
      this.init()
    },
    methods: {
      init () {
        uni.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#f0f0f0'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .exchange {
    background-color: #f0f0f0;
  }
</style>
