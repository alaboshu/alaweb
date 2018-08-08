<template>
  <div class="pc-x-card" element-path="pc/x-card">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-card',
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

<style lang="less">
  @import '~_style/index.less';
  .pc-x-card {
  	font-size: @font-size-base;
  }
</style>
