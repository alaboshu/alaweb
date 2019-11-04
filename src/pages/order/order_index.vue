<template>
  <view class="order_index">
    <zk-order-list :widget="viewModel"></zk-order-list>
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
          }
        }
      }
    }
  }
</script>
