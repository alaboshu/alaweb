
<template>
  <view class="show-bar" v-if="async">
    <div style="color:#606266;text-decoration:none;" class="bar-item" v-if="customerLink" @click="customer ">
      <view class="item-icon">
        <x-icon :size="18" :color="'#606266'" name="icon-zk-service"></x-icon>
      </view>
      <view class="item-title">
        客服
      </view>
    </div>
    <div @click="$api.to('/pages/default')" class="bar-item" style="color:#606266;text-decoration:none" v-if="operation">
      <view class="item-icon">
        <x-icon :size="18" :color="'#606266'" name="icon-zk-home"></x-icon>
      </view>
      <view class="item-title">
        首页
      </view>
    </div>
    <div style="color:#606266;text-decoration:none;" class="bar-item" v-if="isApp" @click="shareApp ">
      <view class="item-icon">
        <x-icon :size="18" :color="'#606266'" name="icon-zk-share"></x-icon>
      </view>
      <view class="item-title">
        分享
      </view>
    </div>
    <div class="bar-item" @click="favorite()">
      <view class="item-icon">
        <x-icon :size="18" name="icon-zk-favorite" :color="'#606266'" :xClass="iconActive===true?'themecolor':''"></x-icon>
      </view>
      <view class="item-title " :class="{'themecolor':iconActive}">收藏</view>
    </div>
    <div class="bar-item" @click="$api.to('/pages/index?path=order_cart')" v-if="isShowCart">
      <view class="item-icon">
        <x-icon :size="18" name="icon-zk-carts" :color="'#606266'"></x-icon>
      </view>
      <view class="item-title">购物车</view>
    </div>
    <!-- <div path="javascript:" class="bar-button bar-disabled" v-if="isActivity&&!productView.productActivityExtension.userPermissions.isMemberLeverBuy" @click="gradeClick()">加入购物车</div> -->
    <div path="javascript:" class="bar-button bar-disabled" v-if="!viewModel.isFrontShowPrice" @click="gradeClick()" v-show="isShowCart">加入购物车</div>
    <div path="javascript:" class="bar-button bar-cart" @click="showSaleProperty()" v-else v-show="isShowCart">加入购物车</div>

    <!-- <div path="javascript:" class="bar-button bar-disabled" v-if="isActivity&&!productView.productActivityExtension.userPermissions.isMemberLeverBuy" style="border-left:1px solid #e5e5e5" @click="gradeClick()">立即购买</div> -->
    <div path="javascript:" class="bar-button bar-disabled" v-if="!viewModel.isFrontShowPrice" style="border-left:1px solid #e5e5e5" @click="gradeClick()">立即购买</div>
    <div path="javascript:" class="bar-button bar-buy" @click="showSaleProperty() " v-else>立即购买</div>
  </view>
</template>
<script>
  // import themeId from '../../../service/config.js'
  export default {

    data () {
      return {
        async: false,
        viewModel: '',
        iconColor: 'themeColor',
        iconActive: false,
        // isWeChatLite: false,
        // isIosApp: false,
        // isAndroidApp: false,
        // isH5: false,
        isApp: false,
        isShowCart: true,
        customerLink: false,
        operation: false
      }
    },
    props: {
      productView: {},
      isActivity: {},
      widget: {}
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
        this.viewModel = this.productView
        this.async = true
        if (this.$user.loginUser() !== null) {
          let par = {
            LoginUserId: this.$user.loginUser().id
          }
          var list = await this.$api.httpGet('Api/Favorite/List', par)
          for (var i = 0; i < list.result.length; i++) {
            if (list.result[i].entityId === String(this.viewModel.id)) {
              this.iconActive = true
            }
          }
          this.async = true
          if (this.widget.value !== null) {
            if (this.widget.value.isShowCart !== undefined) {
              this.isShowCart = this.widget.value.isShowCart
            }
            if (this.widget.value.customerLink !== undefined && this.widget.value.customerLink !== '') {
              this.customerLink = true
            } else {
              this.operation = true
            }
          }
          if (this.$api.client() === 'AppPlus') {
            this.isApp = false
            this.customerLink = true
            this.operation = false
          }
        }
        // 刷新销量
        setTimeout(async () => {
          var para = {
            productId: this.productView.id
          }
          var res = await this.$api.httpGet('/Api/Product/UpdateSoldCount', para)
          this.soldCount = res.result
        }, 800)
      },
      // 检查是否收藏
      async checkFavorite () {
        if (this.$user.loginUser() !== null) {
          let par = {
            LoginUserId: this.$user.loginUser().id,
            entityId: this.viewModel.id,
            type: 1
          }
          var response = await this.$api.httpGet('Api/Favorite/Check', par)
          if (response !== undefined) {
            if (response.status === 1) {
              this.iconActive = true
            }
          }
        }
      },
      shareApp () {
        var url = 'http://m.qiniuniu99.com/pages/index?path=product_show&id=' + this.widget.route.id
        this.$api.share(this.viewModel.name, this.viewModel.smallUrl, this.viewModel.name, url)
      },
      customer () {
        // if (this.$api.client() === 'AppPlus') {
        //   /* eslint-disable */
        //   // var _this = this
        //   // plus.runtime.openURL('https://chat.meiqiapaas.com/dist/standalone.html?eid=145450', function (res) {
        //   //   _this.$api.toastWarn('跳转失败')
        //   // })
        //   var w = plus.webview.create('https://chat.meiqiapaas.com/dist/standalone.html?eid=145450', 'share', { top: "100px", height: '80%' });
        //   w.show(); // 显示窗口
        // } else {

        // }
        uni.navigateTo({
          url: '/pages/vicePage/customerService'
        })
      },
      async favorite () {
        if (this.$user.isLogin()) {
          if (this.iconActive === false) {
            let parament = {
              LoginUserId: this.$user.loginUser().id,
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
              LoginUserId: this.$user.loginUser().id,
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
        // if (this.widget.value !== null) {
        //   if (this.widget.value.orderPrompt !== undefined || this.widget.value.orderPrompt !== '') {
        //     uni.showModal({
        //       content: this.widget.value.orderPrompt,
        //       success: (res) => {
        //         if (res.confirm === true) {
        //           this.$emit('changeSaleState')
        //         }
        //       }
        //     })
        //   } else {
        //     this.$emit('changeSaleState')
        //   }
        // } else {
        //   this.$emit('changeSaleState')
        // }
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
        font-size: 12px;
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
  }
</style>
