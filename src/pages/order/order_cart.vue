<template>
  <view class="order_cart">
    <zk-cart :widget="viewModel"></zk-cart>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        viewModel: {
          value: {
            image: [],
            name: ''
          }
        }
      }
    }
  }
</script>
