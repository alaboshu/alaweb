<template>
  <div class="pc-x-text" element-path="pc/x-text">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-text',
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
  .pc-x-text {
  	font-size: @font-size-base;
  }
</style>
