<template>
  <div class="pages-user-reg">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <zk-auto-form :viewApi="viewApi" v-if="asyncFlag" :postApi="postApi"></zk-auto-form>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  // import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '会员注册'
    },
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/User/GetRegForm',
        postApi: 'Api/User/Reg',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        // this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-reg {
    width: 100%;
  }
</style>

