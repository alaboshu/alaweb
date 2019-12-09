<template>
  <view class="zk-login">
    <view class="pushButton" v-if="returnButtom" @click="onBack">
      <!-- <x-icon name="zk-arrows-left_black" size="16" :color="'#999999'"></x-icon> -->
    </view>
    <view class="form-login">
      <view class="form-login_box">
        <image class="form-login_img" src="http://www.szwft.me/img/logo.jpg" alt="" />
      </view>
    </view>
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
      <!-- <div class="btn-row-login" @click="bindLogin">
        登录
      </div> -->
      <x-button :loading="loading" btnText="登录" @change="bindLogin"></x-button>
    </view>
    <view class="action-row">
      <view class="navigator" v-for="(item, index) in widgetModel.loginForm" :key="index" @click="$base.to(item.link.url)">{{item.link.name}}</view>
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
        returnButtom: true,
        user: {
          username: '',
          password: ''
        },
        positionTop: 0,
        vaild: false,
        vaild2: false,
        hasProvider: '',
        loading: false
      }
    },
    props: {
      widget: {}
    },
    created () {
      if (this.$user.isLogin()) {
        uni.reLaunch({
          url: '/pages/user/index'
        })
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        console.info('this.widget', this.widget.value)
        if (this.widget && this.widget.value) {
          this.widgetModel = this.widget.value
        }
      },
      onBack () {
        this.$api.back('login')
      },
      initPosition () {
        /**
           * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
           * 反向使用 top 进行定位，可以避免此问题。
           */
        this.positionTop = this.$api.getSystemInfoSync().windowHeight - 100
      },
      async bindLogin () {
        this.loading = true
        this.$user.login(this.user)
        setTimeout(() => {
          this.loading = false
        }, 300)
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

<style rel="stylesheet/scss" lang="scss">
  @import "./index.scss";
</style>

