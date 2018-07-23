<template>
  <div class="pages-user-view">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-preview v-if="asyncFlag" :widget="widget" :previewId="previewId"></zk-preview>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '会员详情'
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
        this.widget = {
          apiUrl: 'Api/User/Preview'
        }
        this.previewId = this.$route.query.id
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-view {
    width: 100%;
  }
</style>

