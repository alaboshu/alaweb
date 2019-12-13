<template>
  <view>
    <view class="input_box">
      <view class="phone_text reg_ju">
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-mobilephone icontsty"></i>
          </view>
          <view class="text_2 borderleft">
            <input class="phope border-bottom" placeholder="请输入手机号" v-model="zceuser.Mobile" />
          </view>
        </view>
        <view class="mobei_conter reg_view">
          <view class="text_1">
            <i class="icon iconfont zk-combinationlock icontsty"></i>
          </view>
          <view class="text_2">
            <input class="phope vercate" placeholder="请输入密码" :password="showPassword" v-model="zceuser.Password" />
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
        <input class="phope" type="number" placeholder="验证码" maxlength="6" v-model="zceuser.MobileVerifiyCode" />
      </view>
      <view class="reg_box" v-if="sendAuthCode">
        <view class="reg_buttom botactiv" @click="sendMessage">获取验证码</view>
      </view>
      <view class="reg_box" v-if="!sendAuthCode">
        <view class="reg_buttom hui">{{auth_time}}重新获取</view>
      </view>
    </view>
    <view class="qued_ces">
      <button class="conter_list" :class="{'buttombac':check==true}" :disabled="disboll" @click="submitForm">确定</button>
      <view class="posiconter">
        <x-a class="wanmma" path="/pages/index?path=user_password_find">忘记密码？</x-a>
        <x-a class="zuce" path="/pages/user/login">登录</x-a>
      </view>
      <checkbox-group class="checkgr" @change="onchec">
        <label class="lables">
          <checkbox value="cb" :checked="check" />
          <span class="vertop">我已经阅读并同意</span>
        </label>
        <span class="fuwu_xiy vertop">《服务协议》</span>
      </checkbox-group>
    </view>
  </view>
</template>

<script>
  export default {
    created () {
      if (this.$user.isLogin()) {
        uni.reLaunch({
          url: '/'
        })
      }
    },
    data () {
      return {
        widgetModel: '',
        showPassword: true,
        check: true,
        sendAuthCode: true,
        disboll: false,
        auth_time: '',
        zceuser: {
          Mobile: '',
          MobileVerifiyCode: '',
          Password: '',
          ConfirmPassword: '',
          Code: 'admin'
        }
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      changePassword: function () {
        this.showPassword = !this.showPassword
      },
      onchec () {
        this.check = !this.check
        if (this.check === true) {
          this.disboll = false
        } else {
          this.disboll = true
        }
      },
      async sendMessage () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (!myreg.test(this.zceuser.Mobile)) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          })
        } else {
          let par = {
            mobile: String(this.zceuser.Mobile)
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
      },
      async submitForm () {
        this.zceuser.ConfirmPassword = this.zceuser.Password
        var suconter = await this.$api.httpPost('/api/member/reg', this.zceuser)
        if (suconter !== undefined) {
          if (suconter.status === 1) {
            this.$api.toastSuccess('注册成功')
            this.$api.to('/pages/user/login')
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-reg1 {
    font-size: $gl-size-base;
  }
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
    height: 75upx;
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
    height: 75upx;
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
    background-color: #dddddd;
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
  .posiconter {
    margin-top: 5px;
    overflow: hidden;
  }
  .wanmma {
    color: $gl-text2;
    float: left;
  }
  .zuce {
    color: $gl-brand;
    float: right;
  }
</style>
