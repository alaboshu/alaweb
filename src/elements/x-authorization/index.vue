<template>
  <div v-if="showAuthorization">
    <!-- < <open-data type="userNickName"></open-data>
    <open-data type="userAvatarUrl"></open-data>
    <open-data type="userGender" lang="zh_CN"></open-data>-->
    <div class="mask"></div>
    <div v-if="authorizationphone">
      <div class="authorization-popup">
        <div class="authorization-title">请输入关联账号的手机号</div>
        <div class="authorization-content">
          <div class="phone_box">
            <div class="label">
              手机号
            </div>
            <div class="text">
              <input type="text" class="uni-input" v-model="phoneModel" placeholder="请输入手机号">
            </div>
          </div>
        </div>
        <div class="authorization-content">
          <div class="verification-box">
            <div class="label">验证码</div>
            <input class="uni-input" v-model="verificationModel" placeholder="请输入验证码" />
            <div class="text" @click="verification" v-if="sendAuthCode">获取验证码</div>
            <div class="text" v-if="!sendAuthCode">{{countdownTime}}重新获取</div>
          </div>
        </div>
        <div class="authorization-btn">
          <!-- <button class="btn-caneel" @click="phoneClick()">拒绝</button> -->
          <button @click="LoginBindWX" class="btn-login">确认</button>
        </div>
      </div>
    </div>
    <div v-if="authorizationFirst">
      <div class="authorization-popup">
        <div class="authorization-title">信息授权提示</div>
        <div class="authorization-content">需要获取您的公开信息(昵称、头像等)，请点击允许进行用户授权</div>
        <div class="authorization-btn">
          <button class="btn-caneel" @click="authorizationFirst=false,authorizationSecond=true">拒绝</button>
          <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="authorizationSecond" class="btn-login">允许</button>
        </div>
      </div>
    </div>
    <div v-show="authorizationSecond">
      <div class="authorization-popup">
        <div class="authorization-title">提示</div>
        <div class="authorization-content">尚未登录，将无法进行正常使用该程序,登录程序需进行微信授权</div>
        <div class="authorization-btn">
          <!-- <button class="btn-caneel">拒绝</button> -->
          <navigator class="btn-caneel" open-type="exit" target="miniProgram">关闭</navigator>
          <button @click="authorizationSecond=false,authorizationFirst=true" class="btn-login">允许</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        authorizationFirst: true,
        authorizationSecond: false,
        showAuthorization: false,
        authorizationphone: false,
        phoneModel: '',
        verificationModel: '',
        sendAuthCode: true,
        countdownTime: '',
        par: null,
        code: null,
        firstNot: false

      }
    },
    created () {
    },

    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var that = this
        if (this.$api.isEmpty(this.$user.loginUser())) {
          if (this.$api.client() === 'WeChatLite') {
            wx.getSetting({
              success (res) {
                if (res.authSetting['scope.userInfo']) {
                  that.showAuthorization = false
                  that.bindGetUserInfo()
                } else {
                  that.showAuthorization = true
                }
              }
            })
          }
        }
      },
      phoneClick () {
        this.firstNot = true
        this.showAuthorization = false
        this.$api.localSet('code', this.code)
      },
      async   verification () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.phoneModel)) {
          let parament = {
            mobile: String(this.phoneModel)
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
      },
      async  LoginBindWX () {
        this.authorizationphone = true
        this.par.mobile = this.phoneModel
        this.par.MobileVerifiyCode = this.verificationModel
        var loginBindWXrespone = await this.$api.httpPost('Api/Member/LoginBindWX', this.par)
        if (loginBindWXrespone.status === 1) {
          this.$user.setUser(loginBindWXrespone.result)
          this.$api.localSet('wechat_openId', loginBindWXrespone.result.openId)
          uni.hideLoading()
          this.showAuthorization = false
          uni.reLaunch({
            url: '/pages/default'
          })
        } else {
          uni.hideLoading()
          uni.showToast({
            icon: 'none',
            title: loginBindWXrespone.message
          })
        }
      },
      hidePopup () {
        this.authorizationFirst = true
      },
      userInfo () {
        this.authorizationFirst = false
        this.authorizationSecond = false
      },
      failed () {
        uni.showToast({
          icon: 'none',
          title: '授权失败'
        })
      },
      successed () {
        this.authorizationFirst = true
        this.authorizationSecond = false
        this.showAuthorization = false
      },
      async  bindGetUserInfo (e) {
        var that = this
        var bindWx
        if (this.$api.client() === 'WeChatLite') {
          wx.getSetting({
            success (res) {
              if (res.authSetting['scope.userInfo']) {
                uni.showLoading({
                  title: '加载中..'
                })
                that.successed()
                wx.getUserInfo({
                  success: res => {
                    that.$api.localSet('weixin_user', res.userInfo)
                    wx.login({
                      success: async res => {
                        var codeV = res.code
                        that.code = codeV
                        let par = {
                          code: codeV
                        }
                        var loginWXresponse = await that.$api.httpPost('Api/Member/LoginWX', par)

                        var userOpenId = loginWXresponse.result.openId
                        that.$api.localSet('wechat_openId', userOpenId)
                        bindWx = {
                          ...that.$api.localGet('weixin_user'),
                          code: codeV,
                          openId: userOpenId
                        }
                        if (loginWXresponse.status !== 1) {
                          uni.hideLoading()
                          uni.showToast({
                            icon: 'none',
                            title: loginWXresponse.message
                          })
                          that.failed()
                        } else {
                          if (loginWXresponse.status === 1) {
                            if (loginWXresponse.result.isLogin) {
                              that.$user.setUser(loginWXresponse.result.userInfo)
                              uni.hideLoading()
                              that.successed()
                            } else {
                              that.par = bindWx
                              that.showAuthorization = true
                              that.authorizationphone = true
                              that.authorizationFirst = false
                              that.authorizationSecond = false
                              uni.hideLoading()
                            }
                          }
                        }
                      },
                      fail: () => {
                        that.failed()
                      }
                    })
                  },
                  fail: () => {
                    that.failed()
                  }
                })
              } else {
                uni.hideLoading()
                that.failed()
              }
            }
          })
        }
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
  .mask {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }
  .authorization-popup {
    background: #fff;
    width: 70%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    padding: 15px;
    .authorization-title {
      font-size: $gl-h5-size;
    }
    .authorization-content {
      margin-top: 10px;
      font-size: 0.8rem;
      color: #909399;
      text-align: center;
      .uni-input {
        text-align: left;
      }
      .phone_box {
        height: 35px;
        display: flex;
        align-items: center;
        .label {
          width: 80px;
          padding-right: 5px;
          font-size: 12px;
        }
        .text {
          flex: 1;
          text-align: left;
        }
      }
    }
    .authorization-warn {
      margin-top: 10px;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      justify-content: space-around;
    }
    .authorization-btn {
      margin-top: 10px;
      font-size: 0.8rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-caneel {
        text-align: center;
        width: 80px;
        height: 30px;
        line-height: 30px;
        color: #909399;
        background: none;
      }
      .btn-login {
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-left: 15px;
        background: none;
        color: #62b900;
      }
    }
  }
  .show-authorization {
    padding: 20px;
    text-align: left;
    .show-authorization-title {
      margin-top: 10px;
      font-weight: bold;
      font-size: $gl-h5-size;
      letter-spacing: 2px;
    }
    .show-authorization-content {
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      padding: 10px 0;
      display: flex;
      .avator {
        width: 40px;
        height: 40px;
      }
      .message {
        margin-left: 10px;
        .info {
          color: #909399;
        }
      }
    }
    .show-authorization-btn {
      padding-top: 30px;
      padding-bottom: 15px;
      display: flex;
      width: 100%;
      text-align: center;
      button {
        font-weight: bold;
        margin: 0 10px;
        width: 45%;
      }
      .cancel {
        color: #000;
      }
      .allow {
        background: #62b900;
        color: #fff;
      }
    }
  }
</style>

