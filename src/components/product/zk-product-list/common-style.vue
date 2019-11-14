<template>
  <view>
    <!-- <single-item :viewModel="viewModel" v-if="type == 'single'"></single-item> -->
    <product-item :viewModel="viewModel"></product-item>
  </view>
</template>


<script>
  import singleItem from './styles/single-list'
  import productItem from './styles/product-list'
  export default {
    components: {
      singleItem,
      productItem
    },
    props: {
      viewModel: {},
      widget: {},
      type: {
        defualt: 'product'
      }
    }
  }
</script>
