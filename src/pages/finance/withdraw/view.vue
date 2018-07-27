<template>
  <div class="pages-finance-withdraw-view">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-preview v-if="asyncFlag" :widget="widget" :previewId="previewId"></zk-preview>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '提现详情'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        widget: '',
        previewId: ''
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
          apiUrl: 'Api/WithDraw/Get'
        }
        this.previewId = this.$route.query.Id
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-finance-withdraw-view {
    width: 100%;
  }
</style>

