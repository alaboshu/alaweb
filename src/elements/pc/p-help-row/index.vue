<template>
  <div class="pc-p-help-row" element-path="pc/p-help-row">
    <span>ddd</span>
  </div>
</template>

<script>
  export default {
    name: 'p-help-row',
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
  .pc-p-help-row {
    font-size: @font-size-base;
  }
</style>
