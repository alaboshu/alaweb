<template>
  <view class="zk-popup-banner">
    <view>
      <view style="padding:200upx 15%;">
        <button type="primary" @tap="showBanner">打开弹窗</button>
      </view>
      <view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
        <view style="justify-content:flex-end;" @tap="closeBanner">
          <view style="justify-content:flex-end; text-align:right; padding:20upx;">
            <text class="uni-icon uni-icon-close"></text>
          </view>
        </view>
        <view>
          <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" style="width:100%;" mode="widthFix" />
        </view>
        <view style="padding:50upx 0; padding-bottom:68upx;">
          <button type='warn' class="mini-btn" style="background:#F6644D; margin:0 80upx;">一个按钮</button>
        </view>
      </view>
      <view class="uni-mask" v-if="bannerShow"></view>
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
        bannerShow: true
      }
    },
    props: {
      widget: {}
    },
    onBackPress () {
      if (this.bannerShow) {
        this.bannerShow = false
        return true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      closeBanner: function () {
        this.bannerShow = false
      },
      showBanner: function () {
        this.bannerShow = true
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
</style>

