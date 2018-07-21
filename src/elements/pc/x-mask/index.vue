<template>
  <div class="pc-x-mask" element-path="pc/x-mask">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-mask',
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
  .pc-x-mask {
  	font-size: @font-size-base;
  }
</style>
