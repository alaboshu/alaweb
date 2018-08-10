<template>
  <div class="pc-x-number" element-path="pc/x-number">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-number',
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
  .pc-x-number {
  	font-size: @font-size-base;
  }
</style>
