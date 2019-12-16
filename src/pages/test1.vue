<template>
  <view class="add">
    <zk-cart type="2"></zk-cart>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          name: '测试热源'
        },
        viewModel2: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.$api.vuexLocalSet('test343434', this.viewModel)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/border/styles/index.scss";
</style>
