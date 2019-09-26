<template>
  <view class="content">
    <view class="head_yh">
      <label class="head_top">用户名/手机/邮箱登录</label>
    </view>
    <view class="input-group">
      <view class="input-row border befer fe_left">
        <view class="view_conter">
          <label class="title" :class="{'title_color':vaild==true}">用户名</label>
        </view>
        <view class="view_input">
          <input class="place_input" focus="onFocus" @input="onInput" type="text" v-model="user.username" placeholder="请输入用户名/手机/邮箱登录" ref="inpts">
        </view>
        <view class="icon_i">
          <i class="zkwarncolor icon iconfont zk-warn" :class="{'icon_color':vaild==true}" v-if="vaild"></i>
        </view>
      </view>
      <view class="input-row border befer after">
        <view class="view_conter">
          <label class="title" :class="{'title_color':vaild2==true}">密码</label>
        </view>
        <view class="view_input">
          <input class="place_input" @input="onMinput" @clkick="focus" type="text" password="true" v-model="user.password" placeholder="请输入密码" ref="inpts">
        </view>
        <view class="icon_i">
          <i class="zkwarncolor icon iconfont zk-warn" :class="{'icon_color':vaild2==true}" v-if="vaild2"></i>
        </view>
      </view>
    </view>
    <view class="btn-row">
      <!-- <button type="primary" class="primary" @click="bindLogin">登录</button> -->
      <div class="btn-row-login" @click="bindLogin">
        登录
      </div>
    </view>
    <view class="action-row">
      <navigator class="navigator" url="/pages/index?path=user_reg">注册账号</navigator>
      <navigator class="navigator" url="/pages/index?path=user_password_find">忘记密码</navigator>
    </view>
    <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
      <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
        <image :src="provider.image" @click="oauth(provider.value)" />
      </view>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        showPassword: true,
        widgetModel: {},
        viewModel: {},
        user: {
          username: '',
          password: ''
        },
        positionTop: 0,
        vaild: false,
        vaild2: false,
        hasProvider: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      initPosition () {
        /**
           * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
           * 反向使用 top 进行定位，可以避免此问题。
           */
        this.positionTop = this.$api.getSystemInfoSync().windowHeight - 100
      },
      async bindLogin () {
        this.$user.login(this.user)
      },
      onFocus (e) {
        if (e.detail.value === '') {
          this.vaild = true
        }
      },
      onInput (e) {
        if (e.detail.value === '') {
          this.vaild = true
        } else {
          (
            this.vaild = false
          )
        }
      },
      onMa (e) {
        if (e.detail.value === '') {
          this.vaild2 = true
        }
      },
      onMinput (e) {
        if (e.detail.value === '') {
          this.vaild2 = true
        } else {
          (
            this.vaild2 = false
          )
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/variable.scss";

  .login-box {
    background-color: rgb(248, 248, 248);
  }
  .uni-common-mt {
    margin-top: 0;
    padding: 0px 10px;
  }
  uni-button {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: #fff;
    background-color: $gl-brand;
  }
  .action-row {
    padding: 0 20px;
    text-align: right;
  }

  .action-row .navigator {
    display: inline-block;
    margin-left: 10px;
    color: #586c94;
  }

  .oauth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .oauth-image {
    width: 100px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 100px;
    margin: 0 40px;
    background-color: #ffffff;
  }

  .oauth-image image {
    width: 60px;
    height: 60px;
    margin: 20p x;
  }
  .head_yh {
    padding: 10px 15px;
  }
  .head_top {
    font-size: 18px;
    color: $gl-themeColor;
    font-weight: 600;
  }
  .view_conter {
    width: 80px;
  }
  .border {
    display: flex;
    align-items: center;
    padding: 8px 15px;
  }
  .befer {
    position: relative;
  }
  .befer::before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
  .after::after {
    content: " ";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 0;
    z-index: 2;
  }
  .fe_left::before {
    left: 0px;
  }
  .title {
    font-size: 13px;
  }
  .view_input {
    flex: 1;
  }
  .place_input {
    font-size: 13px;
  }
  .btn-row {
    padding: 20px 15px;
    .btn-row-login {
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      color: #ffffff;
      background-color: #c81432 !important;
      text-align: center;
      border-radius: 10px;
    }
  }
  .icon_i {
    height: 28px;
  }
  .title_color {
    color: $gl-danger;
  }
  .icon_color {
    color: $gl-danger;
  }
  .primary {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: $gl-light;
    background-color: $gl-themeColor !important;
  }
</style>
