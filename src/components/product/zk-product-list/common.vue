<template>
  <view>
    <single-item :viewModel="viewModel"></single-item>
  </view>
</template>


<script>
  import singleItem from './single-list'
  export default {
    components: {
      singleItem
    },
    props: {
      viewModel: {}
    }
  }
</script>
