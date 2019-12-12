<template>
  <view class="show-thumbnail" v-if="productView && async">
    <view>
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :style="'height:'+winWidth+'px'">
        <swiper-item v-for="(item,index) in productView.productExtensions.productThums" :key="index">
          <view class="product_image" :style="'height:'+ winWidth+'px'">
            <img :src="item.showCaseUrl" class="show-img" />
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.winWidth = this.$base.getSystemInfoSync().windowWidth
        this.async = true
      }
    },
    data () {
      return {
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        winWidth: '',
        async: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/style/variable.scss";
  .show-img {
    width: 100%;
    height: 100%;
  }
</style>
