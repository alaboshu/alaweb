<template>
  <view class="zk-qnn-login">
    <view class="qnn-login_head">
      <view class="qnn-login-image">
        <image class="login_phon" src="http://www.szwft.me/img/logo.jpg" alt="文房四宝" />
      </view>
    </view>
    <view class="qnn-login_text">
      <view class="qnn_input">
        <input class="input-conter" v-model="user.username" placeholder="请输入手机号/用户名/邮箱" />
      </view>
      <view class="qnn_input input-marginTop">
        <input :password="showPassword" class="input-conter" v-model="user.password" placeholder="请输入登录密码" />
        <view class="uni-icon uni-icon-eye input-icon" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
      </view>
    </view>
    <view class="register-box">
      <view class="register-bottom" @click="bindLogin">登录</view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        user: {
          username: '',
          password: ''
        },
        showPassword: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      async bindLogin () {
        this.$user.login(this.user)
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      }
    }
  }
</script>
