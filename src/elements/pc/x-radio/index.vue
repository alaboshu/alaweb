<template>
  <div class="pc-x-radio" element-path="pc/x-radio">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-radio',
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
  .pc-x-radio {
  	font-size: @font-size-base;
  }
</style>
