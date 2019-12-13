<template>
  <view class="add">
    <span class="i-name icon-topsearch">icon-topsearch</span>
    <x-icon name="icon-upgrad"></x-icon>
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
        this.viewModel2 = this.$api.vuexGet('test343434')
        console.info('this.viewModel2', this.viewModel2)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/border/styles/index.scss";
</style>
