<template>
  <div>
    <zk-top-nav></zk-top-nav>
    <zk-swiper></zk-swiper>
    <zk-grid></zk-grid>
    <zk-image></zk-image>
    <zk-product-item></zk-product-item>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '测试'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        style: '',
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        console.info('页面信息', this.pageInfo)
        this.asyncFlag = true
      }
    }
  }
</script>

<style >
</style>
