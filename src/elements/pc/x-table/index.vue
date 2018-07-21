<template>
  <div class="pc-x-table" element-path="pc/x-table">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-table',
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
  .pc-x-table {
  	font-size: @font-size-base;
  }
</style>
