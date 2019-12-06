<template>
  <view class="swiper-item-1">
    <swiper :autoplay="false" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{ height: swiperHeight + 'px' }">
      <swiper-item v-for="(item, index) in swiperModel" :key="index">
        <view :title="item.name" @click="goLinks(item.url.value)">
          <img :src="item.image" :alt="item.intro" :style="{ height: swiperHeight + 'px' }" class="bgImg" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: 150,
        windowWidth: ''
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
      },

      goLinks (url) {
        this.$api.to(url)
      },
      watchWidget () {
        this.init()
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
