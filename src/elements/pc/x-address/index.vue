<template>
  <div class="pc-x-address" element-path="pc/x-address">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-address',
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
  .pc-x-address {
  	font-size: @font-size-base;
  }
</style>
