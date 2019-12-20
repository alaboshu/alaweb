<template>
  <view class="product-item-4">
    <view class="left">
      <view class="class-title">家居好物</view>
      <view class="class-intro">这些怎么能少</view>
    </view>
    <view class="right">
      <scroll-view class="scroll-view">
        <view class="ul">
          <view class="list" v-for="(item, index) in list" :key="index">
            <img :src="'http://retail_v13.api.5ug.com/' + item.thumbnailUrl" alt="">
            <view class="buttom">{{item.price}}</view>
          </view>
        </view>
      </scroll-view>
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
          if (i < 3) {
            this.list.push(this.viewModel.productItems[i])
          }
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .product-item-4 {
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    align-items: center;
    .left {
      width: 30%;
      height: 40px;
      padding-left: 10px;
      border-right: 1px solid #e5e5e5;
      .class-title {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
      }
      .class-intro {
        font-size: 12px;
        color: #999;
        height: 20px;
        line-height: 20px;
      }
    }
    .right {
      flex-grow: 1;
      height: 100%;
      padding-right: 10px;
      .scroll-view {
        width: 100%;
        height: 100%;
        padding-left: 5px;
        .ul {
          height: 100px;
          display: flex;
          align-items: center;
        }
        .list {
          margin: 0 5px;
          width: 70px;
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          img {
            width: 100%;
            height: 55px;
          }
          .buttom {
            width: 100%;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background: #dee9f7;
            border-radius: 8px;
            font-size: 12px;
            color: #5e91d7;
          }
        }
      }
    }
  }
</style>
