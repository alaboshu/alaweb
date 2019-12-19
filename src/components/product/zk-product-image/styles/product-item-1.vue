<template>
  <view class="product-item-1" v-if="viewModel">
    <view class="left">
      <view class="title">天猫会员店</view>
      <view class="intro">进店领取30元红包</view>
      <view class="buttom">
        <text>进店逛逛</text>
        <i class="icon iconfont icon-right"></i>
      </view>
    </view>
    <view class="right">
      <view class="list" v-for="(item, index) in viewModel.productItems" :key="index" v-show="index< 3">
        <img :src="$api.baseUrl() + item.thumbnailUrl" class="image" alt="">
        <view class="text">会员价￥{{item.price}}</view>
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


<style lang="scss" scoped>
  .product-item-1 {
    box-sizing: border-box;
    padding: 10px;
    height: 100px;
    width: 100%;
    background: #fff;
    display: flex;
    .left {
      width: 110px;
      height: 100%;
      .title {
        padding: 0;
        height: 20px;
        line-height: 20px;
        color: #795734;
        font-size: 15px;
        font-weight: 700;
      }
      .intro {
        color: #898770;
        font-size: 10px;
      }
      .buttom {
        margin-top: 5px;
        display: inline-block;
        color: #8d7b53;
        background: #f0f1e1;
        padding: 0 5px;
        font-size: 12px;
        border-radius: 20px;
        i {
          font-size: 12px;
        }
      }
    }
    .right {
      flex-grow: 1;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list {
        width: 32%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .image {
          width: 78px;
          height: 60px;
        }

        .text {
          height: 15px;
          line-height: 15px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
</style>
