<template>
  <view class="product-list">
    <view class="product-list-cont" v-for="(item, index) in viewModel" :key="index">
      <view class="product-list-image">
        <img :src="'http://api.szwft.me/'+ item.thumbnailUrl" alt="" srcset="">
      </view>
      <view class="product-list-title">{{item.name}}</view>
      <view class="product-list-foot">
        <view class="product-list-price">￥{{item.price}}</view>
        <view class="product-list-lastprice">{{item.marketPrice}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      viewModel: {}
    }
  }
</script>


<style lang="scss">
  .product-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10px;
    // column-count: 2;
    // column-gap: 10px;
    .product-list-cont {
      width: 47%;
      box-sizing: border-box;
      background: #fff;
      border-radius: 10px;
      margin: 5px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      .product-list-image {
        width: 100%;
        flex-grow: 2;
        background: red;
      }
      .product-list-title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 700;
      }
      .product-list-foot {
        .product-list-price {
          font-weight: 600;
          font-size: 18px;
          color: #ee2c28;
          display: inline-block;
        }
        .product-list-lastprice {
          font-size: 12px;
          margin-left: 10px;
          color: #999;
          display: inline-block;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
