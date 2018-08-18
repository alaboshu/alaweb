<template>
  <div v-if="viewModel">
    <div v-for="(layout,layoutIndex) in viewModel.layouts" :key="layoutIndex">
      <x-widget :widgets="layout.widgets"></x-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-page',
    props: {
      pageInfo: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.pageInfo !== undefined) {
          this.viewModel = this.pageInfo
          console.info('x-pageInfo', this.pageInfo)
        } else {
          console.error('当前页面的PageInfo为空')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .mobile-x-page {
    font-size: @font-size-base;
  }
</style>
