<template>
  <div>
    <div v-for="(widget,index) in pageInfo" :key="index">
      <zk-head :widget="widget" v-if="widget.path==='theme/zk-head'"></zk-head>
      <zk-swiper :widget="widget" v-if="widget.path==='theme/zk-swiper'"></zk-swiper>
      <zk-grid :widget="widget" v-if="widget.path==='theme/zk-grid'"></zk-grid>
      <zk-image :widget="widget" v-if="widget.path==='theme/zk-image'"></zk-image>
      <zk-top-nav :widget="widget" v-if="widget.path==='theme/top-nav'"></zk-top-nav>
      <zk-foot :widget="widget" v-if="widget.path==='theme/zk-foot'"></zk-foot>
    </div>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '测试一'
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
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages--test1 {
    width: 100%;
  }
</style>

