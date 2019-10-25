<template>
  <view>
    <single-item :viewModel="viewModel" v-if="widget.styleStype == 'single'"></single-item>
    <product-item :viewModel="viewModel" v-if="widget.styleStype == 'product'"></product-item>
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
      widget: {}
    }
  }
</script>
