<template>
  <view class="product-item-2">
    <view class="list" v-for="(item, index) in list" :key="index">
      <img :src="'http://retail_v13.api.5ug.com/' + item.thumbnailUrl" alt="" srcset="" />
      <view class="test">
        <text class="price">￥{{item.price}}</text>
        <text class="un-price">{{item.price}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        for (let i = 0; i < this.viewModel.productItems.length; i++) {
          if (i < 4) {
            this.list.push(this.viewModel.productItems[i])
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-item-2 {
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 5px;

    .list {
      width: 30%;
      height: 100px;
      margin: 0 3px;
      background: #f7f3ed;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      img {
        width: 100%;
        height: 80px;
        margin-top: 1px;
        border-radius: 5px 5px 0 0;
      }
      .test {
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 100%;

        .price {
          font-size: 14px;
          margin-right: 5px;
          color: #df083e;
        }
        .un-price {
          color: #666;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
    }
  }
  .protlet-border {
    .product-item-2 {
      padding: 5px;
      height: 110px;
    }
  }
</style>
