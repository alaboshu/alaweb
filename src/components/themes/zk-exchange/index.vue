<template>
  <view class="zk-exchange">
    <view class="zk-exchange-card">
      <view class="zk-exchange-name">当前账号</view>
      <view class="zk-exchange-account ">
        <view>
          <view>0x7451...1023</view>
          <view></view>
        </view>
        <view class="zk-exchange-exchange">切换</view>
      </view>
    </view>
    <view class="zk-exchange-list">
      <view class="zk-exchange-list-title">选择充值金额</view>
      <view class="zk-exchange-list-form">
        <view class="zk-exchange-list-cont" :class="{actions: clickIndex===index}" v-for="(item, index) in arrList" :key="index" @click="clickIndex = index">
          <view class="zk-exchange-title">{{item.name}}</view>
          <view class="zk-exchang-intro">=100.12 ETC</view>
        </view>
      </view>
    </view>
    <view class="zk-exchange-pay">
      <input placeholder="请填写你将用来付款的支付宝账号" />
    </view>
    <view class="zk-exchange-tips">
      <view class="zk-exchange-tips-list">
        <view class="zk-exchange-left">*</view>
        <view class="zk-exchange-tips-cont">此处用来填写你的支付宝账号填写错误将无法到账</view>
      </view>
      <view class="zk-exchange-tips-list">
        <view class="zk-exchange-left">*</view>
        <view class="zk-exchange-tips-cont">当前仅支持支付宝充值</view>
      </view>
    </view>
    <view>
      <x-button btnText="一键充值" bgColor="#6F758D"></x-button>
    </view>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        arrList: [
          {
            name: '10元'
          },
          {
            name: '20元'
          },
          {
            name: '30元'
          },
          {
            name: '50元'
          },
          {
            name: '100元'
          }
        ],
        clickIndex: 0
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>
