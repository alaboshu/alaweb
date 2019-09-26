<template>
  <view>
    <view class="x-divider"></view>
    <view class="show-intro">
      <view class="intro-title" id="showRecommended">商品详情</view>
      <div class="intro-img">
        <rich-text :nodes="showHtml"></rich-text>
        <!-- <div class="box_list" v-html="productView.detail.mobileIntro"></div> -->
      </div>
      <view class="x-divider"></view>
    </view>
  </view>
</template>
<script>

  export default {
    props: {
      productView: {}
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        showHtml: ''
      }
    },
    onLoad () {
      this.init()
    },
    methods: {
      init () {
        this.showHtml = this.productView.detail.intro
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"')
        // eslint-disable-next-line
        this.showHtml = this.showHtml.replace(/\<p/gi, '<p style="line-height:0;"')
      }
    }

  }
</script>


<style lang="scss">
  @import "@/assets/style/variable.scss";

  .show-intro {
    .intro-title {
      width: 100%;
      height: 35px;
      color: $gl-text1;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      font-weight: bold;
    }
    .intro-img {
      padding: 0px 25px;
    }
  }
  .x-divider {
    background: #f7f7f7;
    height: 10px;
    line-height: 10px;
    display: block;
    padding: 0;
    margin: 0;
  }
</style>
