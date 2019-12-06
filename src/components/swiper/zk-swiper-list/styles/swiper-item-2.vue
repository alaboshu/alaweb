<template>
  <view class="swiper-item-2">
    <view class="swiper-bgColor" :style="{background: swiperBgColor}"></view>
    <view class="swiper-head">
      <swiper-search></swiper-search>
    </view>
    <view class="swiper-cont">
      <swiper :autoplay="true" @change="changeSwiper" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{ height: swiperHeight + 'px' }">
        <swiper-item v-for="(item, index) in swiperModel" :key="index">
          <view :title="item.name" @click="goLinks(item.url.value)">
            <img :src="item.image" :alt="item.intro" :style="{ height: swiperHeight + 'px' }" class="bgImg" />
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
  import swiperSearch from './swiper-search'
  export default {
    components: { swiperSearch },
    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: 150,
        windowWidth: '',
        swiperBgColor: '#421f7d'
      }
    },
    props: {
      swiperModel: {},
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
      async init () {
        this.swiperBgColor = this.swiperModel[0].colors
      },

      goLinks (url) {
        this.$api.to(url)
      },
      changeSwiper (ev) {
        console.info('您好呀', ev.detail.current)
        this.swiperBgColor = this.swiperModel[ev.detail.current].colors
      }
    },
    watch: {
      widget: 'watchWidget'
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  .swiper-item-2 {
    position: relative;
    .swiper-bgColor {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 150px;
      background: #421f7d;
      border-radius: 0 0 15px 15px;
      z-index: -1;
    }
    .swiper-head {
      width: 100%;
    }
    .swiper-cont {
      padding: 0 10px;
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
        border-radius: 15px;
      }
    }
  }
</style>
