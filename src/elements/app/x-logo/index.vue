<template>
  <div class="app-x-logo" element-path="app/x-logo">
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
  .app-x-logo {
  	font-size: @font-size-base;
  }
</style>
