<template>
  <div class="pc-p-top-nav" element-path="pc/p-top-nav">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'p-top-nav',
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
  .pc-p-top-nav {
  	font-size: @font-size-base;
  }
</style>
