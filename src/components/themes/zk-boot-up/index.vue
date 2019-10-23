<template>
  <view class="zk-boot-up" v-if="showBootUp">
    <swiper class="swiper" :style="'height:'+height+'px'" indicator-dots="true">
      <swiper-item>
        <view class="swiper-item startup-item" :style="'padding-bottom:'+topPadding+'px'">
          <div class="start-info">
            <div class="start-info-title">
              用心精选产品
            </div>
            <p>热门爆款</p>
            <p>在这里</p>
          </div>
          <div class="startup-img " :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/apiImg/1AD.JPG" alt="">
          </div>
        </view>
      </swiper-item>
      <swiper-item>
        <view class=" swiper-item startup-item" :style="'padding-bottom:'+topPadding+'px'">
          <div class="start-info">
            <div class="start-info-title">
              用心精选产品
            </div>
            <p>总有超高</p>
            <p>性价比</p>
          </div>
          <div class="startup-img " :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/apiImg/2AD.jpg" alt="" :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
          </div>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item startup-item" :style="'padding-bottom:'+topPadding+'px'">
          <div class="start-info">
            <div class="start-info-title">
              用心精选产品
            </div>
            <p>会员玩法</p>
            <p>享特权</p>
          </div>
          <div class="startup-img " :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
            <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/apiImg/3AD.jpg" alt="" :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
          </div>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item startup-item" :style="'padding-bottom:'+topPadding+'px'">
          <div class="start-info">
            <div class="start-info-title">
              用心精选产品
            </div>
            <p>会员玩法</p>
            <p>享特权</p>
          </div>
          <div class="startup-start " :style="'width:'+imgWidth+'px;height:'+imgWidth+'px'">
            <div class="start-logo">
              <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/apiImg/228.jpg">
            </div>
            <div class="start-btn" @click="closeBootUp">
              开享文房四宝之旅
            </div>
          </div>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        title: 'swiper',
        background: ['color1', 'color2', 'color3'],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        height: 0,
        imgWidth: 0,
        topPadding: 0,
        showBootUp: true
      }
    },
    props: {
      widget: {}
    },
    onLoad (option) {

    },
    mounted () {
      var infoSync = this.$api.getSystemInfoSync()
      this.height = infoSync.screenHeight
      this.imgWidth = infoSync.screenWidth
      this.topPadding = this.imgWidth + 40
      this.init()
    },
    methods: {
      closeBootUp () {
        this.showBootUp = false
        uni.showTabBar()
        this.$emit('showDefault')
      },
      async init () {
        // this.widgetModel = await this.$api.themeWidget(this.widget)

      },
      changeIndicatorDots (e) {
        this.indicatorDots = !this.indicatorDots
      },
      changeAutoplay (e) {
        this.autoplay = !this.autoplay
      },
      intervalChange (e) {
        this.interval = e.target.value
      },
      durationChange (e) {
        this.duration = e.target.value
      }
    }
  }
</script>
<style lang="scss" scoped>
  .zk-boot-up {
    position: relative;
    z-index: 999;
    background: #ffffff;
  }
  .swiper {
    height: 300upx;
  }
  .swiper-item {
    display: block;
    height: 100%;
    text-align: center;
  }

  .swiper-list {
    margin-top: 40upx;
    margin-bottom: 0;
  }

  .uni-common-mt {
    margin-top: 60upx;
    position: relative;
  }

  .info {
    position: absolute;
    right: 20upx;
  }
  .startup-item {
    padding: 40px 0;
    position: relative;
    .start-info {
      height: 200px;
      .start-info-title {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 24px;
        text-align: center;
        letter-spacing: 4px;
      }
      p {
        font-size: 42px;
        letter-spacing: 4px;
        text-align: center;
        font-weight: none;
        margin-bottom: -15px;
      }
    }
    .startup-img,
    .startup-start {
      position: absolute;
      top: 250px;
      left: 0;
      width: 100%;
      z-index: 1000;
      .start-logo {
        width: 150upx;
        height: 150upx;
        margin: 0 auto;
        margin-top: 80px;
        img {
          width: 150upx;
          height: 150upx;
        }
      }
      .start-btn {
        margin: 80px auto 0 auto;
        width: 60%;
        height: 50px;
        border-radius: 30px;
        border: 2px solid #e5e5e5;
        color: #999;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
    .startup-img {
      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
