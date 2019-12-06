<template>
  <view class="swiper-search">
    <view class="left ">
      <view class="iconList">
        <x-icon name="zk-search" size="20" color="#606266"></x-icon>
      </view>
      <input type="text" placeholder="请输入您所需要搜索的内容" class="input" />
    </view>
    <view class="right">
      <view class="iconList">
        <x-icon name="zk-cart-1" size="20" color="#ffffff"></x-icon>
      </view>
      <view class="iconList">
        <x-icon name="zk-qrcode" size="20" color="#ffffff"></x-icon>
      </view>
    </view>
  </view>
</template>


<style lang="scss" scoped>
  .swiper-search {
    height: 45px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .left {
      width: 85%;
      height: 30px;
      background: rgba(250, 250, 250, 0.7);
      border-radius: 30px;
      display: flex;
      .iconList {
        width: 20px;
        height: 20px;
        margin: 0 5px;
      }
      .input {
        width: 100%;
        height: 100%;
        margin-right: 10px;
        line-height: 30px;
      }
    }
    .right {
      margin-left: 10px;
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
