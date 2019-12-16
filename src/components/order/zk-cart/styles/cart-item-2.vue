<template>
  <view class="cart-item-2" v-if="async">
    <view v-for="(storeItem, index) in widgetModel.storeItems" :key="index">
      <view class="store-title">
        <view class="left" @click="storeClick(index)" :class="{'left-active': productStoreRadio[index]}">
          <x-icon name="icon-testsu" size="20" color="#007AFF" v-if="productStoreRadio[index]"></x-icon>
        </view>
        <view class="store-name">自营店铺</view>
      </view>
      <!-- 商品列表 -->
      <view class="scroll-list" :style="'width:' + screenWidth + 'px;'" v-for="(productItem, productIndex) in storeItem.productSkuItems" :key="productIndex">
        <view class="list" :style="'width:' + (screenWidth+50) + 'px;'">
          <view class="left">
            <view class="left-check" @click="radioClick(index, productIndex)" :class="{'left-check-active':productRadio[index][productIndex]}">
              <x-icon name="icon-testsu" size="20" color="#007AFF" v-if="productRadio[index][productIndex]"></x-icon>
            </view>
          </view>
          <view class="center">
            <img :src="productItem.thumbnailUrl" class="image" alt="" srcset="">
            <view class="cont">
              <view class="title">{{productItem.name}}</view>
              <view class="intro">{{productItem.propertyValueDesc}}</view>
              <view class="foot">
                <view class="price"><span>￥</span>{{productItem.price}}</view>
                <view class="num"><span>x</span>{{productItem.buyCount}}</view>
              </view>
            </view>
          </view>
          <view class="right" @click="deleletClick(storeItem,productItem)">删除</view>
        </view>
      </view>
    </view>
    <view class="cart-item-2-bg"></view>
    <cartSumbit :widget="widget" @change="radioChange" ref="cartSumbit" @save="save"></cartSumbit>
  </view>
</template>

<script>
  import service from './service'
  import cartSumbit from './cart-sumbit'
  export default {
    components: {
      cartSumbit
    },
    props: {
      widget: {}
    },
    data () {
      return {
        async: false,
        screenWidth: 0,
        widgetModel: {}, // 存储购物车返回数据
        productRadio: [], // 所有商品的选框
        productStoreRadio: [] // 所有店铺的选框
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        // 计算屏幕宽度
        this.screenWidth = this.$base.screenWidth()
        service.initCart(this)
        console.info('productRadio', this.productRadio)
        console.info('widget', this.widgetModel)
        this.async = true
      },
      // 商品点击
      radioClick (storeIndex, productIndex) {
        service.radioClick(this, { storeIndex, productIndex })
      },
      // 店铺点击
      storeClick (storeIndex) {
        service.storeClick(this, storeIndex)
      },
      // 删除商品
      deleletClick (store, product) {
        service.deleletClick(this, { store, product })
      },
      // 监听全选
      radioChange (isRadio) {
        service.radioChange(this, isRadio)
      },
      // 提交订单
      save () {
        service.save(this)
      }
    }
  }
</script>



<style lang="scss">
  .cart-item-2 {
    background: #f2f2f2;
    .cart-item-2-bg {
      width: 100%;
      height: 100%;
      background: #f2f2f2;
      position: fixed;
    }

    .store-title {
      width: 100%;
      height: 35px;
      background: #fff;
      display: flex;
      align-items: center;
      .left {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        border: 1px solid #d6d6d6;
        border-radius: 50%;
        .x-icon {
          height: 20px;
        }
        &.left-active {
          border: none;
        }
      }
    }
    .scroll-list {
      overflow: auto hidden;
      min-height: 100px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }
    }
    .list {
      margin-top: 10px;
      padding: 0 50px;
      height: 100px;
      background: #fff;
      position: relative;
      .left,
      .right {
        position: absolute;
        width: 50px;
        height: 100%;
        color: #fff;
        line-height: 100px;
        text-align: center;
      }
      .left {
        top: 0;
        left: 0;
        .left-check {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #d6d6d6;
          &.left-check-active {
            background: #fff;
            border: none;
            .x-icon {
              height: 20px;
            }
          }
        }
      }
      .right {
        top: 0;
        right: 0;
        background: #f74c31;
      }
      .center {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .image {
          width: 72px;
          height: 72px;
          border-radius: 3px;
        }
        .cont {
          flex-grow: 1;
          height: 72px;
          padding: 0 10px;
          .title {
            padding: 0;
            font-size: 12px;
            line-height: 15px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .intro {
            color: #999;
            font-size: 12px;
          }
          .foot {
            height: 25px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .price {
              span {
                font-size: 12px;
              }
              color: #c81432;
            }
            .num {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
