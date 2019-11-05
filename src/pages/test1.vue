<template>
  <view style="background: #f0f0f0">
    <zk-tabber></zk-tabber>
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
  onLoad () {
    uni.hideTabBar()
  },
  mounted () {
    this.init()
    uni.hideTabBar()
  },

  onLoad (option) {},
  onReachBottom () {},
  onPullDownRefresh () {},
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
