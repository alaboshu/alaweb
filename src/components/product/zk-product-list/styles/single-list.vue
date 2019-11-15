<template>
  <view>
    <view class="common" v-for="(item,index) in viewModel" :key="index">
      <view class="common-left">
        <view class="common-image">
          <img :src="'http://retail_v13.api.5ug.com/'+ item.thumbnailUrl" alt="" v-lazy>
        </view>
      </view>
      <view class="common-right">
        <view class="common-title-product">{{item.name}}</view>
        <view class="common-intro">库存 {{item.stock}}</view>
        <view class="common-price-nologin">￥{{item.price}}</view>
        <view class="common-foot" v-if="false">
          <view class="common-a">
            <view class="common-qiang">抢</view>
            <view class="common-price">￥{{item.price}}</view>
          </view>
          <view class="common-hot">立即抢购</view>
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
    mounted () {
      console.info('aaaaaaaaaaaaa', this.viewModel)
    }
  }
</script>

<style lang="scss" scope>
  @import "./single-list.scss";
</style>
