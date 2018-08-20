<template>
  <div class="zk-image">
    <a :href="viewModel.Url" :title="viewModel.Name" :style="'width:'+width+';height:'+height" v-if="isArray">
      <img :src="viewModel.Image" :alt="viewModel.Name">
    </a>
    <a :href="url" :title="name" :style="'width:'+width+';height:'+height" v-if="!isArray">
      <img :src="src" :alt="name">
    </a>
  </div>
</template>

<script>
  export default {
    name: 'x-image',
    props: {
      elementData: {},
      width: {
        default: '100%'
      },
      height: {
        default: '180px'
      },
      src: {},
      url: {},
      name: {
        default: ''
      }
    },
    data () {
      return {
        viewModel: '',
        isArray: true
      }
    },
    mounted () {
      if (this.elementData !== undefined) {
        this.viewModel = this.elementData
        this.isArray = true
      } else {
        this.isArray = false
      }
    },
    methods: {
    }
  }
</script>


<style lang="less">
  @import '~_style/index.less';
  .zk-image {
    font-size: @font-size-base;
    a {
      display: block;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
