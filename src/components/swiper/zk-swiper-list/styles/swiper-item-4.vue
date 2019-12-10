<template>
  <view class="swiper-item-4" v-if="swiperModel.swiperList">
    <view class="swiper-bgColor" :style="widget.style.css"></view>
    <view class="swiper-head">
      <search type="2"></search>
    </view>
    <view class="swiper-class">
      <swiperClass :widget="widget"></swiperClass>
    </view>
    <view class="swiper-cont">
      <swiper :autoplay="true" @change="changeSwiper" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{ height: swiperHeight + 'px' }">
        <swiper-item v-for="(item, index) in swiperModel.swiperList" :key="index">
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
  import search from '../search/index'
  import swiperClass from '../swiper-class/index'
  import mxins from './mixins'
  export default {
    mixins: [mxins],
    components: { swiperSearch, search, swiperClass },
    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: 120,
        windowWidth: '',
        swiperBgColor: '#421f7d',
        swiperList: []
      }
    },
    props: {
      swiperModel: {},
      widget: {},
      height: {
        type: Number,
        default: 150
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('aaaaaaaaaaaaa', this.widget.style.css)
      },
      goLinks (url) {
        this.$api.to(url)
      },
      changeSwiper (ev) {

      }
    },
    watch: {
      widget: 'watchWidget'
    }
  }
</script>
<style scoped lang="scss">
  @import "@/assets/style/variable.scss";

  .swiper-item-4 {
    position: relative;
    .swiper-bgColor {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 205px;
      background: #ff4a2d;
    }
    .swiper-head {
      width: 100%;
      position: relative;
      height: 45px;
    }
    .swiper-class {
      width: 100%;
      height: 30px;
      position: relative;
    }
    .swiper-cont {
      padding: 0 10px;
      margin-bottom: 10px;
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
