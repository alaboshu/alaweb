<template>
  <view>
    <zk-index-swiper></zk-index-swiper>
    <zk-index-new-top :widget="indexNewData"></zk-index-new-top>
    <zk-image :widget="imageData"></zk-image>
    <!-- <border-header :widget="indexNewData"></border-header> -->
  </view>
</template>

<script>
  import indexNewJson from './json/indexNewTop.json'
  import imageJson from './json/imageList.json'
  export default {
    data () {
      return {
        indexNewData: indexNewJson,
        imageData: imageJson
      }
    }
  }
</script>
