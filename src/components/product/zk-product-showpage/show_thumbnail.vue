<template>
  <view class="show-thumbnail" v-if="productView">
    <view>
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :style="'height:'+winWidth+'px'">
        <swiper-item v-for="(item,index) in productView.productExtensions.productThums" :key="index">
          <view class="product_image" :style="'height:'+ winWidth+'px'">
            <img :src="repImage(item.showCaseUrl)" class="show-img">
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
        this.winWidth = this.$api.getSystemInfoSync().windowWidth
      },
      repImage (image) {
        if (image.substring(0, 10) === 'http://127') {
          return image.replace(/http:\/\/127.0.0.1:55555/g, 'https://s-open.qiniuniu99.com')
        } else if (image.indexOf('http//127.0.0.1:55555') > -1) {
          return image.replace(/http\/\/127.0.0.1:55555\//g, '/')
        }
        return image
      }
    },
    data () {
      return {
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        winWidth: ''
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
