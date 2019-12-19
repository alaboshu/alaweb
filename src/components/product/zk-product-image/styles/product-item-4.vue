<template>
  <view class="product-item-4">
    <view class="left">
      <view class="class-title">家居好物</view>
      <view class="class-intro">这些怎么能少</view>
    </view>
    <view class="right">
      <scroll-view class="scroll-view">
        <view class="ul">
          <view class="list" v-for="item in 3" :key="item">
            <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4094400000,3327666375&fm=26&gp=0.jpg" alt="">
            <view class="buttom">果盘果篮</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>


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
