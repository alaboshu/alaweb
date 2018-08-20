<template>
  <div class="min-x-logo" element-path="min/x-logo">
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
  .min-x-logo {
  	font-size: @font-size-base;
  }
</style>
