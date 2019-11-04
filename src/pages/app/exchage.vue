<template>
  <view class="exchange">
    <zk-exchange ref="zkChange"></zk-exchange>
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
          frontColor: '#ffffff',
          backgroundColor: '#C81432'
        })
      }
    },
    onShow () {
      this.$nextTick(() => {
        this.$refs.zkChange.init()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .exchange {
    background-color: #f0f0f0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    position: fixed;
  }
</style>
