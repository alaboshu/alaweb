<template>
  <view class="zk-new-login">
    <transition name="fade">
      <view class="login_index_mask" :style="'height:'+uHeight+'px'" v-show="index_logo_show" @click="showLogo">
        <view class="close_login_index">
          <x-icon name="icon-zk-cuowu" size="28" color="#666"></x-icon>
        </view>
        <view class="login_index_logo" @click="showLogo">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-20/5d0b30bb3489822388b7a96a.png" alt="">
        </view>
        <view class="bag_line">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-20/5d0b3a213489822388b7aa29.png" alt="">
        </view>
        <view class="bag_img">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-20/5d0b3dc33489822388b7aae0.png" alt="">
        </view>
      </view>
    </transition>
    <view class="new_login_container" v-show="showContainer">
      <view class="new_login_logo">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-20/5d0b2f363489822388b7a91d.png" alt="">
      </view>
      <view class="new_login_content_bg">
        <view class="new_login_content"></view>
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
        uHeight: '',
        index_logo_show: false,
        showContainer: false
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
        // this.widgetModel = await this.$api.themeWidget(this.widget, editSetting.config)
        this.index_logo_show = true
        this.uHeight = this.$api.getSystemInfoSync().screenHeight
      },
      showLogo () {
        this.index_logo_show = false
        this.showContainer = true
      }
    }
  }
</script>
