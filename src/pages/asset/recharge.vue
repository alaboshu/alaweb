<template>
  <view class="set">
    <zk-cell :widget="viewModel"></zk-cell>
  </view>
</template>


<script>
  import setJson from './json/recharge.json'
  export default {
    data () {
      return {
        viewModel: setJson
      }
    }
  }
</script>
