<template>
  <view>
    <single-item :viewModel="viewModel" v-if="widget.value.productType == 'single'"></single-item>
    <product-item :viewModel="viewModel" v-if="widget.value.productType == 'product'"></product-item>
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
    },
    mounted () {
      console.info('aaaaaaaaaaaaaaaaaa', this.widget.value.productType)
    }
  }
</script>
