<template>
  <div class="pc-x-top-nav" element-path="pc/x-top-nav">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-top-nav',
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

<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-top-nav {
  	font-size: @font-size-base;
  }
</style>
