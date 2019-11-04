<template>
  <view class="meal">
    <image src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-08-28/5d66625817e52b28d8e3ff74.jpg" class="iamge" />
    <view class="rob-tit">
      <view class="big-tit">今日必抢</view>
    </view>
    <zk-product-list :widget="viewModel"></zk-product-list>
    <image src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-08-27/5d651e35d9eb362b7cfd8948.jpg" class="image-img" />
    <view class="rob-tit">
      <view class="big-tit">好货一折起</view>
    </view>
    <zk-product-list :widget="productList"></zk-product-list>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        viewModel: {
          classIds: [],
          isPage: false,
          styleStype: 'single'
        },
        productList: {
          classIds: [],
          isPage: false,
          styleStype: 'product'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#9816f4'
        })
      }
    }
  }
</script>

<style lang="scss">
  .meal {
    background-color: #9816f4;
    .image-img,
    .iamge {
      width: 100%;
    }
    .rob-tit {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 40px;
      .big-tit {
        color: #ffffff;
        font-size: 21px;
        font-weight: 700;
        width: 120px;
      }
    }
    .image-img {
      margin-top: 20px;
      height: 170px;
    }
  }
</style>
