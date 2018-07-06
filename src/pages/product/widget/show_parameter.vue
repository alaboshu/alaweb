<template>
  <div class="zkweb-show_parameter">
    <x-group>
      <x-cell title="请选择:规格" value="qwe" isLink @click="popupVisible1=!popupVisible1,popupVisible2=false"></x-cell>
      <x-cell title="商品参数" value="qwe" isLink @click="popupVisible2=!popupVisible2,popupVisible1=false"></x-cell>
      <x-cell title="备注"></x-cell>
    </x-group>
    <!-- 规格弹出框 -->
    <x-popup :visible="popupVisible1">
      <div class="sale-box">
        <div class="sale-info">
          <div class="sale-info-left">
            <img src="" alt="">
          </div>
          <div class="sale-info-right">
            <div class="sale-info-name">
              杨雨的袜子杨雨的袜子杨雨的袜子杨雨的袜子杨雨的袜子杨雨的袜子杨雨的袜子
            </div>
            <div class="sale-info-price">
              ￥39.90
              <span>
                ￥50.00
              </span>
            </div>
            <div class="sale-info-stock">
              库存：999 货号：ZK2636-1
            </div>
          </div>
        </div>
        <div class="sale-botton-placeholder "></div>
        <div class="sale-botton">
          <x-button class="sale-btn-left">加入购物车</x-button>
          <x-button class="sale-btn-right">立即购买</x-button>
        </div>
      </div>
    </x-popup>
    <x-popup :visible="popupVisible2">
      <div class="goods-box">
        <div class="goods-title">
          商品参数
        </div>
        <div class="goods-item">
          <x-group>
            <x-cell title="杨雨的味道" value="原味"></x-cell>
          </x-group>
        </div>
        <div class="goods-base">
          <x-button @click="popupVisible2=false">确定</x-button>
        </div>
      </div>
    </x-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        popupVisible1: false,
        popupVisible2: false
      }
    },
    mounted () {
    },
    methods: {

    }
  }
</script>
<style lang="less">
  @import '~@/assets/style/h5/index.less';
  .zkweb-show_parameter {
    .weui-cells {
      margin-top: 0;
    }
    .wv-popup {
      z-index: 111111;
    }
    .sale-box {
      border-top: 1px solid #e5e5e5;
      .sale-info {
        padding: 1rem;
        min-height: 8rem;
        display: flex;
        .sale-info-left {
          width: 6.5rem;
          height: 6.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .sale-info-right {
          flex: 1;
          padding-left: 0.5rem;
          .sale-info-name {
            color: #000;
            font-family: Helvetica;
            font-size: @h5-font-size;
            padding-right: 1rem;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .sale-info-price {
            font-size: @h4-font-size;
            font-weight: @font-weight-bold;
            color: @brand;
            span {
              text-decoration: line-through;
              color: #6c757d;
              font-family: Helvetica;
              font-weight: normal;
            }
          }
          .sale-info-stock {
            color: #6c757d;
          }
        }
      }
      .sale-botton-placeholder {
        height: 40px;
      }
      .sale-botton {
        width: 100%;
        height: 40px;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        .sale-btn-left,
        .sale-btn-right {
          flex: 1;
          margin-top: 0;
          font-size: @h5-font-size;
          color: #fff;
          border-radius: 0;
        }
        .sale-btn-left {
          background: @danger;
          border-top-left-radius: 2.66666667rem;
          border-bottom-left-radius: 2.66666667rem;
        }
        .sale-btn-right {
          background: @brand;
          border-top-right-radius: 2.66666667rem;
          border-bottom-right-radius: 2.66666667rem;
        }
      }
    }
    .goods-box {
      min-height: 8rem;
      border-top: 1px solid #e5e5e5;
      padding-top: 3.33333333rem;
      position: relative;
      .goods-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow-y: auto;
        line-height: 3.33333333rem;
        text-align: center;
        z-index: 5;
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        color: #000;
      }
      .goods-item {
        padding-bottom: 1.66666667rem;
        height: 16.5rem;
        overflow-y: auto;
      }
      .goods-base {
      }
    }
  }
</style>
