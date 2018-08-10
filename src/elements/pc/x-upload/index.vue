<template>
  <div class="pc-x-upload" element-path="pc/x-upload">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-upload',
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
  .pc-x-upload {
  	font-size: @font-size-base;
  }
</style>
