<template>
  <div class="pc-x-result" element-path="pc/x-result">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-result',
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
  .pc-x-result {
  	font-size: @font-size-base;
  }
</style>
