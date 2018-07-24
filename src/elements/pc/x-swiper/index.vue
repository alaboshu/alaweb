<template>
  <div class="pc-x-swiper" element-path="pc/x-swiper">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-swiper',
    props: {
      elementData: {}
    },
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (this.elementData === undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .pc-x-swiper {
  	font-size: @font-size-base;
  }
</style>
