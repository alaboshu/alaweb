<template>
  <div class="pages-user-identity-index">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <zk-auto-form :viewApi="viewApi" :postApi="postApi"></zk-auto-form>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '实名认证'
    },
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/UserDetail/GetIdentityForm',
        postApi: 'Api/UserDetail/Identity',
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
  .pages-user-identity-index {
    width: 100%;
  }
</style>

