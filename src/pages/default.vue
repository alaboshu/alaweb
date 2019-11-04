<template>
  <view>
    <zk-index-swiper ref="zkIndexSwiper" :widget="indexSwiperData" style="background: #F0F0F0;"></zk-index-swiper>
    <zk-parting-line style="background: #F0F0F0;"></zk-parting-line>
    <zk-index-new-top :widget="indexNewData" style="background: #f0f0f0;"></zk-index-new-top>
    <zk-image :widget="imageData" style="background: #f0f0f0;"></zk-image>
    <zk-border-header :widget="indexNewData" type="2" style="background: #f0f0f0;"></zk-border-header>
    <zk-index-hot-shop :widget="hotShopData" style="background: #f0f0f0;"></zk-index-hot-shop>
    <zk-product-list :widget="viewModel" style="background: #f0f0f0;padding: 1px 0"></zk-product-list>
  </view>
</template>

<script>
  import indexSwiperJson from './json/indexSwiper.json'
  import indexNewJson from './json/indexNewTop.json'
  import imageJson from './json/imageList.json'
  import hotShopJson from './json/hotShop.json'
  import typeListJson from './json/typeList.json'
  export default {
    data () {
      return {
        indexSwiperData: indexSwiperJson,
        imageData: imageJson,
        hotShopData: hotShopJson,
        typeListData: typeListJson,
        viewModel: {
          classIds: [],
          isPage: false,
          styleStype: 'single'
        },
        indexNewData: {
          value: {
            links: []
          }
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        for (let i of indexNewJson.value.links) {
          if (i.show) {
            this.indexNewData.value.links.push(i)
          }
        }
      }
    }
  }
</script>
