<template>
  <view class="zk-exchange" v-if="viewModel">
    <view class="qrcode_icon" v-if="false">
      <x-icon name="icon-zk-black" :color="'#ffffff'" :size="16"></x-icon>
    </view>
    <view>
      <view class="zk-exchange-card" v-if="false">
        <view class="zk-exchange-name">平台账号</view>
        <view class="zk-exchange-account ">
          <view>
            <view>0x7451...1023</view>
            <view></view>
          </view>
          <view class="zk-exchange-exchange" @click="clipboardData" v-if="false">复制</view>
        </view>
      </view>
      <view class="zk-exchange-list">
        <view class="zk-exchange-list-title">选择消费套餐</view>
        <view class="zk-exchange-list-form">
          <view class="zk-exchange-list-cont" :class="{actions: clickIndex==index}" v-for="(item, index) in viewModel" v-show="item.Price !== 0" :key="index" @click="clickIndex = index, clickItem = item">
            <view class="zk-exchange-title">{{item.Name}}</view>
            <view class="zk-exchang-intro">{{item.Intro}}</view>
            <view class="zk-exchang-intro">￥{{item.Price}}</view>
          </view>
        </view>
      </view>
      <view class="zk-exchange-pay">
        <checkbox value="cb" checked="true" />
        <view @click="$api.to('/pages/app/agree')">同意平台服务条款</view>
      </view>
      <x-button :btnText="btnText" class="zk-exchange-btn" @click="sbmit"></x-button>
      <view class="zk-exchange-tips">
        <view class="zk-exchange-tips-list" v-if="false">
          <view class="zk-exchange-left">*</view>
          <view class="zk-exchange-tips-cont">确定您将购买的套餐，点击确认付款进行地址确认和付款</view>
        </view>
        <view class="zk-exchange-tips-list">
          <view class="zk-exchange-tips-cont">1、请认真核对您所消费的套餐</view>
          <view class="zk-exchange-tips-cont"> 2、在消费套餐之前请您先完善相关的资料</view>
          <view class="zk-exchange-tips-cont"> 3、为了尽快的审核您的消费，请第一时间完成付款</view>
          <view class="zk-exchange-tips-cont"> 4、付款完成后，一定要在提交付款申请</view>
          <view class="zk-exchange-tips-cont">5、您可以在会员中心查看您的消费记录</view>
          <view class="zk-exchange-tips-cont">6、您可以在会员中心查看您的累计消费</view>
          <view class="zk-exchange-tips-cont">7、您可以在会员中心查看您的消费级别</view>
          <view class="zk-exchange-tips-cont">8、在消费过程中有任何的疑问请联系公司客服人员</view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
  export default {
    data () {
      return {
        isBtn: true,
        viewModel: null,
        clickIndex: 1,
        clickItem: null,
        btnText: '求购版通'
      }
    },
    methods: {
      async init () {
        this.$user.checkLogin()
        var response = await this.$api.httpGet('/api/autoconfig/GetAutoConfigList?type=UserLevelConfig')
        this.viewModel = response.result
        this.clickItem = this.viewModel[1]
        this.btnText = '求购版通'
        if (this.$user.isLogin()) {
          this.userData()
        }
      },
      async sbmit () {
        if (this.isBtn) {
          this.$api.to('/pages/app/recharge?price=' + this.clickItem.Price + '&id=' + this.clickItem.Id)
        } else {
          this.$api.to('/pages/user/data')
        }
      },
      async userData () {
        // 查看用户是否完善资料
        var response = await this.$api.httpGet('Api/UserLevel/IsPerfect')
        if (response.result === false) {
          this.isBtn = false
          this.btnText = '返回'
          uni.showModal({
            title: '资料未完善',
            content: '请先完善资料',
            showCancel: false,
            success: () => {
              this.$api.to('/pages/user/data')
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./var.scss";
</style>
