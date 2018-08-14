<template>
  <div class="pc-x-page" element-path="pc/x-page">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-page',
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
  .pc-x-page {
  	font-size: @font-size-base;
  }
</style>
