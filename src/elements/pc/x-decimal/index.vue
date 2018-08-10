<template>
  <div class="pc-x-decimal" element-path="pc/x-decimal">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-decimal',
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
  .pc-x-decimal {
  	font-size: @font-size-base;
  }
</style>
