<template>
  <view class="add">
    <x-region></x-region>
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
