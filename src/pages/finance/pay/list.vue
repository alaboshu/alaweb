<template>
  <div class="pages-finance-pay-list">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-list v-if="asyncFlag" :widget="widget"></zk-list>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '收银台'
    },
    data () {
      return {
        pageInfo: '',
        widget: '',
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
        this.widget = {
          apiUrl: 'Api/Transfer/TransferList'
        }
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-finance-pay-list {
    width: 100%;
  }
</style>

