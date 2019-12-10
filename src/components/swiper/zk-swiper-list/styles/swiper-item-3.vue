<template>
  <view class="swiper-item-3">
    <view class=""></view>
    <view class="swiper-cont">
      <swiper :style="{width: '100%', height: swiperHeight+'px;'}" :indicator-dots="true" indicator-color="#ebedf0" indicator-active-color="#c91230" :autoplay="true" :circular="true" @change="changeSwiper" previous-margin="20px" next-margin="20px">
        <swiper-item v-for="(item, index) in swiperModel.swiperList" :key="index">
          <view :style="{
            boxSizing: 'border-box', 
            display: 'flex',
            transform: curIndex===index?'scale(' + 1.02 + ',' + 1.08 + ')':'scale(1,1)',
            transitionDuration: '.5s',
            transitionTimingFunction: 'ease',
            height: swiperHeight+'px',
            padding: curIndex===0?((index===listLen-1)?'10px 26rpx 0 0':(index===1?'10px 0 0 26rpx':'10px 0 0 0')):(curIndex===listLen-1?(index===0?'10px 0 0 26rpx':(index===listLen-2?'10px 26rpx 0 0':'10px 0 0 0')):(index===curIndex-1?'10px 26rpx 0 0':(index===curIndex+1?'10px 0 0 26rpx':'10px 0 0 0')))
          }">
            <img :src="item.image" :alt="item.intro" :style="{
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }" class="bgImg" />
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  import swiperSearch from './swiper-search'
  import mxins from './mixins'
  export default {
    mixins: [mxins],
    components: { swiperSearch },
    props: {
      swiperModel: {},
      height: {
        type: Number,
        default: 150
      },
      scaleX: {
        type: String,
        default: (634 / 550).toFixed(4)
      },
      scaleY: {
        type: String,
        default: (378 / 328).toFixed(4)
      }
    },

    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: 170,
        windowWidth: '',
        swiperBgColor: '#421f7d',
        swiperList: [],
        curIndex: 0
      }
    },
    computed: {
      listLen () {
        return this.swiperList.length
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      goLinks (url) {
        this.$api.to(url)
      },
      changeSwiper (ev) {
        this.curIndex = ev.detail.current
        // this.swiperBgColor = this.swiperList[ev.detail.current].colors
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-item-3 {
    .swiper-cont {
      width: 100%;
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

    @keyframes descAnimation {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0.5;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    @-webkit-keyframes descAnimation {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0.5;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    .hideAndShowDesc {
      animation: descAnimation 0.3s ease 1;
      -webkit-animation: descAnimation 0.3s ease 1;
    }
  }
</style>
