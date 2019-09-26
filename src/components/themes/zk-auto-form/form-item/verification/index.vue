<template>
  <div>
    <p v-if="widget.apiUrl === '/api/user/changepassword'" class="verification-helpblock">请用已绑定账号的手机号&nbsp;{{defaultModel}}&nbsp;获取验证码：</p>
    <div class="verification-box">
      <div class="label">验证码</div>
      <input class="uni-input" v-model="verificationModel" placeholder="请输入验证码" />
      <div class="text" @click="verification" v-if="sendAuthCode">获取验证码</div>
      <div class="text" v-if="!sendAuthCode">{{countdownTime}}重新获取</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        phone: '',
        sendAuthCode: true,
        countdownTime: '',
        verificationModel: '',
        defaultModel: ''
      }
    },
    props: {
      value: {},
      formModel: {},
      config: {},
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.widget.apiUrl === '/api/user/changepassword') {
          this.defaultModel = this.$user.loginUser().mobile
        }
      },

      async   verification () {
        if (this.$api.client() === 'AppPlus') {
          // this.phone = this.$store.state.phoneVerification
          this.phone = this.$api.vuexGet('phoneVerification')
        } else {
          this.config.list.forEach((element) => {
            if (element.name === '手机号') {
              this.phone = this.formModel[element.model]
            }
          })
        }
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.phone)) {
          let parament = {
            mobile: String(this.phone)
          }
          var response = await this.$api.httpGet('Api/Common/SendMobileVerifiyCode', parament)
          if (response.status === 1) {
            this.sendAuthCode = false
            this.countdownTime = 60
            var vueThis = this
            var authTimetimer = setInterval(() => {
              vueThis.countdownTime--
              if (vueThis.countdownTime <= 0) {
                clearInterval(authTimetimer)
                this.sendAuthCode = true
              }
            }, 1000)
          } else {
            uni.showToast({
              icon: 'none',
              title: response.message
            })
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          })
        }
      }
    },
    watch: {
      verificationModel (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  .verification-helpblock {
    color: #666;
    font-size: 12px;
  }
  .verification-box {
    display: flex;
    align-items: center;
    .label {
      width: 80px;
      padding-right: 5px;
      font-size: 12px;
    }
    .text {
      height: 100%;
      display: flex;
      height: 35px;
      line-height: 35px;
      justify-content: center;
      background: $gl-brand;
      color: #fff;
      border-radius: 3 px;
      font-size: 12px;
      padding: 0px 8px;
    }
  }
</style>
