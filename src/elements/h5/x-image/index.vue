<template>
  <div class="zk-image">
    <img :src="viewModel.Image">
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
      this.viewModel = this.elementData
      console.info('图片', this.viewModel)
    },
    methods: {
    }
  }
</script>


<style lang="less">
  @import '~_style/index.less';
  .zk-image {
    font-size: @font-size-base;
  }
</style>
