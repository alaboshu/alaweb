<template>
  <div class="min-x-result" element-path="min/x-result">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
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
  .min-x-result {
  	font-size: @font-size-base;
  }
</style>
