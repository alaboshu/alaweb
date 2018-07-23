<template>
  <div class="pc-x-groupbuy" element-path="pc/x-groupbuy">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-groupbuy',
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
  .pc-x-groupbuy {
  	font-size: @font-size-base;
  }
</style>
