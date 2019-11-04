<template>
  <view class="zk-school-swiper">
    <view class="zk-school_swiper_container">
      <view class="school_swiper_header_all">
        <view class="school_swiper_header">
        </view>
      </view>
      <!-- <view class="new-index-search-box">
        <view class="index-search" :style="'background:'+colorList.headBg">
          <i class="icon iconfont icon-zk-search" style="margin:0 10px;"></i>
          <input class="head_search-input" placeholder="热搜索推荐">
        </view>
        <view class="index-icon">
          <view>
            <x-icon name="icon-zk-cart" size="23" @click.native="$api.to('/pages/order/order_cart')"></x-icon>
          </view>
          <x-icon name="icon-zk-home" size="24" @click.native="$api.to('/pages/index')"></x-icon>
        </view>
      </view>-->
      <view class="shop-list_content">
        <swiper :autoplay="false" :circular="true" :indicator-dots="true" previous-margin="24px" next-margin="10px" indicator-color="rgb(102,102,102,.5)" indicator-active-color="rgb(255,255,255,.9)" @change="goIndex">
          <swiper-item v-for="(item,index) in widget.value.links" :key="index" class="list_content-swiper">
            <view class="bgImg" :class="index===currentIndex?'ImgActive':''">
              <img :src="item.image" class="bgImg-images images_avtice" />
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view></view>
    <!--  <transition name="fade">
      <view class="search_mask" v-show="boxshow">
        <view :style="'height:'+statusBarHeight+'px'"></view>
        <view class="search_mask-box">
          <view class="mask_back_icon" @click="closeMak()">
            <i class="icon iconfont zk-arrows-left_black"></i>
          </view>
          <view class="head_search">
            <i class="icon iconfont icon-zk-search"></i>
            <input class="head_search-input" ref="inputNew" type="text" confirm-type="搜索" :focus="boxshow" v-model="searchModel" @confirm="searchConfirm" placeholder="热搜索推荐">
          </view>
          <view class="search-title cancleMask" style="margin-right:15px;" @click="search()">搜索</view>
        </view>
        <div style="display:flex;	justify-content: space-between;margin-top:15px">
          <div class="search-title">热门搜索</div>
        </div>
        <ul class="hot-search-list">
          <li v-for="(item,index) in liksT" :key="index" @click="search(item.name)">{{item.name}}</li>
        </ul>
      </view>
    </transition> -->
  </view>
</template>

<script>
  import './var.scss'
  import './styles'


  export default {
    data () {
      return {
        widgetModel: {},
        currentIndex: 0,
        statusBarHeight: 0,
        imgList: [
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-10/5cfe04bf57d1ff2024866233.jpg',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf76ee631109e232cc9d0cc.jpg',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf7a21131109e232cca16db.png'
        ],
        colorList: {
          headBg: '#ffffff',
          headItemColor: '#000',
          headItemBorderColor: '#e4393c',
          headSearchColor: '#303133',
          headSearchBgColor: '#ebeef5',
          orderColro: '#ffffff'
        },
        appTopHeight: {
          headItem: 0,
          search: 15
        },
        boxshow: false,
        liksT: [
          {
            name: '牛牛课堂'
          },
          {
            name: '牛牛大学'
          }
        ],
        searchModel: ''
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
        this.appTopHeight.search += this.$api.getSystemInfoSync().statusBarHeigh
        this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
      },
      goIndex (event) {
        this.currentIndex = event.target.current
      },
      showTag () {
        this.boxshow = !this.boxshow
      },
      closeMak () {
        this.boxshow = false
      },
      search (name) {
        var key = this.searchModel
        if (name) {
          key = name
        }
        this.$api.to('/pages/index?path=product_list&Keyword=' + key)
      }
    }
  }
</script>
<style lang="scss">
  .zk-school-swiper {
    .new-index-search-box {
      display: flex;
      flex: 1;
      width: 100%;
      align-items: center;
      transition: all 0.07s linear;
      // padding: 0 20upx;
      background: linear-gradient(90deg, #ff4848, #ff7b64);
      position: fixed;
      top: 16px;
      top: 0;
      padding: 26upx 26upx;
      z-index: 9999;
      .head_search-input {
        padding-left: 15px;
      }
      .index-search {
        // margin-left: 28upx;
        flex: 1;
        border-radius: 20px;
        height: 25px;
        // padding: 0 15px;
        transition: all 0.07s linear;
        display: flex;
        align-items: center;
        color: #303133;
      }
      .index-icon {
        margin-right: 18upx;
        height: 23px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #ffffff;
        .x-icon {
          font-size: 18px;
          margin-left: 12px;
          &:nth-of-type(2) {
            margin-top: 10upx;
          }
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

      .search_mask-box {
        display: flex;
        margin-top: 10px;
      }

      .search-title {
        padding-left: 10px;
        color: #303133;
        font-size: 13px;
      }

      .hot-search-list {
        padding: 10px 15px;

        li {
          display: inline-block;
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
    .head_search {
      background: #f7f7f7;
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 10px;
      border-radius: 23px;
      margin-right: 3px;

      .head_search-input {
        height: 28px;
        font-size: 12px;

        input {
          font-size: 12px;
        }

        .input-placeholder {
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .icon-zk-search {
        margin-right: 5px;
        color: #999999;
        font-size: 18px;
      }
    }
  }
</style>
