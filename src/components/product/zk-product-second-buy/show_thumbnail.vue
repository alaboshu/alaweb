<template>
  <view class="show-thumbnail" v-if="productView">
    <view>
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :style="'height:'+winWidth+'px'">
        <swiper-item v-for="(item,index) in productView.productExtensions.productThums" :key="index">
          <view class="product_image" :style="'height:'+ winWidth+'px'">
            <img :src="item.showCaseUrl" class="show-img">
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="show-purchase">
      <swiper class="purchase-swiper" :circular="purchaseCircular" :vertical="purchaseVertical" :autoplay="purchaseAutoplay" :interval="purchaseInterval" next-margin="33px" @change="goIndex">
        <swiper-item v-for="(item,index) in viewModel" :key="index">
          <view class="swiper-item" :class="{'swiper-item_avtice':currentIndex==index}" v-html="item">
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
    data () {
      return {
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        winWidth: '',
        purchaseCircular: true,
        purchaseVertical: true,
        purchaseAutoplay: true,
        purchaseInterval: 1200,
        currentIndex: 0,
        viewModel: '',
        showHtml: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.winWidth = this.$api.getSystemInfoSync().windowWidth
        var para = {
          productId: this.productView.id
        }
        var repone = await this.$api.httpGet('/Api/SecondBuyOrder/BuyList', para)
        if (repone.status !== 1) {
          this.$api.toastWarn(repone.message)
          return
        }
        this.viewModel = repone.result
      },
      goIndex (event) {
        this.currentIndex = event.target.current
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
  .show-thumbnail {
    position: relative;
    .show-purchase {
      width: 100vw;
      height: 170upx;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 9999;
      .purchase-swiper {
        .swiper-item {
          width: 400upx;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 60upx;
          padding: 2px 8px;
          opacity: 0.4;

          .swiper-item_text {
            flex: 1;
            min-width: 0;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 5px;
          }
        }
        .swiper-item_avtice {
          opacity: 1;
        }
      }
      uni-swiper {
        height: 80px;
      }
    }
  }
</style>
