<template>
  <div class="pc-x-logo" element-path="pc/x-logo">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-logo',
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
  .pc-x-logo {
  	font-size: @font-size-base;
  }
</style>
