<template>
  <view>
    <common-item :viewModel="viewModel" :widget="widget"></common-item>
    这个是分页使用的页面
  </view>
</template>

<script>
  import commonItem from './common-style'
  export default {
    props: {
      widget: {},
      viewModel: {}
    },
    components: {
      commonItem
    },
    onReachBottom () {
    },
    onPullDownRefresh () {
    }

  }
</script>
