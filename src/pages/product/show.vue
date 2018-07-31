<template>
  <div class="pages-product-show">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <!-- <show-thumbnail :height="bodyWidth"></show-thumbnail>
    <show-title></show-title>
    <ShowParameter></ShowParameter>
    <show-intro></show-intro>
    <show-recommend></show-recommend>
    <show-bar></show-bar> -->
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  // import ShowThumbnail from './_h5/show_thumbnail'
  // import ShowTitle from './_h5/show_title'
  // import ShowParameter from './_h5/show_parameter'
  // import ShowIntro from './_h5/show_intro'
  // import ShowRecommend from './_h5/show_recommend'
  // import ShowBar from './_h5/show_bar'
  export default {
    config: {
      'navigationBarTitleText': '商品详情'
    },
    // components: {
    //   ShowThumbnail,
    //   ShowTitle,
    //   ShowParameter,
    //   ShowIntro,
    //   ShowRecommend,
    //   ShowBar
    // },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        bodyWidth: document.body.clientWidth
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-product-show {
    width: 100%;
  }
</style>

