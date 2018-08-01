<template>
  <div>
    tabel132 {{viewModel}}
    <zk-product-item></zk-product-item>
    <zk-swiper></zk-swiper>
    <x-product-item :elementData="viewModel"></x-product-item>
  </div>
</template>

<script>
  // import { THEME_GETLINK_GET } from '@/service/api/apiUrl'
  import { THEME_GETPAGE_GET, THEME_GETLINK_GET } from '@/service/api/apiUrl'
  // import api from '@/service/api'
  export default {
    config: {
      'navigationBarTitleText': '测试'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        viewModel: '' // 数据模型
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        console.info(this.$api)
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        const para = {
          diyKey: 'grid_index'
        }
        this.viewModel = await this.$api.get(THEME_GETLINK_GET, para)
        console.log('viewModelviewModelviewModelviewModelviewModelviewModel', this.viewModel)
        this.asyncFlag = true
        console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 72px;
    padding: 50px;
    width: 750px;
    color: #309bf8;
    text-align: center;
  }
</style>
