<template>
  <div class="pc-x-popup" element-path="pc/x-popup">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-popup',
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
  .pc-x-popup {
  	font-size: @font-size-base;
  }
</style>
