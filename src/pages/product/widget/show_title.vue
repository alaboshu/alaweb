<template>
  <div class="zkweb-show_title">
    <div class="zkui-product-show-title">
      <!-- <div class="zkui-product-show-title-left left">
        <span class="zkui-product-show-title-storename left">{{productView.store}}</span>
      </div> -->
      <div class="zkui-product-show-title-left left">
        <span class="zkui-product-show-title-price_symbol left">displayPric</span>
        <p class="zkui-product-show-title-price_old left">marketPrice</p>
        <span class="zkui-product-show-title-right right">
          0人已购
        </span>
      </div>
    </div>
    <div class="zkui-product-show-title-content">
      <!-- <span class="zkui-product-show-title-storename left">{{productView.store}}</span>-->
      name
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>
<style lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zkweb-show_title {
    .zkui-product-show-title {
      background: #fff;
      padding: 0.5rem 10px 0 10 * @rem;
      .vux-no-group-title {
        margin-top: 0 !important;
      }
      .zkui-product-show-title-left {
        position: relative;
        .zkui-product-show-title-price_symbol {
          color: @brand;
          font-size: @h4-font-size;
          padding-top: 1 * @rem;
        }
        .zkui-product-show-title-price_old {
          padding-left: 5 * @rem;
          text-decoration: line-through;
          color: #6c757d;
        }
        .zkui-product-show-title-storename {
          background: @brand;
          color: @white;
          padding: 1 * @rem 5 * @rem;
        }
      }
      .zkui-product-show-title-right {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #6c757d;
      }
    }
    .zkui-product-show-title-content {
      background: #fff;
      padding: 0 10px 0.2rem 10 * @rem;
      border-bottom: 1px solid #e5e5e5;
      font-weight: 400;
      font-family: Helvetica;
      // .sizeColor(@h5-font-size, @black);
      .zkui-product-show-title-storename {
        background: @brand;
        color: @white;
        padding: 1 * @rem 5 * @rem;
      }
    }

    .zkui-product-show-serve-box {
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      li {
        // color: @gray-600;
        margin-left: 0.5rem;
        line-height: 2.9rem;
      }
      li.zkui-product-show-serve-item-more {
        -ms-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: right;
        padding-right: 10 * @rem;
      }
      .zkui-product-show-serve-item-more_icon {
        display: inline-block;
        font-size: 1rem;
        line-height: 0.5rem;
      }
    }
    .product-icon-dot {
      display: inline-block;
      vertical-align: middle;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.15rem;
      background-color: @brand;
      margin-right: 0.2rem;
    }
  }
</style>

