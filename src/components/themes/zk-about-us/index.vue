<template>
  <view class="zk-about-us" :style="'height:'+aboutHeight+'px;'" v-if="async">
    <view class="about-us_head">
      <img class="us_head-img" src="http://www.szwft.me/img/logo.jpg" />
      <div class="us_head-title">
        阿拉博数
      </div>
      <div class="us_head-version">
        <span>Version</span> <span>{{version}}</span>
      </div>
    </view>
    <view class="about-us_middle">
      <view class="us_middle-item" @click="checkVersion">
        <view class="middle-item-left">
          版本更新
        </view>
        <view class="middle-item-right">
          <i class="zk-right icon iconfont"></i>
        </view>
      </view>
    </view>
    <view class="about-us_foot">
      <p>Copyright&copy;2018-2019</p>
      <p>阿拉博数qiniuniu99.com版权所有</p>
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
        aboutHeight: '',
        version: ''
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
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.$api.client() === 'WeChatLite') {
          this.aboutHeight = this.$api.getSystemInfoSync().screenHeight - 65
        } else {
          this.aboutHeight = this.$api.getSystemInfoSync().screenHeight - 46
        }
        /* eslint-disable */
        var _this = this
        plus.runtime.getProperty(plus.runtime.appid, async function (wgtinfo) {
          _this.version = wgtinfo.version
        })
        this.async = true
      },
      checkVersion () {
        var version
        var _this = this
        /* eslint-disable */
        plus.runtime.getProperty(plus.runtime.appid, async function (wgtinfo) {
          version = wgtinfo.version
          this.version = version
          let par = {
            AppClient: _this.$api.payType(),
            Version: version
          }
          var response = await _this.$api.httpGet('Api/ApiStore/AppCheckVersion', par)
          if (response.status === 1) {
            if (response.result.status === 1) {
              uni.showModal({
                title: '发现新版本',
                content: response.result.note,
                success: function (res) {
                  if (res.confirm) {
                    plus.runtime.launchApplication({ action: 'itms-apps://' }, function (e) {
                    })
                  } else if (res.cancel) { }
                }
              })
            } else {
              uni.showToast({
                title: '已是最新版本',
                duration: 2000
              });
            }
          }
        })

      }
    }
  }
</script>
