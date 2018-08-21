<template>
  <div class="pages-user-index">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <zk-grid></zk-grid>
    <x-cell title="退出登录" isLink @click="logOut()"></x-cell>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '会员中心'
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
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      },
      logOut () {
        this.$local.removeStore('user')
        window.localStorage.removeItem('wechat_openId')
        window.localStorage.setItem('wechat_autoLoginByOpenId', false) // 微信不根据openId自动登录
        this.$toast.warn('退出登录成功')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-index {
    width: 100%;
  }
</style>

