<template>
  <div class="verification-box">
    <div class="label">{{label}}</div>
    <input class="uni-input" v-model="viewModel" placeholder="请输入验证码" />
    <div class="text" @click="verification" v-if="sendAuthCode">获取验证码</div>
    <div class="text" v-if="!sendAuthCode">{{countdownTime}}重新获取</div>
  </div>
</template>
<script>
  export default {
    model: {
      prop: 'dataModel',
      event: 'change'
    },
    data () {
      return {
        phone: '',
        sendAuthCode: true,
        countdownTime: '',
        viewModel: ''
      }
    },
    props: {
      dataModel: {},
      label: {},
      currentModel: {},
      column: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (this.dataModel) this.viewModel = this.dataModel
      },
      async  verification () {
        if (!this.sendAuthCode) {
          return
        }
        this.sendAuthCode = false
        var mark = null
        if (this.column !== undefined && this.column !== null) {
          mark = this.column.mark
        }
        if (!mark) {
          mark = 'mobile'
        }
        this.phone = this.currentModel[mark]
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (myreg.test(this.phone)) {
          let parament = {
            mobile: this.phone
          }
          var response = await this.$api.httpPost('Api/Sms/SendVerifiyCode', parament)
          if (response.status === 1) {
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
            this.sendAuthCode = true
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          })
          this.sendAuthCode = true
        }
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          this.$emit('change', this.viewModel)
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
</style>
