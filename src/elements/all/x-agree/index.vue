<template>
  <div class="all-x-agree" element-path="all/x-agree">
  {{viewModel}}
  </div>
</template>

<script>
  export default {
    name: 'x-agree',
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
  .all-x-agree {
  	font-size: @font-size-base;
  }
</style>
