<template>
  <div class="pages-user-recuser">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-list v-if="asyncFlag" :widget="widget"></zk-list>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '充值记录'
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
        this.widget = {
          apiUrl: 'Api/Recharge/RechargeList'
        }
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.asyncFlag = true
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-finance-recharge-list {
    width: 100%;
  }
</style>

