<template>
  <view class="product-item-list-4">
    <view class="list" v-for="(item, index) in viewModel" :key="index" @click="linkto(item)">
      <img :src="$api.baseUrl()+item.thumbnailUrl" alt="">
      <view class="cont">
        <view class="title">{{item.name}}</view>
        <view class="price">
          <text class="new-price">￥{{item.price}}</text>
          <text class="old-price">{{item.price}}</text>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
  export default {
    props: {
      viewModel: {}
    },
    methods: {
      linkto (item) {
        this.$api.to(`/product/show?id=${item.id}`)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .product-item-list-4 {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    column-count: 2;
    column-gap: 10px;
    .list {
      margin-bottom: 10px;
      width: 100%;
      min-height: 100px;
      background: #fff;
      display: flex;
      padding: 10px;
      border-radius: 3px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 150px;
      }
      .cont {
        width: 100%;
        .title {
          padding: 0;
          font-size: 14px;
          width: 100%;
          margin-top: 5px;
          min-height: 15px;
          line-height: 15px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          height: 20px;
          .new-price {
            line-height: 20px;
            font-size: 14px;
            color: #ff0036;
            font-weight: 700;
            margin-right: 5px;
          }
          .old-price {
            font-size: 12px;
            color: #999;
            text-decoration: line-through;
          }
        }
      }
    }
  }
</style>
