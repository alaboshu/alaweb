<template>
  <view>
    <zk-search></zk-search>
    <zk-product-class :widget="productData"></zk-product-class>
  </view>
</template>


<script>
  // import minx from '../mix/index'
  import productClassJson from './json/productClass.json'
  export default {
    // mixins: [minx],
    data () {
      return {
        productData: productClassJson
      }
    }
  }
</script>
