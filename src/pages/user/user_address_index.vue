<template>
  <view class="user_address_index">
    <zk-user-address :widget="widget"></zk-user-address>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        widget: {
          value: {}
        }
      }
    }
  }
</script>
