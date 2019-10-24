<template>
  <view style="background: #f0f0f0">
    <zk-product-list :widget="viewModel"></zk-product-list>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: null,
        array: ['中国', '美国']
      }
    },
    mounted () {
      this.init()
    },

    onLoad (option) {

    },
    methods: {

      init () {
        this.viewModel = {
          classIds: [],
          isPage: false,
          styleStype: 'single'
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
