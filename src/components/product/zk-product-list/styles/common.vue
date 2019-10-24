<template>
  <view>
    <single-item :viewModel="viewModel"></single-item>
    <view>第二种样式表</view>
    <product-item :viewModel="viewModel"></product-item>
  </view>
</template>


<script>
  import singleItem from './single-list'
  import productItem from './product-list'
  export default {
    components: {
      singleItem,
      productItem
    },
    props: {
      viewModel: {}
    }
  }
</script>
