<template>
  <div v-if="this.viewModel">
    <div v-for="(layout,layoutIndex) in pageInfo.layouts" :key="layoutIndex">
      <zk-swiper :widget="pageInfo.widgets[0]"></zk-swiper>
      <zk-grid :widget="pageInfo.widgets[1]"></zk-grid>
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
          console.info('x-pageInfo', this.viewModel)
        } else {
          console.error('当前页面的PageInfo为空')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-page {
    font-size: @font-size-base;
  }
</style>
