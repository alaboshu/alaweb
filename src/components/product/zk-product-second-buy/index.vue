<template>
  <view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" style="height:100vh">
      <view v-if="ready&&showHeader">
        <div id="showHeader" :class="{'show_header':showheaderTop,'show_header_top':!showheaderTop}">
          <ul v-show="showheaderTop">
            <li @tap="goTop(imgAge.showProduct)" :class="{'active':productShowHead===imgAge.showProduct}">商品</li>
            <li @tap="goTop(imgAge.showRecommended)" :class="{'active':productShowHead===imgAge.showRecommended}">详情</li>
            <li @tap="goTop(imgAge.showIntro)" :class="{'active':productShowHead===imgAge.showIntro}">购买</li>
          </ul>
        </div>
      </view>
      <show-thumbnail id="shangpin" :productView="viewModel" v-if="ready"></show-thumbnail>
      <show-title ref="showTitle" :timeLimit="timeLimit" :productView="viewModel" v-if="ready" :isActivity="isActivity" @showSaleModel="showSaleModel"></show-title>
      <show-parameter ref="show_parameter" :timeLimit="timeLimit" :productView="viewModel" v-if="ready" :isActivity="isActivity"></show-parameter>
      <show-intro :productView="viewModel" v-if="ready"></show-intro>
      <show-bar @changeSaleState="showSaleModel" :productView="viewModel" v-if="ready" :isActivity="isActivity"></show-bar>
      <show-sceondBuy :timeLimit="timeLimit" :productView="viewModel" v-if="ready"></show-sceondBuy>
    </scroll-view>
  </view>
</template>

<script>
  import ShowHeader from './show_header'
  import ShowThumbnail from './show_thumbnail'
  import ShowTitle from './show_title'
  import ShowParameter from './show_parameter'
  import ShowIntro from './show_intro'
  import ShowRecommend from './show_recommend'
  import ShowBar from './show_bar'
  import ShowSceondBuy from './show_sceondBuy'
  import { PRODUCT_SHOW_GET } from '@/service/all/apiUrl'
 
  import { setTimeout } from 'timers'
  export default {
    
    data () {
      return {
        showheaderTop: false,
        ready: false,
        widgetModel: '',
        viewModel: '',
        productShowHead: 0,
        scrollTop: 0,
        showHeader: false,
        old: {
          scrollTop: 0
        },
        imgAge: {
          showProduct: 0,
          showRecommended: '',
          showIntro: ''
        },
        isActivity: false,
        activityData: {
          type: false,
          data: ''
        },
        timeLimit: {
          isTimeLimit: false,
          data: ''
        },
        wechatType: false
      }
    },
    components: {
      ShowHeader,
      ShowThumbnail,
      ShowTitle,
      ShowParameter,
      ShowIntro,
      ShowRecommend,
      ShowBar,
      ShowSceondBuy
    },
    props: {
      widget: {},
      option: {}
    },
    onPageScroll (e) {

    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.$api.client() === 'WeChatLite') {
          this.showHeader = false
        } else {
          this.showHeader = true
        }
        if (this.$api.client() === 'WeChat') {
          this.wechatType = true
        }
        let par = {
          id: this.$route.query.id,
          userId: 1
        }
        var productShowReponse = await this.$api.httpGet(PRODUCT_SHOW_GET, par)
        if (productShowReponse.status !== 1) {
          var that = this
          uni.showModal({
            title: '提示',
            content: productShowReponse.message,
            showCancel: false,
            complete: res => {
              that.$api.back()
            }
          })
          return false
        } else {
          this.viewModel = productShowReponse.result
          if (this.viewModel.productActivityExtension.activitys.length !== 0) {
            this.activityData.type = true
            this.activityData.data = this.viewModel.productActivityExtension
            this.isActivity = true
            this.viewModel.productActivityExtension.activitys.forEach(act => {
              act.value = JSON.parse(act.value)
              if (act.key === 'ZKCloud.App.Shop.Activitys.Modules.TimeLimitBuy.Model.TimeLimitBuyActivity') {
                this.timeLimit.isTimeLimit = true
                act.value.EndTime = new Date(act.value.EndTime).getTime()
                act.value.StartTime = new Date(act.value.StartTime).getTime()
                this.timeLimit.data = act.value
              }
            })
          }
          if (this.$user.loginUser() !== null) {
            let listParament = {
              LoginUserId: this.$user.loginUser().id,
              EntityId: this.viewModel.id,
              Type: 1
            }
            var FootprintList = await this.$api.httpGet('/Api/Footprint/List', listParament)
            for (var i = 0; i < FootprintList.result.length; i++) {
              FootprintList.result[i].entityId = this.viewModel.id
              if (FootprintList.result[i].entityId !== this.viewModel.id) {
              }
            }
          }
          if (this.$api.client() !== 'WeChatLite') {
            var that = this
            setTimeout(() => {
              uni.createSelectorQuery().select('#showRecommended').boundingClientRect(res => {
                that.imgAge.showRecommended = res.bottom
              }).exec()
              uni.createSelectorQuery().select('#showIntro').boundingClientRect(res => {
                that.imgAge.showIntro = res.bottom
              }).exec()
            }, 500)
          }
          this.ready = true
        }
      },
      clickShowHeader () {
        this.$api.back()
      },
      clickWeChat () {
        this.$api.back()
      },
      showSaleModel () {
        // this.$refs.show_parameter.$emit('childMethod', true)
        this.goTop(this.imgAge.showIntro)
      },
      scroll: function (e) {
        this.old.scrollTop = e.detail.scrollTop
        if (e.detail.scrollTop > 20) {
          this.showheaderTop = true
        } else {
          this.showheaderTop = false
        }
        if (e.detail.scrollTop > this.imgAge.showProduct && this.imgAge.showRecommended > e.detail.scrollTop + 75) {
          this.productShowHead = this.imgAge.showProduct
        }
        if (e.detail.scrollTop + 75 > this.imgAge.showRecommended && this.imgAge.showIntro > e.detail.scrollTop + 75) {
          this.productShowHead = this.imgAge.showRecommended
        }
        if (this.imgAge.showIntro < e.detail.scrollTop + 80) {
          this.productShowHead = this.imgAge.showIntro
        }
      },
      goTop: function (e) {
        this.productShowHead = e
        // 解决view层不同步的问题
        this.scrollTop = this.old.scrollTop
        this.$nextTick(function () {
          this.scrollTop = e - 35 - 40
        })
      }
    }
  }
</script>
<style lang="scss">
  .scroll-Y {
    height: 100vh;
  }
  @import "@/assets/style/variable.scss";
  @import "@/assets/style/theme.scss";
  .show_header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    box-shadow: 0 0 5px 5px #e5e5e5;
    .show_header-return {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translate(0, -50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    ul {
      display: flex;
      align-items: center;
      height: 30px;
      li {
        padding: 3px 5px;
        margin: 0 5px;
        color: #000;
        border-bottom: 0px;
        // transition: all 0.2s linear;
      }
      .active {
        color: #c91230;

        font-weight: bold;
        border-bottom: 2px solid #c91230;
      }
    }
  }
  .show_header_top {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    .show_header-return {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translate(0, -50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.2);
      padding-right: 2px;
      padding-top: 1px;
    }
  }
  .show_header-placeholder {
    height: 40px;
  }
  .header_opicaty {
    opacity: 0;
  }
  .wechat_bottom {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    position: fixed;
    top: 5px;
    left: 15px;
    z-index: 9999;
    padding-right: 2px;
    padding-top: 1px;
  }
</style>
