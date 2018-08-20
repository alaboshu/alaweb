<template>
  <div class="pc-x-title" element-path="pc/x-title">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-title',
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
  .pc-x-title {
  	font-size: @font-size-base;
  }
</style>
