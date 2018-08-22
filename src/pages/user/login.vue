<template>
  <div class="pages-user-login">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <x-cell title="用户名/手机/邮箱登录"></x-cell>
    <x-input label="用户名:" placeHolder="请输入用户名/手机/邮箱登录" v-model="user.username" :required="true"></x-input>
    <x-input label="密码:" type="password" placeHolder="请输入密码" v-model="user.password" :required="true"></x-input>
    <x-box all=20>
      <x-button type="primary" @click="login()">登录</x-button>
    </x-box>
    <div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__links">
          <a href="/pages/user/findpassword">找回密码</a>
          <a href="/pages/user/reg">会员注册</a>
        </p>
      </div>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGEINFO_GET, USER_LOGIN_POST } from '@/service/api/apiUrl'
  export default {
    data () {
      return {
        pageInfo: '',
        viewModel: '',
        user: {
          username: '',
          password: ''
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.pageInfo = await this.$api.get(THEME_GETPAGEINFO_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
      },
      async login () {
        this.viewModel = await this.$api.post(USER_LOGIN_POST, this.user)
        // this.$local.setStore('user', this.viewModel)
        // this.$toast.succee('登录成功')
        // this.$router.push('/pages/user/index')
      }
    }
  }
</script>

<style scoped lang="less">
  .pages-user-login {
    width: 100%;
    .weui-msg__extra-area {
      width: 100%;
      .weui-footer {
        margin: 0 auto;
        .weui-footer__links {
          margin: 15px 10px 0 0;
          text-align: right;
        }
      }
    }
  }
</style>

