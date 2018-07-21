<template>
  <div class="pc-x-grid" element-path="pc/x-grid">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-grid',
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
  .pc-x-grid {
  	font-size: @font-size-base;
  }
</style>
