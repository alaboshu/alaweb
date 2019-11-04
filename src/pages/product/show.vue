<template>
  <view v-if="async">
    <zk-product-showpage :widget="widget"></zk-product-showpage>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        widget: {
          route: {}
        },
        async: false
      }
    },
    onLoad (options) {
      var id = ''
      if (this.$api.client() === 'AppPlus') {
        id = options.id
      } else {
        id = options[0].id
      }
      this.widget.route.id = id
      this.async = true
    }
  }
</script>
