<template>
  <div class="h5-x-image-list" element-path="h5/x-image-list">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-image-list',
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
  .h5-x-image-list {
  	font-size: @font-size-base;
  }
</style>
