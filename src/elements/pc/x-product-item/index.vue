<template>
  <div class="pc-x-product-item" element-path="pc/x-product-item">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-product-item',
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
  .pc-x-product-item {
  	font-size: @font-size-base;
  }
</style>
