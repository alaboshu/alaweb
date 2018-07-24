<template>
  <div class="zk-foot">
    <div class="zkweb-footer">
      <div class="zkweb-tabbar">
        <a :href="item.Url" class="tabbar__item" v-for="(item,index) in viewModel" :key="index">
          <span style="display: inline-block; position: relative; height:20px">
            <x-icon :src="item.Image" x-class="brand" size="20"></x-icon>
          </span>
          <p class="tabbar__label">
            {{item.Name}}
          </p>
        </a>
      </div>
      <div class="footer-placeholder " :style="'height:46px'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-cell',
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
  .h5-x-foot {
    font-size: @font-size-base;
  }
  .zkweb-footer {
    font-size: 123px;
    .zkweb-tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 46px;
      background-color: #f7f7fa;
      display: flex;
      .tabbar__item {
        display: block;
        flex: 1;
        padding: 5px 0 0;
        font-size: 0;
        color: #999999;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        .tabbar__icon {
          display: inline-block;
          width: 27px;
          height: 27px;
        }
        .tabbar__label {
          text-align: center;
          color: #999999;
          font-size: 14px;
          line-height: 1.8;
        }
      }
    }
    .zkweb-tabbar:before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #c0bfc4;
      color: #c0bfc4;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
</style>
