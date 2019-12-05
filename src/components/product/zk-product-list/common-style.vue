<template>
  <view>
    <single-item :viewModel="viewModel" v-if="widget.value.productType == 1"></single-item>
    <product-item :viewModel="viewModel" v-if="widget.value.productType == 2"></product-item>
    <product-item-3 :viewModel="viewModel" v-if="widget.value.productType == 3"></product-item-3>
  </view>
</template>


<script>
  import singleItem from './styles/single-list'
  import productItem from './styles/product-list'
  import productItem3 from './styles/3-product-item'
  export default {
    components: {
      singleItem,
      productItem,
      productItem3
    },
    props: {
      viewModel: {},
      widget: {},
      type: {
        defualt: 'product'
      }
    },
    onShow (optinos) {
      console.info('options', optinos)
    },
    mounted () {
    }
  }
</script>
