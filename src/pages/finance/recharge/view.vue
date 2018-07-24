<template>
  <div class="pages-finance-recharge-view">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-preview v-if="asyncFlag" :widget="widget" :previewId="previewId"></zk-preview>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '充值详情'
    },
    data () {
      return {
        pageInfo: '',
        widget: '',
        previewId: '',
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
          apiUrl: 'Api/Recharge/RecharView'
        }
        this.previewId = this.$route.query.Id
        this.asyncFlag = true
      }
    }
  }
</script>


<style scoped lang="less">
  .pages-finance-recharge-view {
  	width: 100%;
  }
</style>

