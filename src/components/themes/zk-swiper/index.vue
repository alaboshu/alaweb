<template>
  <div v-if="async">
    <swiper :autoplay="false" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{height:swiperHeight+'px'}">
      <swiper-item v-if="showIntroductionBanner">
        <view @click="goLinks('/pages/introduction')">
          <img src="../../../static/img/Introduction/Introduction_banner.jpg" :style="{height:swiperHeight+'px'}" class="bgImg" />
        </view>
      </swiper-item>
      <swiper-item v-if="showIntroductionBanner">
        <view @click="goOpen()">
          <img src="../../../static/img/Introduction/7a0005ccfe81f49e04e10fb529add5d.jpg" :style="{height:swiperHeight+'px'}" class="bgImg" />
        </view>
      </swiper-item>
      <swiper-item v-for="(item,index) in widget.value.links" :key="index">
        <view :title="item.name" @click="goLinks(item.url.value)">
          <img :src="item.image" :alt="item.intro" :style="{height:swiperHeight+'px'}" class="bgImg" />
        </view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
 
  export default {
    
    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: '',
        windowWidth: '',
        showIntroductionBanner: false
      }
    },
    props: {
      widget: {},
      height: {
        type: Number,
        default: 150
      }
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.async = false
        this.widgetModel = await this.$api.themeWidget(this.widget)
        // this.swiperHeight = this.widget.value.height
        this.windowWidth = uni.getSystemInfoSync().windowWidth
        this.swiperHeight = this.windowWidth * Number(this.widget.value.height)
        this.async = true
        if (this.widget.route.path === undefined) {
          this.showIntroductionBanner = true
        }
        for (var i = 0; i < this.widget.value.links.length; i++) {
          if (this.widget.value.links[i].name === '企业公测') {
            this.widget.value.links.splice(i, 1)
          }
        }
      },
      goOpen () {
        window.location.href = 'https://m.qiniuniu99.com/pages/index?path=user_bookingsignup_show&id=5d0eedfdc9be611874c07fb8'
      },
      goLinks (url) {
        // window.location.href = 'https://m.qiniuniu99.com/pages/index?path=user_bookingsignup_show&id=5d0eedfdc9be611874c07fb8'
        this.$api.to(url)
      },
      watchWidget () {
        // this.async = false
        this.init()
        // this.swiperHeight = this.widget.value.height
        // this.async = true
      }
    },
    watch: {
      widget: 'watchWidget'
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  .uni-swiper-item {
    padding-top: 0px !important;
  }
  .uni-swiper {
    height: 180px;
  }
  .uni-swiper .uni-swiper-dot {
    width: 6px;
    height: 6px;
  }
  .bgImg {
    width: 100%;
  }
</style>
