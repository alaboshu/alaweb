<template>
  <view>
    <zk-index-swiper></zk-index-swiper>
    <zk-index-new-top :widget="indexNewData"></zk-index-new-top>
    <zk-image :widget="imageData"></zk-image>
    <zk-border-header :widget="indexNewData"></zk-border-header>
    <zk-index-day-update :widget="dayUpdateData"></zk-index-day-update>
    <zk-index-hot-shop :widget="hotShopData"></zk-index-hot-shop>
    <zk-index-type-list :widget="typeListData"></zk-index-type-list>
  </view>
</template>

<script>
  import indexNewJson from './json/indexNewTop.json'
  import imageJson from './json/imageList.json'
  import dayUpdateJson from './json/dayUpdate.json'
  import hotShopJson from './json/hotShop.json'
  import typeListJson from './json/typeList.json'
  export default {
    data () {
      return {
        indexNewData: indexNewJson,
        imageData: imageJson,
        dayUpdateData: dayUpdateJson,
        hotShopData: hotShopJson,
        typeListData: typeListJson
      }
    },
    mounted () {
      // cosnole.info('这是为什么啊', dayUpdateJson)
    }
  }
</script>
