<template>
  <div class="pc-x-search" element-path="pc/x-search">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-search',
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
  .pc-x-search {
  	font-size: @font-size-base;
  }
</style>
