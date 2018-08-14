<template>
  <div class="pages-user-password-login">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <zk-auto-form :viewApi="viewApi" :postApi="postApi"></zk-auto-form>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '修改密码'
    },
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/User/GetPasswordForm',
        postApi: 'Api/User/ChangePassword',
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
  .pages-user-password-login {
    width: 100%;
  }
</style>

