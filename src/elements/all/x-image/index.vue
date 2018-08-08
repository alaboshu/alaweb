<template>
  <div class="zk-image">
    <a :href="viewModel.Url" :title="viewModel.Name"><img :src="viewModel.Image" :alt="viewModel.Name"></a>
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
