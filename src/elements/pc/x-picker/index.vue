<template>
  <div class="pc-x-picker" element-path="pc/x-picker">
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
        if (this.elementData !== undefined) {
          this.viewModel = this.elementData
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pc-x-picker {
  	font-size: @font-size-base;
  }
</style>
