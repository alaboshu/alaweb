<template>
  <div class="pc-p-nav" element-path="pc/p-nav">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'p-nav',
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
  .pc-p-nav {
  	font-size: @font-size-base;
  }
</style>
