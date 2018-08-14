<template>
  <div class="pages-finance-withdraw-add">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <zk-auto-form :viewApi="viewApi" :postApi="postApi"></zk-auto-form>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '提现申请'
    },
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/Withdraw/GetWithDrawForm',
        postApi: 'Api/Withdraw/add',
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
  @import '~_style/index.less';
  .pages-finance-withdraw-add {
    width: 100%;
    .withdraw-add_btn {
      padding: 2rem 0.6rem;
      button {
        background: @brand;
        color: #fff;
        text-align: center;
        height: 3rem;
        width: 100%;
        line-height: 3rem;
        font-size: @h4-font-size;
        border-radius: 4 * @rem;
      }
    }
  }
</style>

