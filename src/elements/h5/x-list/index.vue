<template>
  <div class="h5-x-list" element-path="h5/x-list">
    <div class="weui-panel weui-panel_access" v-for="(item,index) in viewModel" :key="index">
      <div class="weui-panel__bd">
        <a :href="item.url" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <a :href="item.url">
              <img :src="item.image" alt="" class="weui-media-box__thumb">
            </a>
          </div>
          <div class="weui-media-box__bd">
            <a :href="item.url">
              <h4 class="weui-media-box__title">
                {{item.title}}</h4>
            </a>
            <p class="weui-media-box__desc">{{item.intro}}</p>
            <p class="weui-media-box__desc" style="text-align: right">{{item.extra}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-list',
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
        console.log('this.viewModel', this.viewModel)
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .h5-x-list {
    font-size: @font-size-base;
    .weui-panel:after {
      border: none !important;
    }
    .mescroll-upwarp {
      display: none !important;
    }
    .weui-media-box {
      padding: 0.5rem;
    }
    .weui-media-box__hd {
      margin: 10px auto;
      .brand {
        width: 50 * @rem;
        height: 50 * @rem;
        padding-top: 0.1rem;
        border-radius: 50%;
      }
    }

    .weui-media-box__title {
      color: #000;
    }
    .weui-media-box__bd {
      padding-left: 0.1rem;
    }
    .weui-media-box__desc {
      padding-top: 0.3rem;
      font-size: @h6-font-size;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .weui-media-box__title__extra {
      font-size: @h5-font-size;
      font-weight: bold;
      float: right;
    }
  }
</style>
