<template>
  <view class="zk-merchant-pay" v-if="async">
    <view class="merchant_pay_container">
      <view class="pay_top" @click="goBack()" v-if="titleShow">
        <x-icon name="zk-return"></x-icon>
        <span>向商家付款</span>
      </view>
      <view class="pay_content">
        <view class="pay_content_head">
          <view v-if="webDiyBasicInfo" class="pay_content_head_img"><img :src="webDiyBasicInfo.logo" alt=""></view>
          <span v-if="webDiyBasicInfo">{{webDiyBasicInfo.description}}</span>
        </view>
        <view class="pay_content_money">
          <view class="content_money">
            <view style="display:flex;font-size:18px;align-items: center;">
              <span style="font-size:18px">￥</span>
              <input class="uni-input" maxlength="10" focus @focus="showBord" v-model="TeXt" @keyup="numberAmount(TeXt)" />
            </view>
            <span style="font-size:13px;color:#666">输入付款金额</span>
          </view>
          <view class="elseMoney">账户可用余额 {{userBase.storeRevenue}}</view>
        </view>
        <view class="pay_keyBord" v-show="showKeyBord">
          <view class="keyBord_number">
            <span v-for="(item,index) in NumberData" :key="index" @click="geItem(item)">{{item}}</span>
          </view>
          <view class="keyBord_btn">
            <span class="btn_icon" @click="deleteNum()">
              <x-icon name="icon-zk-cuowu" :size="26"></x-icon>
            </span>
            <view class="btn_confirm">
              <span @click="paymentValuation">确认支付</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <x-msg caption="支付成功" v-if="showmsg"></x-msg>
  </view>
</template>
<script>
 
  import './var.scss'
  import './styles'
  import { setTimeout } from 'timers'
  export default {
    
    data () {
      return {
        async: false,
        widgetModel: {},
        TeXt: '',
        NumberData: ['1', '2', '3',
          '4', '5', '6', '7', '8', '9', '0', '.'],
        numData: [],
        showKeyBord: false,
        titleShow: true,
        userBase: null,
        webDiyBasicInfo: null,
        showmsg: false
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
        if (this.$api.client() === 'WeChatLite') {
          this.titleShow = false
        } else {
          this.titleShow = true
        }
        var para = {
          userId: this.$user.id()
        }
        var response = await this.$crud.widget(this, 'MemberWidget', para)
        this.userBase = response
        var res = await this.$api.httpGet('/Api/MerchantProduct/GetMerchantProducts')
        if (res.status === 1) {
          this.webDiyBasicInfo = res.result.merchantStore
        }
        this.async = true
      },
      geItem (item) {
        if (this.TeXt.length === 0) {
          this.numData = []
        }
        if (item === '.' && this.TeXt === '') {
          this.numData = []
        } else {
          var regText = /^\d*\.{0,2}\d{0,1}$/
          if (!regText.test(this.TeXt)) {
            this.$api.toastWarn('请输入正确的金额')
          } else {
            this.numData.push(item)
            var StringValue = this.numData.join('')
            this.TeXt = StringValue
          }
        }
      },
      deleteNum () {
        this.TeXt = this.TeXt.substr(0, this.TeXt.length - 1)
        this.numData = []
        this.numData.push(this.TeXt)
        if (this.TeXt.length === 0) {
          this.numData = []
          this.TeXt = ''
        }
      },
      showBord () {
        this.showKeyBord = true
        document.activeElement.blur()
      },
      goBack () {
        this.$api.back()
      },

      async paymentValuation () {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        var bailPayMoney = this.TeXt
        if (!reg.test(bailPayMoney)) {
          this.$api.toastWarn('请输入正确的金额')
          return
        }
        var userLogin = this.$user.id()
        var para = {
          userId: userLogin,
          name: userLogin.userName,
          gradeId: userLogin.gradeId,
          gradeName: userLogin.gradeName,
          amount: this.TeXt
        }
        var repones = await this.$api.httpPost('Api/FacePay/Pay', para)
        if (repones.status === 1) {
          this.$api.toastSuccess('支付成功')
          var this_ = this
          setTimeout(function () {
            this_.init()
          }, 1500)
          this.numData = []
          this.TeXt = ''
          setTimeout(function () {
            this_.showmsg = true
            this_.async = false
          }, 1500)
        } else {
          this.$api.toastWarn(repones.message)
        }
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.children[0].focus()
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
