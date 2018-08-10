<template>
  <div class="pc-x-input" element-path="pc/x-input">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-input',
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
  .pc-x-input {
  	font-size: @font-size-base;
  }
</style>
