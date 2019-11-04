<template>
  <view>
    <zk-card></zk-card>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          classIds: [],
          isPage: true,
          styleStype: 'single'
        },
        array: ['中国', '美国']
      }
    },
    mounted () {
      this.init()
    },
    methods: {

      init () {
        this.viewModel = {
          classIds: [],
          isPage: true,
          styleStype: 'single'
        }
      },
      pagesScroll () {
        console.info('就是你了a')
      }
    }
  }
</script>
<style lang="scss">
  html,
  body {
    height: 100px !important;
  }
</style>
