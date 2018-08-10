<template>
  <div class="pc-x-checkbox" element-path="pc/x-checkbox">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-checkbox',
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
  .pc-x-checkbox {
  	font-size: @font-size-base;
  }
</style>
