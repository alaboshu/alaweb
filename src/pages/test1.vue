<template>
  <view class="add">
    你可以显示不
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: null,
        array: ['中国', '美国']
      }
    },
    mounted () {
      this.init()
      uni.hideTabBar()
    },
    onReachBottom () { },
    onPullDownRefresh () { },
    methods: {
      init () {
        this.viewModel = {
          classIds: [],
          isPage: true,
          styleStype: 'single'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .add {
    width: 100px;
    height: 100px;
    background: linear-gradient(20deg, red 10%, green 65%);
  }
</style>
