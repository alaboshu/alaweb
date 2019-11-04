\<template>
  <!-- <view class="zk-user-base">{{widgetModel}}</view> -->
  <view class="mobile-x-user-base" element-path="mobile/x-user-base">
    <view class="index-top_bg">
      <view class="index-info_top">
        <view class="top-operation">
          <view class="set" @click="goSetLinks()">
            <x-icon name="zk-renzheng" class="setIng" color="#ffffff" :size="18"></x-icon>
          </view>
          <view @click="goSecurity()" class="security">
            <x-icon name="icon-zk-setting" color="#ffffff" :size="18"></x-icon>
          </view>
        </view>
        <a class="index-info_bottom" path="/user/info" v-if="viewModel">
          <view class="portrait">
            <img class="portrait_img" :src="viewModel.avator">
          </view>
          <view class="portrait-info" v-if="async">
            <p class="portrait_p">{{viewModel.userName}}</p>
            <p class="portrait_p">{{viewModel.versionName}}</p>
          </view>
        </a>
      </view>
      <view class="user_content">
        <view class="user_content_item" v-show="showId(item.moneyTypeId)" v-for="(item,index) in widgetModel.accountList" :key="index">
          <view>
            <span>{{item.moneyName}}</span>
            <span v-if="item.amount">{{item.amount}}</span>
            <!-- <span v-if="viewModel.storeRevenue">{{item.amount}}</span> -->
            <span v-else> 0</span>
          </view>
        </view>
      </view>
    </view>
    <view class="emptybox"></view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        widgetModel: '',
        viewModel: '',
        async: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$bus.$off('strikeView').$on('strikeView', () => {
        this.init()
      })
    },
    methods: {
      async  init () {
        var para = {
          userId: this.$user.id()
        }
        var response = await this.$crud.widget(this, 'MemberWidget', para)
        this.viewModel = response
        var widgetModel = await this.$api.httpGet('Api/Account/DetailEdit', { id: this.$user.id() })
        this.widgetModel = widgetModel.result
        this.async = true
      },
      goSetLinks () {
        this.$api.to('/pages/index?path=user_password_index')
      },
      goSecurity () {
        this.$api.to('/pages/user/user_info')
      },
      showId (id) {
        if (id === 'e97ccd1e-1478-49bd-bfc7-e73a5d699756' ||
          id === 'e97ccd1e-1478-49bd-bfc7-e73a5d699000' ||
          id === 'e97ccd1e-1478-49bd-bfc7-e73a5d699002' ||
          id === 'e97ccd1e-1478-49bd-bfc7-e73a5d699009') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .mobile-x-user-base {
    .zk-user-base {
      font-size: $gl-size-base;
    }
    .iconfont {
      position: static !important;
      margin-left: 8px;
    }
    .index-top_bg {
      width: 100%;
      min-height: 150px;
      background: $gl-brand;
      z-index: 95;
    }
    .index-info_top {
      z-index: 99;
      height: 80px;
      padding: 15px;
    }
    .user_content {
      display: flex;
      color: #fff;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0px 8px;
      margin-top: 20px;
      margin-bottom: 10px;

      .user_content_item {
        flex: 1;
        // width: 33%;
        span {
          display: block;
          text-align: center;
          font-size: 11px;
          opacity: 0.8;
        }
      }
    }
    .top-operation {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-left: 5px;
      a {
        display: block;
        margin-left: 10px;
        text-decoration: none;
      }
      .setIng {
        margin: 0 7px;
      }
    }
    .index-info_bottom {
      position: absolute;
      top: 40px;
      left: 5px;
      display: flex;
      align-items: center;
      z-index: 999;
    }
    .portrait {
      width: 45px;
      height: 45px;
      margin: 0 10px;
    }
    .portrait_img {
      width: 100%;
      height: 100%;
      border-radius: 33px;
    }
    .portrait-info {
      color: $gl-light;
    }
    .portrait_p {
      margin: 0px;
      font-size: 13px;
    }
    .portrait-info_p {
      margin: 0;
    }
    // .top-operation_i {
    //   // font-size: 20px;
    // }
    // .set {
    //   // margin-right: 20px;
    // }
  }
</style>
