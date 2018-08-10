<template>
  <div class="pc-x-switch" element-path="pc/x-switch">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-switch',
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

<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-switch {
  	font-size: @font-size-base;
  }
</style>
