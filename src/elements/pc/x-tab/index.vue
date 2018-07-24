<template>
  <div class="pc-x-tab" element-path="pc/x-tab">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-tab',
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
  .pc-x-tab {
  	font-size: @font-size-base;
  }
</style>
