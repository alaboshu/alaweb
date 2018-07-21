<template>
  <div class="pc-x-avatar" element-path="pc/x-avatar">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-avatar',
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
  .pc-x-avatar {
  	font-size: @font-size-base;
  }
</style>
