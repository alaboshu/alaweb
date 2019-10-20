
<template>
  <view class="show-bar">
    <div path="/" class="bar-item " style="dispaly:flex;justy-content:space-between">
      <div @click="$api.to('/pages/default')" style="color:#606266;text-decoration:none" v-if="isWeChatLite">
        <view class="item-icon">
          <x-icon :size="18" :color="'#606266'" name="zk-home"></x-icon>
        </view>
        <view class="item-title">
          首页
        </view>
      </div>
      <a href="https://e-145450.chatnow.meiqia.com/dist/standalone.html" style="color:#606266;text-decoration:none;" v-else v-show="showService">
        <view class="item-icon">
          <x-icon :size="18" :color="'#606266'" name="zk-service"></x-icon>
        </view>
        <view class="item-title">
          客服
        </view>
      </a>
    </div>
    <div class="bar-item" @click="customerService()">
      <view class="item-icon">
        <x-icon :size="18" name="icon-zk-dianhua" :color="'#606266'" :xClass="iconActive===true?'themecolor':''"></x-icon>
      </view>
      <view class="item-title " :class="{'themecolor':iconActive}">电话咨询</view>
    </div>
    <div class="bar-item" @click="wechatFool=true">
      <view class="item-icon">
        <x-icon :size="18" name="icon-zk-news" :color="'#606266'"></x-icon>
      </view>
      <view class="item-title">微信咨询</view>
    </div>
    <div path="javascript:" class="bar-button bar-buy" @click="showSaleProperty() ">立即抢购</div>
    <view class="wechat-dialog-box" v-if="wechatFool">
      <view class="wechat-db-close" @click="wechatFool=false">
        <image class="wechat-img" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-20/5d0ae5e03489822388b79c5a.png" alt="" />
      </view>
      <view class="wechat_text-box">
        <view class="wechat-db" bindlongtap='copy'>1234567</view>
        <view class="wechat-wx">(长按复制微信)</view>
        <!-- <view class="wechat-click">点击打开微信</view> -->
      </view>
    </view>
  </view>
</template>
<script>
  import themeId from '../../../service/config.js'
  export default {

    data () {
      return {
        async: false,
        viewModel: '',
        iconColor: 'themeColor',
        iconActive: false,
        isWeChatLite: false,
        showService: true,
        wechatFool: false
      }
    },
    props: {
      productView: {},
      isActivity: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      gradeClick () {
        this.$api.toastWarn('会员等级不够')
      },
      serviceCall () {
        wx.navigateTo({
          url: 'https://e-145450.chatnow.meiqia.com/dist/standalone.html'
        })
      },
      async init () {
        var themes = themeId.themeId
        if (themes === '5cc1bfbe23eb301328298b41') {
          this.showService = false
        } else {
          this.showService = true
        }

        this.viewModel = this.productView
        this.isWeChatLite = this.$api.client() === 'WeChatLite'
        if (this.$api.client() === 'WeChatLite' || this.$api.client() === 'AppPlus') {
          this.isWeChatLite = true
        }
        if (this.$user.loginUser() !== null) {
          let par = {
            userId: this.$user.loginUser().id
          }
          var list = await this.$api.httpGet('Api/Favorite/List', par)
          for (var i = 0; i < list.result.length; i++) {
            if (list.result[i].entityId === String(this.viewModel.id)) {
              this.iconActive = true
            }
          }
          this.async = true
        }
      },
      async favorite () {
        if (this.$user.isLogin()) {
          if (this.iconActive === false) {
            let parament = {
              userId: this.$user.loginUser().id,
              EntityId: this.viewModel.id,
              Type: 1
            }
            var response = await this.$api.httpGet('Api/Favorite/Add', parament)
            if (response.status === 1) {
              this.iconActive = true
              this.$api.toastSuccess('收藏成功')
            } else {
              this.$api.toastWarn(response.message)
            }
          } else {
            let parament = {
              userId: this.$user.loginUser().id,
              EntityId: this.viewModel.id,
              Type: 1
            }
            var deleteFavorite = await this.$api.httpGet('Api/Favorite/Remove', parament)
            if (deleteFavorite.status === 1) {
              this.iconActive = false

              this.$api.toastWarn('取消成功')
            } else {
              this.$api.toastWarn(deleteFavorite.message)
            }
          }
        } else {
          this.$api.toastWarn('请先登录')
        }
      },

      showSaleProperty () {
        this.$emit('changeSaleState')
      },
      goLinks () {
        // this.$api.to('https://e-145450.chatnow.meiqia.com/dist/standalone.html')
      },
      copy (e) {
        wx.setClipboardData({
          data: 'data',
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      },
      customerService () {
        uni.makePhoneCall({
          phoneNumber: '400-680-9088'
        })
      }
    }
  }
</script>


<style lang="scss">
  @import "@/assets/style/variable.scss";

  .themecolor {
    color: $gl-themeColor !important;
  }
  .show-bar_pal {
    height: 50px;
  }
  .show-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #f7f7fa;
    z-index: 100;
    display: flex;
    .showServiceBtn {
      display: none;
    }
    .showServiceBtn {
      display: none;
    }
    .bar-item {
      width: 15%;
      height: 50px;
      border-right: 1px solid #e5e5e5;
      // padding: 3px 0 0;
      padding-top: 5px;
      color: #999999;

      .item-icon {
        text-align: center;
        color: $gl-text2;
        height: 28px;
      }
      .item-title {
        text-align: center;
        color: $gl-text2;
        margin: 0px;
        font-size: 26upx;
        line-height: 12px;
      }
    }
    .bar-button {
      flex: 1;
      height: 50px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
    }
    .bar-cart {
      // background: $gl-brand;
      background: #ff999a;
    }
    .bar-buy {
      // background: $gl-success;
      background: #c91230;
    }
    .bar-disabled {
      background: #555555;
      color: #fff;
    }
    .wechat-dialog-box {
      width: 80vw;
      height: 156px;
      background: #ffffff;
      border: 1px solid #f2f2f2;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      .wechat-db-close {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 3px;
        right: 3px;
        .wechat-img {
          width: 100%;
          height: 100%;
        }
      }
      .wechat_text-box {
        text-align: center;
        width: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        .wechat-db {
          display: inline-block;
          color: #fff;
          padding: 0px 20px 0px;
          background: #cf2a4f;
          font-size: 15px;
        }
        .wechat-wx {
          font-size: 15px;
          color: #999999;
          margin: 8px 0px;
        }
        .wechat-click {
          display: inline-block;
          padding: 3px 20px;
          color: #999;
          border-radius: 5px;
          border: 1px solid #999;
          font-size: 15px;
        }
      }
    }
  }
</style>
