<template>
  <view v-if="async">
    <!-- 分割线 -->
    <view class="zk_change_2">

      <view class="zk_change_list">
        <view class="zk-change_list_title">消费信息</view>
        <view class="zk-change-list-cont">
          <x-input v-model="viewModel.price" label="消费金额" :disabled="true" :value="viewModel.price"></x-input>
        </view>
        <view class="zk-change-list-cont">
          <x-input v-model="viewModel.reducePrice" label="流转资产余额" :disabled="true" :value="viewModel.reducePrice"></x-input>
        </view>
      </view>
      <view class="zk_change_list">
        <view class="zk-change_list_title">安全验证</view>
        <view class="zk-change-list-cont">
          <x-password :isNum="true" v-model="viewModel.payPassword" label="支付密码" :value="viewModel" placeHolder="请输入您的支付密码"></x-password>
        </view>
        <view class="zk-change-list-cont">
          <x-phone-verifiy label="手机验证码" v-model="viewModel.verifiyCode" :currentModel="currentModel"></x-phone-verifiy>
        </view>
      </view>
      <x-button class="x-button-list" btnText="确认付款" @click="submint" :loading="loading"></x-button>

      <view class="zk-change-list-tips">
        <view class="zk-exchange-tips-cont">1、流转资产余额不足时请充值</view>
        <view class="zk-exchange-tips-cont"> 2、请认真核对您所消费的套餐</view>
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
        viewModel: {
          name: '',
          verifiyCode: '',
          payPassword: '',
          price: '',
          remark: '',
          reducePrice: 0, // 消费资产
          configId: ''
        },
        async: false,
        currentModel: null,
        isMsg: false,
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          userId: this.$user.id(),
          moneyConfigId: 'e97ccd1e-1478-49bd-bfc7-e73a5d699756'
        }
        var response = await this.$api.httpGet('Api/Account/GetAccount', para)
        if (response.status === 1) {
          this.viewModel.reducePrice = response.result.amount
        }
        this.viewModel.price = this.widget.price
        this.viewModel.configId = this.widget.id

        this.currentModel = this.$user.loginUser()
        this.async = true
      },
      async submint () {
        this.loading = true
        var response = await this.$api.httpPost('Api/UserLevelRecord/Active', this.viewModel)
        if (response.status === 1) {
          this.viewModel.verifiyCode = ''
          this.viewModel.payPassword = ''
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
