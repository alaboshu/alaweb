<template>
  <view class="zk-stored-account" v-if="async">
    <view class="stored_account_container">
      <view class="account_top">
        <view class="account_top_title" v-if="titleShow" @click="goBack()">
          <x-icon name="zk-return" size="18" color="#000"></x-icon>
          <span>储值账户</span>
        </view>
        <view class="account_top_content">
          <span>账户余额(元)</span>
          <span>{{memberWidget.storeRevenue}}</span>
          <span>每次充值您可以选择您的个人消费喜好</span>
        </view>
      </view>
      <view class="account_main">
        <view class="account_main_warns">请选择充值额度</view>
        <view class="account_main_type" v-if="viewModel">
          <view v-for="(item,index) in viewModel" :key="index" class="type_item" @click="getIndex(index,item.storeAmount)" :class="Cindex===index ? 'type_active' :'null'">
            <span>￥{{item.storeAmount}}</span>
            <span>{{item.intro}}</span>
          </view>
        </view>
        <ul class="describe" v-if="Cindex !== -1">
          <li>描述：{{viewModel[Cindex].intro}}</li>
          <li v-if="viewModel[Cindex].storeAmount !== 0">到账储值金额： {{viewModel[Cindex].storeAmount}}</li>
          <li v-if="viewModel[Cindex].giveBuyAmount !== 0">赠送消费额： {{viewModel[Cindex].giveBuyAmount}}元</li>
          <li v-if="viewModel[Cindex].discountAmount !== 0">赠送优惠券： {{viewModel[Cindex].discountAmount}}</li>
          <li v-if="viewModel[Cindex].giveChangeAmount !== 0">赠送积分： {{viewModel[Cindex].giveChangeAmount}}</li>
        </ul>
      </view>
      <!-- <view class="account_bottom" :class="tabBottom===true? 'tabBottomTrue':'tabBottomFalse'">
        <span @click="accountWas">账户充值{{payMoney}}元</span>
        <span>账户充值{{payMoney}}元</span>
        <a href="javascript:">立即联系商家</a>
      </view> -->
      <view class="account_bottom" :class="tabBottom===true? 'tabBottomTrue':'tabBottomFalse'">
        <div class="account_bottom_payMoney">
          <div class="account_bottom_pay_left">账户充值{{payMoney}}元</div>
          <div @click="accountWas" class="account_bottom_pay_right" v-if="showAccount&&false">充值</div>
        </div>
        <a href="javascript:">立即联系商家</a>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        payMoney: 0,
        Cindex: -1,
        titleShow: true,
        typeDataIndex: 0,
        viewModel: '',
        paraValue: {},
        memberWidget: null,
        tabBottom: true,
        showAccount: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (getCurrentPages()[getCurrentPages().length - 1].option.path === 'stored_value_edit') {
          this.tabBottom = true
        } else if (getCurrentPages()[getCurrentPages().length - 1].option.path === undefined) {
          this.tabBottom = false
        }
        var respone = await this.$api.httpGet('/Api/RechargeAccountLog/GetRechargeConfigList')
        this.viewModel = respone.result
        if (respone.message !== '1') {
          this.showAccount = false
        }
        var memberWidget = await this.$crud.widget(this, 'MemberWidget', { userId: this.$user.id() })
        this.memberWidget = memberWidget
        if (this.$api.client() === 'WeChatLite') {
          this.titleShow = false
        } else {
          this.titleShow = true
        }
        this.getIndex(0, this.viewModel[0].storeAmount)
        this.async = true
      },
      getIndex (index, money) {
        this.Cindex = index
        this.payMoney = money
        this.paraValue = this.viewModel[this.Cindex]
      },
      goBack () {
        uni.reLaunch({
          url: '/'
        })
      },
      async accountWas () {
        var userName = this.$user.loginUser()
        if (userName.userName === null) {
          return
        }
        this.paraValue.userName = userName.userName
        var savePones = await this.$api.httpPost('/Api/RechargeAccountLog/Save', this.paraValue)
        if (savePones.status === 1) {
          this.$api.toastSuccess(savePones.message)
          var this_ = this
          setTimeout(function () {
            this_.init()
          }, 1500)
        } else {
          this.$api.toastWarn(savePones.message)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
