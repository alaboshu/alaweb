<template>
  <div class="h5-x-picker" element-path="h5/x-picker">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-picker',
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
  .h5-x-picker {
  	font-size: @font-size-base;
  }
</style>
