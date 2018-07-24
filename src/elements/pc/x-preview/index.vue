<template>
  <div class="pc-x-preview" element-path="pc/x-preview">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-preview',
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
  .pc-x-preview {
  	font-size: @font-size-base;
  }
</style>
