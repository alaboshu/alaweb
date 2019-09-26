<template>
  <view class="zk-search-a">
    <view class="zk-head-logo">
      <view class="search_icon_left">
        <i class="icon iconfont icon-zk-cart" v-show="!shows" @click="getCart" style="margin-right:5px;"></i>
        <i class="icon iconfont zk-arrows-left_black" v-show="shows" @click="$api.back()" v-if="isNotApp"></i>
      </view>
      <view class="head_search">
        <i class="icon iconfont icon-zk-search"></i>
        <input class="head_search-input" type="text" confirm-type="搜索" v-model="searchMdel" @confirm="searchConfirm" placeholder="热搜索推荐">
      </view>
      <view class="head_title " @click="search()">搜索</view>
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      return {
        searchMdel: '',
        widgetModel: {},
        isNotApp: true
      }
    },
    props: {
      widget: {},
      shows: {},
      inputModel: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      testClick () {
        this.$emit('searchClick')
      },
      toCart () {
        this.$api.to('/pages/index?path=order_cart')
      },
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (!this.$api.isEmpty(this.inputModel)) {
          this.searchMdel = this.inputModel
        }
        if (this.$api.client() === 'AppPlus') {
          this.isNotApp = false
        }
      },
      searchConfirm (e) {
        this.$api.to('/pages/index?path=product_list&Keyword=' + e.detail.value)
      },
      searchReturn () {

      },
      search () {
        this.$api.to('/pages/index?path=product_list&Keyword=' + this.searchMdel)
      },
      getCart () {
        this.$api.to('/pages/index?path=order_cart')
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-search-a {
    position: relative;
    font-family: "微软雅黑";
    .head_search {
      background: #f7f7f7;
      height: 35px;
      line-height: 35px;
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 10px;
      border-radius: 23px;
      margin-right: 10px;
      .head_search-input {
        height: 28px;
        font-size: 12px;
        width: 80%;
        line-height: 28px;
        margin-top: 5upx;
        input {
          font-size: 12px;
        }

        .input-placeholder {
          font-size: 12px;
        }
      }

      .icon-zk-search {
        margin-right: 5px;
        color: #999999;
        font-size: 18px;
      }
    }
    .head_title {
      color: #666;
    }

    .zk-head-logo {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      margin: 0 auto;
      .search_icon_left {
        width: 10%;
        text-align: center;
        .iconfont {
          font-size: 20px;
          color: #666;
        }
      }
      .search_icon_right {
        width: 10%;
        .icon_right-i {
          font-size: 20px;
          color: #666;
        }
      }
      .head_logo {
        width: 40px;
        height: 40px;
        // margin-right: 40px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .head_icon {
        display: flex;

        .icon_item {
          padding: 5px;
        }
      }
    }

    .search_mask {
      background-color: #fff;
      overflow: hidden;
      position: fixed;
      top: 0px;
      height: 100%;
      z-index: 9999;
      width: 100%;

      .search-title {
        padding-left: 10px;
        color: #303133;
        font-size: 13px;
      }

      .hot-search-list {
        padding: 10px 15px;

        li {
          font-size: 12px;
          background: #f7f7f7;
          color: #909399;
          border-radius: 50px;
          margin-right: 10px;
          text-align: center;
          padding: 2px 12px;
        }
      }

      .mask_back_icon {
        font-size: 20px;
        margin-top: -2px;
        width: 10%;
        margin-left: 14px;

        .iconfont {
          font-size: 20px;
          color: #666;
        }
      }

      .cancleMask {
        font-size: 14px;
        color: #666;
        margin-top: 5px;
        margin-left: -5px;
      }
    }
  }
</style>
