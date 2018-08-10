<template>
  <div class="pc-x-checkbox-multipl" element-path="pc/x-checkbox-multipl">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-checkbox-multipl',
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
  .pc-x-checkbox-multipl {
  	font-size: @font-size-base;
  }
</style>
