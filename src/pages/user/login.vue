<template>
  <div class="pages-user-login">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <!-- <zk-auto-form :viewApi="viewApi" v-if="asyncFlag" :postApi="postApi"></zk-auto-form> -->
    <x-cell title="用户名/手机/邮箱登录"></x-cell>
    <x-input label="用户名:" placeHolder="请输入用户名/手机/邮箱登录" v-model="user.userName" :required="true"></x-input>
    <x-input label="密码:" placeHolder="请输入密码" v-model="user.userPassword" :required="true"></x-input>
    <x-box all=20>
      <x-button type="primary">登录</x-button>
    </x-box>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '会员登陆'
    },
    data () {
      return {
        pageInfo: '',
        viewApi: 'Api/User/GetLoginForm',
        postApi: 'Api/User/Login',
        asyncFlag: false,
        user: {
          userName: '',
          userPassword: ''
        }
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
  .pages-user-login {
    width: 100%;
  }
</style>

