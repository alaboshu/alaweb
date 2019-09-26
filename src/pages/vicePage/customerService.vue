<template>
  <div>
    <div v-if="!isApp">
      <iframe src="https://chat.meiqiapaas.com/dist/standalone.html?eid=145450" :style="'width:100%;height:'+widthIframe+'px'" frameborder="0"></iframe>
    </div>
    <div v-if="isApp">
      <div class="callCustomerService" @click="showShare">点击联系客服</div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        widthIframe: 0,
        async: false,
        isApp: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.isApp = this.$api.client() === 'AppPlus'
        this.widthIframe = this.$api.getSystemInfoSync().windowHeight - 5
        this.async = true
      },
      showShare () {
        /* eslint-disable */
        var topHeight = this.$api.getSystemInfoSync().statusBarHeight + 46
        var height = this.$api.getSystemInfoSync().windowHeight - 46 - this.$api.getSystemInfoSync().statusBarHeight
        var w = plus.webview.create('https://chat.meiqiapaas.com/dist/standalone.html?eid=145450', 'share', { top: topHeight + 'px', height: height + 'px' })
        w.show() // 显示窗口
      }
    },
    onBackPress () {
      plus.webview.close('share')
    }
  }
</script>

<style lang="scss" scoped>
  .callCustomerService {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 150px;
    height: 50px;
    border: 2px solid #dcdfe6;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    background: #c81432;
    font-weight: bold;
    color: #fff;
  }
</style>
