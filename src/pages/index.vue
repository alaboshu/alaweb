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

<style >
  .title {
  	font-size: 72px;
  	padding: 50px;
  	width: 750px;
  	color: #309bf8;
  	text-align: center;
  }
  diy {
  	position: relative;
  }
  .diy_box {
  	position: absolute;
  	width: 500px;
  	height: 500px;
  	z-index: 99999;
  	outline: 1px solid #4aa3cc;
  	background: rgba(192, 222, 237, 0.5);
  }
  .diy_box-item {
  	position: absolute;
  	right: 0;
  	top: 0;
  	display: flex;
  }
  .diy_box-item li {
  	background: #666;
  	border-right: 1px solid #000;
  	font-size: 14px;
  	color: #fff;
  	padding: 2px 5px;
  	cursor: pointer;
  }
</style>
