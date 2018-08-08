<template>
  <div class="pc-p-backtop" element-path="pc/p-backtop">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'p-backtop',
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
  .pc-p-backtop {
  	font-size: @font-size-base;
  }
</style>
