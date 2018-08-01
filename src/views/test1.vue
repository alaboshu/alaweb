<template>
  <div class="pages-test1">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-grid></zk-grid>
    <div style="height:800px"></div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    data () {
      return {
        pageInfo: '',
        asyncFlag: false
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll())
      this.init()
    },
    methods: {
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        console.log('scrollTop', scrollTop)
      },
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
  .pages-test1 {
    width: 100%;
  }
</style>

