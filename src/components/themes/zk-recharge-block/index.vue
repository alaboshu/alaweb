<template>
  <view v-if="async">
    <view class="zk-recharge-block">
      <view class="zk_change_title">
        <view class="zk-change_title_text">ETH-CHANGE</view>
        <view class="zk-change_title_intro">0x724bd39B00fD66d79D5914C27aab98975694F40C</view>
      </view>
      <view class="zk-change_qrcode">
        <img src="http://api.szwft.me/wwwroot/uploads/api/375-431-798/2019-10-29/5db795c90724b825e00c1b01.png" alt="">
      </view>
      <view class="zk_change_list">
        <view class="zk-change_list_title">钱包信息</view>
        <view class="zk-change-list-cont">
          <x-select v-model="widgetModel.MoneyTypeId" label="充值账户" apiUrl="/Api/Recharge/GetAccountType"></x-select>
        </view>
        <view class="zk-change-list-cont">
          <x-input v-model="widgetModel.Amount" label="转账金额" :value="widgetModel.Amount"></x-input>
        </view>
        <view class="zk-change-list-cont">
          <textarea v-model="widgetModel.UserRemark " placeholder="请输入会员备注" style="height: 60px; width: 100%;"></textarea>
        </view>
      </view>
      <view class="zk_change_list" v-if="false">
        <view class="zk-change_list_title">区块链</view>
        <view class="zk-change-list-cont" v-if="false">
          <x-input v-model="widgetModel.MoneyTypeId" label="汇款人姓名" :disabled="true" :value="viewModel.price"></x-input>
        </view>
        <view class="zk-change-list-cont" v-if="false">
          <x-input v-model="widgetModel.bankName" :disabled="true" label="汇款银行" placeholder="请输入非链上备注"></x-input>
        </view>
        <view class="zk-change-list-cont" v-if="false">
          <x-input v-model="widgetModel.BankNumber" label="银行卡号" :disabled="true" placeholder="请输入您的银行卡号"></x-input>
        </view>
        <view class="zk-change-list-cont">
          <textarea v-model="widgetModel.UserRemark " placeholder="请输入会员备注" style="height: 60px; width: 100%;"></textarea>
        </view>
      </view>
      <x-button class="x-button-list" btnText="确认付款" @click="submint" :loading="loading"></x-button>

      <view class="zk-change-list-tips">
        <view class="zk-exchange-tips-cont">1、请认真核对您所消费的套餐</view>
        <view class="zk-exchange-tips-cont"> 2、在消费套餐之前请您先完善相关的资料</view>
        <view class="zk-exchange-tips-cont"> 3、为了尽快的审核您的消费，请第一时间完成付款</view>
        <view class="zk-exchange-tips-cont"> 4、付款完成后，一定要在提交付款申请</view>
        <view class="zk-exchange-tips-cont">5、上一笔消费未完成之前不能重复消费</view>
        <view class="zk-exchange-tips-cont">6、您可以在会员中心查看您的累计消费</view>
        <view class="zk-exchange-tips-cont">7、您可以在会员中心查看您的消费级别</view>
        <view class="zk-exchange-tips-cont">8、在消费过程中有任何的疑问请联系公司客服人员</view>
      </view>
    </view>
    <x-msg v-if="isMsg"></x-msg>
  </view>
</template>

<script>
  export default {
    props: {
      widget: {}
    },
    data () {
      return {
        async: false,
        currentModel: null,
        isMsg: false,
        loading: false,
        widgetModel: {
          MoneyTypeId: '',
          Amount: '',
          UserRemark: '',
          UserBankName: '区块链',
          UserBankType: 999,
          UserBankNumber: '区块链转账'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.currentModel = this.$user.loginUser()
        this.async = true
      },
      async submint () {
        this.loading = true
        this.widgetModel.UserId = this.$user.id()
        var response = await this.$api.httpPost('Api/Recharge/AddOffline', this.widgetModel)
        if (response.status === 1) {
          this.widgetModel.UserRemark = ''
          this.widgetModel.Amount = ''
          this.isMsg = true
        } else {
          this.$api.toastWarn(response.message)
        }
        this.loading = false
      }
    }
  }
</script>


<style lang="scss">
  @import "./var.scss";
</style>
