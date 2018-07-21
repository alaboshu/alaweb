<template>
  <div class="pc-x-pay" element-path="pc/x-pay">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-pay',
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
  .pc-x-pay {
  	font-size: @font-size-base;
  }
</style>
