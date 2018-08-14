<template>
  <div class="pages-finance-bill-list">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-list></x-list>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '财务记录'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-finance-bill-list {
    width: 100%;
    .weui-panel:after {
      border: none !important;
    }
    .mescroll-upwarp {
      display: none !important;
    }
    .weui-media-box {
      padding: 0.5rem;
    }
    .weui-media-box__hd {
      margin: 10px auto;
      .brand {
        width: 50 * @rem;
        height: 50 * @rem;
        padding-top: 0.1rem;
        border-radius: 50%;
      }
    }

    .weui-media-box__title {
      color: #000;
    }
    .weui-media-box__bd {
      padding-left: 0.1rem;
    }
    .weui-media-box__desc {
      padding-top: 0.3rem;
      font-size: @h6-font-size;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .weui-media-box__title__extra {
      font-size: @h5-font-size;
      font-weight: bold;
      float: right;
    }
  }
</style>

