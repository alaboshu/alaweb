<template>
  <div class="pc-x-keyword" element-path="pc/x-keyword">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-keyword',
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
  .pc-x-keyword {
  	font-size: @font-size-base;
  }
</style>
