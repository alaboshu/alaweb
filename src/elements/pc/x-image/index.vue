<template>
  <div class="pc-x-image" element-path="pc/x-image">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-image',
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
  .pc-x-image {
  	font-size: @font-size-base;
  }
</style>
