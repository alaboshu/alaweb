<template>
  <view class="add">
    <zk-grid-list></zk-grid-list>
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
  @import "@/assets/border/styles/index.scss";
</style>
