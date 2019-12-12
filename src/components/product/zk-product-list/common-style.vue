<template>
  <view class="common-style">
    <singleItem :viewModel="viewModel" v-if="widget.value.productType == 1"></singleItem>
    <productItem :viewModel="viewModel" v-else-if="widget.value.productType == 2"></productItem>
    <productItem3 :viewModel="viewModel" v-else-if="widget.value.productType == 3"></productItem3>
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
      widget: {
      },
      type: {
        defualt: 'product'
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  .common-style {
    width: 100%;
    box-sizing: border-box;
  }
</style>
