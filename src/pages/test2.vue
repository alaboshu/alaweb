<template>
  <!-- <div @click="testClick()" :id="testId">
    检查更新{{testId|testFileters}}
  </div> -->
  <!-- <iframe src="https://chat.meiqiapaas.com/dist/standalone.html?eid=145450" :style="'width:100%;height:'+widthIframe+'px'" frameborder="0"></iframe> -->
  <div>


  </div>
</template>
<script>
  import crypto from '@/utils/crypto'
  export default {
    data () {
      return {
        widthIframe: 0,
        oldTest: { 'type': 'string', 'data': 'data' },
        newTest: { 'type': 'string', 'data': 'data' },
        newToken: { 'type': 'string', 'data': '050abb9d127364e3aff1ce978f7520d1LeYbQzcUmdgzcuG448a2c674469a84f39272d22be6983d9ce8e4e38f430e1e649' },
        oldToken: { 'type': 'string', 'data': '"050abb9d127364e3aff1ce978f7520d1LeYbQzcUmdgzcuG448a2c674469a84f39272d22be6983d9ce8e4e38f430e1e649"' },
        newInfo: { 'type': 'string', 'data': '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' },
        oldInfo: { 'type': 'string', 'data': '"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"' }
      }
    },
    mounted () {
      this.init()
    },
    filters: {
      testFileters (val) {
        if (!val) return ''
        return val + '123'
      }
    },
    methods: {
      testClick () {
        // eslint-disable-next-line
        // plus.runtime.launchApplication({ action: 'itms-apps://' }, function (e) {
        // })
      },
      async  init () {
        var userInfo = this.$user.loginUser()
        console.log('userInfo', userInfo)
        var loginUser = JSON.parse(
          crypto.decrypt(
            this.newInfo.data,
            this.newToken.data
          )
        )
        console.log('loginUser', loginUser)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mpao {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .x-msg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    padding-top: 36px;
    text-align: center;
    .msg-icon {
      margin-bottom: 30px;
      i {
        font-size: 93px;
        color: #09bb07;
      }
    }
    .msg-text-area {
      margin-bottom: 25px;
      padding: 0 20px;
      .area-title {
        margin-bottom: 5px;
        font-weight: 400;
        font-size: 20px;
      }
      .area-desc {
        margin-bottom: 5px;
        font-weight: 400;
        font-size: 20px;
      }
    }
    .msg-opr-area {
      margin-bottom: 25px;
      .btn-area {
        margin: 15px 10px 10px 10px;
        .msg-btn {
          position: relative;
          display: block;
          margin-left: auto;
          margin-right: auto;
          padding-left: 14px;
          padding-right: 14px;
          box-sizing: border-box;
          font-size: 18px;
          text-align: center;
          text-decoration: none;
          color: #ffffff;
          line-height: 2.33333333;
          border-radius: 5px;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .msg-btn + .msg-btn {
          margin-top: 15px;
        }
        .btn_primary {
          background: #1aad19;
        }
        .btn_default {
          color: #000000;
          background-color: #f8f8f8;
        }
      }
    }
  }
</style>
