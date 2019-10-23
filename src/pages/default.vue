<template>
  <view>
    <zk-index-swiper :widget="indexSwiperData" style="background: #F0F0F0;"></zk-index-swiper>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-index-new-top :widget="indexNewData" style="background: #f0f0f0;"></zk-index-new-top>
    <zk-image :widget="imageData" style="background: #f0f0f0;"></zk-image>
    <zk-border-header :widget="indexNewData" type="2" style="background: #f0f0f0;"></zk-border-header>
    <zk-index-hot-shop :widget="hotShopData" style="background: #f0f0f0;"></zk-index-hot-shop>
    <zk-index-day-update :widget="dayUpdateData"></zk-index-day-update>
    <!-- <zk-index-type-list :widget="typeListData"></zk-index-type-list> -->
  </view>
</template>

<script>
  import indexSwiperJson from './json/indexSwiper.json'
  import indexNewJson from './json/indexNewTop.json'
  import imageJson from './json/imageList.json'
  import dayUpdateJson from './json/dayUpdate.json'
  import hotShopJson from './json/hotShop.json'
  import typeListJson from './json/typeList.json'
  export default {
    data () {
      return {
        indexSwiperData: indexSwiperJson,
        indexNewData: indexNewJson,
        imageData: imageJson,
        dayUpdateData: dayUpdateJson,
        hotShopData: hotShopJson,
        typeListData: typeListJson
      }
    }
  }
</script>
