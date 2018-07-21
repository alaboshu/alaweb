<template>
  <div class="pc-x-audio" element-path="pc/x-audio">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-audio',
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
  .pc-x-audio {
  	font-size: @font-size-base;
  }
</style>
