<template>
  <div class="min-x-image-list" element-path="min/x-image-list">
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
  .min-x-image-list {
  	font-size: @font-size-base;
  }
</style>
