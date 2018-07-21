<template>
  <div class="pc-x-head" element-path="pc/x-head">
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
  .pc-x-head {
  	font-size: @font-size-base;
  }
</style>
