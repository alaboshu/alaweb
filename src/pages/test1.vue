<template>
  <zk-product-list :widget="viewModel"></zk-product-list>
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
          classIds: [10321, 3],
          isPage: false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
