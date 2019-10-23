<template>
  <view class="zk-successful-opening">
    <view class="successful-opening_return" @click="getReturn">
      <x-icon name="icon-zk-black" :color="'#ffffff'" :size="16"></x-icon>
    </view>
    <view class="successful-opening-container" :style="'height:'+uHeight+'px;'">
      <view class="success_opening_top">
        <view class="opening_top_logo">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-27/5cc3b1b999f89223c4f89fdc.png">
        </view>
        <view class="opening_top_title">
          <span>中亚联投集团/中亚国际</span>
          <span>深圳企品汇电子商务科技股份有限公司</span>
        </view>
      </view>
      <view class="left_back_img"></view>
      <view class="content_center" v-if="sucssModel.config">
        <view>
          <view class="opening_confirm">开通证明</view>
          <view class="confirm_line"></view>
        </view>
        <view class="confirm_name">{{sucssModel.config.name}}</view>
        <span v-if="sucssModel.config.password!==null" class="text_news">恭喜开通</span>
        <span v-else class="text_news">恭喜升级</span>
        <span class="text_news">您已是<b>{{sucssModel.name}}</b></span>
        <view style="margin-top:20px;">
          <view class="message_all" style="margin-left:20px;">
            <span class="login_news">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-29/5cc65c9cae6fed1c544dc7fc.png" alt="" class="news_icon">
              <span>登录账号&nbsp;{{sucssModel.config.mobile}}</span>
            </span>
            <span class="login_news" v-show="sucssModel.config.password!==null">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-29/5cc65c9cae6fed1c544dc7fa.png" alt="" class="news_icon">
              <span>登录密码&nbsp;{{sucssModel.config.password}}</span>
            </span>
            <span class="login_news" v-show="sucssModel.config.password!==null">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-29/5cc65c9cae6fed1c544dc7fb.png" alt="" class="news_icon">
              <span>支付密码&nbsp;{{sucssModel.config.payPassword}}</span>
            </span>
          </view>
        </view>
      </view>
      <view class="opening_stamp">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-27/5cc3b0b199f89223c4f78fc0.png" alt="">
      </view>
      <view class="opening_tap_message">
        <view class="platform_tap">平台温馨提示<span class="thright"></span></view>
        <span>请妥善保存开通证明</span>
        <span>并通过微信将证明图片发送给您的用户</span>
        <!--  <view class="opening_bottom">保存至相册</view> -->
      </view>
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
        viewModel: '',
        sucssModel: '',
        uHeight: ''
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
        this.viewModel = this.$user.loginUser()
        this.sucssModel = await this.$api.localGet('openSuccss')
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.uHeight = this.$api.screenHeight()
      },
      goReturn () {
        this.$api.back()
      },
      getReturn () {
        this.$router.push('/')
      }
    }
  }
</script>
