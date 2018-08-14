<template>
  <div v-if="viewModel">
    <zk-swiper :widget="pageInfo.widgets[0]" v-if="pageInfo.path==='theme/zk-swiper'"></zk-swiper>
    <zk-grid :widget="pageInfo.widgets[1]"></zk-grid>
    <zk-image :widget="pageInfo.widgets[2]"></zk-image>
    <!-- <zk-product-item></zk-product-item>
    <zk-foot></zk-foot> -->
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
          console.info('页面信息', this.viewModel)
        } else {
          console.info('pageInfo内容为空')
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
