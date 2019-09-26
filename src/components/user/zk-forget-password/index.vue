<template>
  <!-- <view class="zk-reg1">{{widgetModel}}</view> -->
  <view>
    <view class="input_box">
      <view class="phone_text reg_ju">
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-mobilephone icontsty"></i>
          </view>
          <view class="text_2 borderleft">
            <input class="phope border-bottom" placeholder="请输入手机号" v-model="find.Mobile" />
          </view>
        </view>
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-combinationlock icontsty"></i>
          </view>
          <view class="text_2 border-bottom">
            <input class="phope vercate" placeholder="请输入新密码" :password="showPassword" v-model="find.Password" />
            <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
          </view>
        </view>
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-combinationlock icontsty"></i>
          </view>
          <view class="text_2">
            <input class="phope vercate" placeholder="确认新密码" :password="showPassword" v-model="find.ConfirmPassword" />
            <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="verification_code">
      <view class="text_1">
        <i class="icon iconfont zk-thekey yaosi"></i>
      </view>
      <view class="yanzhm">
        <input class="phope" type="number" placeholder="验证码" maxlength="6" v-model="find.MobileVerifiyCode" />
      </view>
      <view class="reg_box" v-if="sendAuthCode">
        <view class="reg_buttom botactiv" @click="sendMessage">获取验证码</view>
      </view>
      <view class="reg_box" v-if="!sendAuthCode">
        <view class="reg_buttom hui">{{auth_time}}重新获取</view>
      </view>
    </view>
    <view class="qued_ces">
      <button class="conter_list" @click="submitForm">确定</button>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        option: {},
        showPassword: true,
        auth_time: '',
        sendAuthCode: true,
        find: {
          Mobile: '',
          Password: '',
          ConfirmPassword: '',
          MobileVerifiyCode: ''
        }
      }
    },
    onLoad (option) {
      this.option = option
    },
    computed: {

    },
    mounted () {
      // this.init()
      // this.$api.share(this.option, '', '')
    },
    methods: {
      // async init () {
      //   var pages = getCurrentPages()
      // },
      async submitForm () {
        let par = {
          Mobile: this.find.Mobile,
          Password: this.find.Password,
          ConfirmPassword: this.find.ConfirmPassword,
          MobileVerifiyCode: this.find.MobileVerifiyCode
        }
        var repsonse = await this.$api.httpPost('Api/User/FindPassword', par)
        if (repsonse.status === 1) {
          this.$api.toastSuccess('注册成功')
          this.$api.to('/pages/user/login')
        }
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      },
      async sendMessage () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!myreg.test(this.find.Mobile)) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          })
          return false
        } else {
          let par = {
            mobile: String(this.find.Mobile)
          }
          await this.$api.httpGet('Api/Common/SendMobileVerifiyCode', par)
          this.sendAuthCode = false
          this.auth_time = 60
          var than_ = this
          var authTimetimer = setInterval(function () {
            than_.auth_time--
            if (than_.auth_time <= 0) {
              than_.sendAuthCode = true
              clearInterval(authTimetimer)
            }
          }, 1000)
        }
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .input_box {
    padding: 0px 20px;
  }
  .phone_text {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 1px 15px $gl-border1;
    padding: 15px 10px;
  }
  .mobei_conter {
    display: flex;
    align-items: center;
  }
  .topmar {
    margin-top: 15px;
  }
  .icontsty {
    font-size: 22px;
    color: $gl-text3;
  }
  .phope {
    font-size: 15px;
    flex: 1;
  }
  .text_1 {
    padding-right: 10px;
  }
  .text_2 {
    flex: 1;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .border-bottom {
    border-bottom: 1px solid $gl-border1;
    height: 40px;
  }
  .reg_view {
    margin-top: 15px;
  }
  .reg_view:nth-child(1) {
    margin-top: 0px;
  }
  .yanzhm {
    flex: 1;
  }
  .reg_ju {
    margin-top: 30px;
  }
  .verification_code {
    box-shadow: 0px 1px 15px $gl-border1;
    margin: 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
  }
  .yaosi {
    font-size: 26px;
    padding-left: 15px;
    color: $gl-text3;
  }
  .reg_buttom {
    font-size: 15px;
    color: $gl-light;
    background-color: $gl-brand;
    width: 95px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .botactiv:active {
    opacity: 0.7;
  }
  .qued_ces {
    padding: 10px 20px;
  }
  .conter_list {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: $gl-light;
    background-color: #ef4141;
  }
  .buttombac {
    background-color: $gl-brand;
  }
  .checkgr {
    margin-top: 5px;
  }
  .lables {
    color: $gl-text2;
  }
  .fuwu_xiy {
    color: $gl-brand;
    margin-left: -10px;
  }
  .vertop {
    vertical-align: -2px;
  }
  .hui {
    background-color: $gl-border1;
  }
</style>

