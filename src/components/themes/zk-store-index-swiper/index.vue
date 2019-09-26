<template>
  <view class="zk-store-index-swiper">
    <view class="zk-school-swipers">
      <view class="zk-school_swiper_container">
        <view class="school_swiper_header_all">
          <view class="school_swiper_header">
          </view>
        </view>
        <view class="new-index-search-box">
          <view class="new-index-search-box_all">
            <view class="index-icon">
              <view class="index-icon_logo">
                <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-18/5d2fe7e9a085fc05a493dd1f.png">
              </view>
              <view class="index-icon_right">
                <view class="right_icon" @click="goCart()">
                  <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-11/5d26eaadff7be2298c4210d1.png" alt="">
                </view>
                <view class="right_icon">
                  <a href="https://e-145450.chatnow.meiqia.com/dist/standalone.html">
                    <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-16/5d2d3009f338e527986ad934.png" alt="">
                  </a>
                </view>
              </view>
            </view>
            <view class="index-search" :style="'background:'+colorList.headBg">
              <i class="icon iconfont icon-zk-search" style="margin:0 10px;"></i>
              <input class="head_search-input" placeholder="热门搜索" ref="inputNew" type="text" confirm-type="搜索" v-model="searchModel" @confirm="searchConfirm">
            </view>
          </view>
        </view>
        <view class="shop-list_content" v-if="widget">
          <swiper :autoplay="false" :circular="true" :indicator-dots="true" indicator-color="rgb(102,102,102,.5)" indicator-active-color="rgb(255,255,255,.9)" @change="goIndex">
            <swiper-item v-for="(item,index) in widget.value.links" :key="index" class="list_content-swiper">
              <view class="bgImg" :class="index===currentIndex?'ImgActive':'dispalyImg'" @click="$api.to(item.url.value)">
                <img :src="item.image" class="bgImg-images images_avtice" />
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
      <view></view>
    </view>
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
        searchModel: '',
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
        ]
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
      },
      goCart () {
        this.$api.to('/pages/index?path=order_cart')
      },
      searchConfirm (e) {
        this.boxshow = !this.boxshow
        this.$api.to('/pages/index?path=product_list&Keyword=' + e.detail.value)
      }
    }
  }
</script>
<style lang="scss">
  .zk-school-swipers {
    .new-index-search-box {
      flex: 1;
      width: 100%;
      align-items: center;
      transition: all 0.07s linear;
      position: fixed;
      top: 35upx;
      top: 0;
      // padding: 26upx 26upx 17upx 26upx;
      padding-top: 40upx;
      padding-bottom: 17upx;
      z-index: 9999;
      background: #ff8329;
      .new-index-search-box_all {
        width: 92%;
        background: #ff8329;
        margin: 0 auto;
      }
      .head_search-input {
        width: 100%;
        font-size: 13px;
        line-height: 17px;
        color: #666;
        input {
          font-size: 12px;
        }
      }
      .index-search {
        width: 98%;
        margin: 0 auto;
        flex: 1;
        border-radius: 20px;
        height: 25px;
        transition: all 0.07s linear;
        display: flex;
        align-items: center;
        color: #303133;
        margin-top: 20upx;
        .head_search-input::-webkit-input-placeholder {
          font-size: 12px;
        }
      }
      .index-icon {
        width: 98%;
        margin: 0 auto;
        margin-right: 18upx;
        height: 23px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        margin-top: 35upx;
        .x-icon {
          font-size: 18px;
          margin-left: 12px;
          &:nth-of-type(2) {
            margin-top: 10upx;
          }
        }
        .index-icon_right {
          display: flex;
          .right_icon {
            width: 44upx;
            height: 44upx;
            margin-top: 8upx;
            &:nth-of-type(2) {
              margin-left: 14upx;
            }
          }
          img {
            width: 48upx;
            height: 48upx;
          }
        }
        .index-icon_logo {
          width: 150upx;
          height: 40upx;
          img {
            width: 100%;
            height: 48upx;
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
      .uni-input-input {
        width: 80%;
      }

      .icon-zk-search {
        margin-right: 5px;
        color: #999999;
        font-size: 18px;
      }
    }
  }
</style>
