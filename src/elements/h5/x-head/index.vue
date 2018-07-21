<template>
  <div class="h5-x-head" element-path="h5/x-head">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-head',
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
  .h5-x-head {
  	font-size: @font-size-base;
  }
</style>
