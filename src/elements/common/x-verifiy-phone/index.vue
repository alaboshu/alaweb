<template>
  <div class="weui-cell weui-cell_vcode">
    <div class="weui-cell__hd">
      <label class="weui-label" style="width:4rem;">验证码</label>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input" type="number" required maxlength="6" minlength="6" v-model="currentValue" placeholder="输入六位数手机验证码">
    </div>
    <div class="weui-cell__ft">
      <button v-show="sendAuthCode" class="weui-vcode-btn" @click="sendMessage()">获取验证码</button>
      <button v-show="!sendAuthCode" class="weui-vcode-btn">{{auth_time}}重新获取</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { COMMON_SENDMOBILEVERIFIYCODE_POST } from '@/service/api/apiUrl' 
  // import apiService from 'src/service/api/common.api'
  export default {
    data () {
      return {
        word: '发送验证码',
        currentValue: '',
        sendAuthCode: true,
        auth_time: 0
      }
    },
    props: {
      mobile: {
        type: String,
        default: ''
      }
    },
    created () {
      this.currentValue = this.value
    },
    watch: {
      currentValue (newVal) {
        if (this.max && newVal && newVal.length > this.max) {
          this.currentValue = newVal.slice(0, this.max)
        }
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
      }
    },
    methods: {
      async sendMessage () {
        this.mobile = this.mobile.replace(/\s+/g, '')
        console.dir(this.mobile)
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

        if (!myreg.test(this.mobile)) {
          this.$vux.toast.warn('手机号不正确')
        } else {
          var repsonse = await this.$api.post(COMMON_SENDMOBILEVERIFIYCODE_POST, this.mobile)
          if (repsonse.data.status === 1) {
            console.log('验证码发送成功', 'bottom')
          } else {
            console.log('发送失败' + repsonse.data.message)
          }
          this.sendAuthCode = false
          this.auth_time = 60
          var authTimetimer = setInterval(() => {
            this.auth_time--
            if (this.auth_time <= 0) {
              this.sendAuthCode = true
              clearInterval(authTimetimer)
            }
          }, 1000)
        }
      }
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .weui-vcode-btn {
    color: @brand;
  }
</style>

