<template>
  <div class="zkweb-show_bar">
    <div class="show_bar-placeholder"></div>
    <div class="show_bar-tabbar ">
      <div class="tabber-left">
        <a href="" class="tabber-tiem">
          <div class="item-icon">
            <x-icon src="zk-home"></x-icon>
          </div>
          <p class="item-label">
            首页
          </p>
        </a>
        <a href="" class="tabber-tiem">
          <div class="item-icon">
            <x-icon src="zk-home"></x-icon>
          </div>
          <p class="item-label">
            首页
          </p>
        </a>
        <a href="" class="tabber-tiem">
          <div class="item-icon">
            <x-icon src="zk-home"></x-icon>
          </div>
          <p class="item-label">
            首页
          </p>
        </a>
      </div>
      <div class="tabber-right">
        <div class="tabber-btn cart">
          <x-button>加入购物车</x-button>
        </div>
        <div class="tabber-btn now_buy">
          <x-button>立即购买</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="less" scoped>
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zkweb-show_bar {
    height: 50px;
    .show_bar-placeholder {
      height: 50px;
    }
    .show_bar-tabbar {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      z-index: 9999;
      display: flex;
      background-color: #f7f7fa;
      border-top: 1px solid #c0bfc4;
      .tabber-left {
        display: flex;
        width: 120px;
        .tabber-tiem {
          display: block;
          flex: 1;
          height: 100%;
          color: #999;
          text-align: center;
          padding: 5px 0 0;
          border-right: 1px solid #e5e5e5;
          .item-icon {
            display: inline-block;
          }
          .item-label {
            text-align: center;
            color: #999;
            line-height: 1;
          }
        }
      }
      .tabber-right {
        flex: 1;
        display: flex;
        .tabber-btn {
          flex: 1;
          height: 100%;
          a {
            border-radius: 0;
            color: #fff;
            height: 100%;
            font-size: @h5-font-size;
            line-height: 50px;
          }
        }
        .cart {
          a {
            background-color: @warning;
          }
        }
        .now_buy {
          a {
            background-color: @theme-color;
          }
        }
      }
    }
  }
</style>


