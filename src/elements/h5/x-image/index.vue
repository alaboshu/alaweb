<template>
  <div class="zk-image" >
    <ul class="lazyload-list">
      <li class="lazyload-list-item" v-for="(item,index) in elementData" :key="index">
        <img class="lazyload-image" :src="item.Image">
      </li>
    </ul>
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
    .lazyload-list {
      display: block;
      overflow: hidden;
      width: 100%;
      padding: 0;
      margin: 0;
      text-align: center;
      list-style: none;
      margin: 5px 0;
      .lazyload-list-item {
        width: 100%;
      }
      .lazyload-image {
        display: block;
        width: 100%;
        height: 180px;
        // &[lazy='loading'] {
        //   width: 40px;
        //   height: 300px;
        //   margin: auto;
        // }
      }
    }
  }
</style>
