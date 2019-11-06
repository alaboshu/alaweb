<template>
  <view style="background: #f0f0f0">
    <x-countDown></x-countDown>
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
<style lang="scss" scoped></style>
