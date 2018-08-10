<template>
  <div class="pc-x-textarea" element-path="pc/x-textarea">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-textarea',
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
  .pc-x-textarea {
  	font-size: @font-size-base;
  }
</style>
