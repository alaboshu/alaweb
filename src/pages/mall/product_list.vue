<template>
  <view>
    <zk-product-listpage :widget="viewModel"></zk-product-listpage>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        viewModel: {
          value: {
            name: '',
            priceStyleId: 'e0000000-1478-49bd-bfc7-e73a5d699000'
          },
          route: {
            path: 'product_list'
          }
        }
      }
    }
  }
</script>
