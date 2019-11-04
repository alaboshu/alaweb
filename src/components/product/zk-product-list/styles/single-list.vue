<template>
  <view>
    <view class="common" v-for="(item,index) in viewModel" :key="index" @click="pagesToDetail(item)">
      <view class="common-left">
        <view class="common-image">
          <img :src="$base.host()+ item.thumbnailUrl" alt="" v-lazy>
        </view>
      </view>
      <view class="common-right">
        <view class="common-title">
          <view class="common-title-list">{{item.name}}</view>
        </view>
        <view class="common-intro">库存 {{item.stock}}</view>
        <view class="common-price-nologin" v-if="false">￥{{item.price}}</view>
        <view class="common-foot">
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
  import minx from './minx'
  export default {
    mixins: [minx],
    props: {
      viewModel: {}
    }
  }
</script>

<style lang="scss">
  @import "./single-list.scss";
</style>
