<template>
  <view class="swiper-class-item-1">
    <view class="left"></view>
    <view class="right">
      <view class="iconList">
        <x-icon name="zk-qrcode" size="20" color="#ffffff"></x-icon>
      </view>
    </view>
  </view>
</template>


<style lang="scss" scoped>
  .swiper-class-item-1 {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    z-index: 10;
    background: red;
    .left {
      width: 90%;
      height: 100%;
      background: green;
    }
    .right {
      width: 10%;
      height: 100%;
      background: red;
      box-shadow: -10px 0px 5px 0px rgba(0, 0, 0, 0.5);
      .iconList {
        position: relative;
        bottom: 3px;
        margin: 0 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
