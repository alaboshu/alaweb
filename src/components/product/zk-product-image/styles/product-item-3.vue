<template>
  <view class="product-item-3">
    <view class="ul">
      <view class="list" v-for="(item, index) in viewModel.productItems" :key="index">
        <view class="left">
          <view class="title">人气榜</view>
          <view class="intro">优选收腹泳装榜</view>
          <view class="sales">人气上升8%</view>
        </view>
        <view class="right">
          <img :src="$api.baseUrl() + item.thumbnailUrl" alt="">
        </view>
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
  .product-item-3 {
    width: 100%;
    box-sizing: border-box;
    min-height: 100px;
    .ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 50%;
        height: 80px;
        box-sizing: border-box;
        background: #fff;
        border-top: 1px solid #f4f3f8;
        display: flex;
        align-items: center;
        &:nth-child(odd) {
          border-right: 1px solid #f4f3f8;
        }
        .left {
          padding-left: 10px;
          flex-grow: 1;
          font-size: 14px;
          .title {
            padding: 0;
            height: 20px;
            line-height: 20px;
            color: #898770;
            // margin-bottom: 10px;
          }
          .intro {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #000;
          }
          .sales {
            font-size: 10px !important;
            color: #999999;
          }
        }
        .right {
          width: 25%;
          height: 100%;
          padding: 10px 0;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
