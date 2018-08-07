<template>
  <div class="pc-x-product-class" element-path="pc/x-product-class">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-product-class',
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
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .pc-x-product-class {
  	font-size: @font-size-base;
  }
</style>
