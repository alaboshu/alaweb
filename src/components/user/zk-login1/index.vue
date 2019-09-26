<template>
  <!-- <view class="zk-login1">{{widgetModel}}</view> -->
  <view>
    <view class="login_list">
      <image class="login_images" src="/../../static/img/login.png" />
    </view>
    <view class="input_box">
      <view class="phone_text">
        <view class="mobei_conter">
          <view class="text_1">
            <i class="icon iconfont zk-mobilephone icontsty"></i>
          </view>
          <view class="text_2 borderleft">
            <input class="phope" placeholder="请输入手机号/账号" v-model="user.username" />
          </view>
        </view>
        <view class="mobei_conter topmar">
          <view class="text_1">
            <i class="icon iconfont zk-combinationlock icontsty"></i>
          </view>
          <view class="text_2">
            <input class="phope vercate" placeholder="请输入密码" v-model="user.password" :password="showPassword" />
            <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom_le">
      <button class="buttoms" @click="bindLogin">登录</button>
      <view class="posiconter" style="display:none">
        <x-a class="wanmma" path="/pages/index?path=user_password_find">忘记密码？</x-a>
        <x-a class="zuce" path="/pages/user/reg">注册</x-a>
      </view>
    </view>
    <view class="foot_bot" style="display:none">
      <navigator class="bor_bott">
        <view>
          <i class="icon iconfont zk-vxpay fontsizes"></i>
        </view>
        <view class="conter_wx">
          微信登录
        </view>
      </navigator>
      <navigator class="bor_bott">
        <view>
          <i class="icon iconfont zk-qq fontsizes"></i>
        </view>
        <view class="conter_wx">
          QQ登录
        </view>
      </navigator>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        showPassword: true,
        user: {
          username: '',
          password: ''
        },
        viewModel: ''
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
        this.$user.loginTo()
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      },
      async bindLogin () {
        this.$user.login(this.user)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-login1 {
    font-size: $gl-size-base;
  }
  .login_list {
    width: 100%;
    text-align: center;
    padding: 45px 0px;
  }
  .login_images {
    width: 150px;
    height: 60px;
  }
  .input_box {
    padding: 0px 20px;
  }
  .phone_text {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 1px 15px $gl-border1;
    padding: 15px 10px;
  }
  .mobei_conter {
    display: flex;
    align-items: center;
  }
  .icontsty {
    font-size: 22px;
    color: $gl-text3;
  }
  .phope {
    font-size: 12px;
    flex: 1;
    height: 35px;
    input {
      height: 35px;
    }
  }
  .text_1 {
    padding-right: 10px;
  }
  .text_2 {
    flex: 1;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .borderleft {
    box-sizing: border-box;
    position: relative;
  }
  .borderleft::before {
    content: "";
    width: 1px;
    height: 35px;
    border-left: 1px solid #e5e5e5;
    position: absolute;
    left: 0px;
    top: 0px;
    transform: scaleY(0.5);
  }
  .bottom_le {
    padding: 0px 20px;
    margin-top: 30px;
  }
  .buttoms {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: $gl-light;
    background-color: $gl-brand;
    &:active {
      opacity: 0.8;
    }
  }
  .posiconter {
    margin-top: 5px;
    overflow: hidden;
  }
  .wanmma {
    color: $gl-text2;
    float: left;
  }
  .zuce {
    color: $gl-brand;
    float: right;
  }
  .foot_bot {
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    display: none;
  }
  .bor_bott {
    text-align: center;
    flex: 1;
  }
  .fontsizes {
    font-size: 50px;
  }
  .zk-vxpay {
    color: #52c43c;
  }
  .zk-qq {
    color: #429ffc;
  }
  .conter_wx {
    color: $gl-text3;
    margin-top: -15px;
  }
</style>
