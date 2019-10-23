<template>
  <view v-if="async" class="zk-index-swiper">
    <view v-if="!isNotIosApp" class="ios-head-placeholder" :style="'height:'+statusBarHeight+'px;background:'+colorList.headBg"></view>
    <view v-if="!isNotIosApp" :style="'height:'+statusBarHeight+'px;transition: all 0.2s linear;background:'+colorList.headBg"></view>
    <view class="new-index-index-box">
      <view class="new-index-head-top-bg" :style="'background:'+colorList.headBg">
      </view>
      <view class="new-index-search-placeholder"></view>
      <view class="new-index-search-box" :style="'background:'+colorList.headBg+';top:'+appTopHeight.search+'px;'">
        <view class="index-search" :style="'background:'+colorList.headSearchBgColor" @click="showTag()">
          <i class="icon iconfont icon-zk-search"></i>
          <input class="head_search-input" ref="inputNew" type="text" confirm-type="搜索" :focus="boxshow" v-model="searchModel" @confirm="searchConfirm" placeholder="热搜索推荐">
        </view>
        <view class="index-icon">
          <i class="icon iconfont icon-zk-scan" @click="barCode" v-if="iosAppsFool"></i>
          <i class="icon iconfont icon-zk-cart" @click="$api.to('/pages/index?path=order_cart')"></i>
          <i class="icon iconfont icon-zk-erweima" @click="$api.to('/pages/index?path=user_qrcode')"></i>
        </view>
      </view>
      <div class="new-index-swiper-box">
        <swiper :autoplay="true" :circular="true" :current="current" :indicator-dots="true" :indicator-active-color="colorList.headBg" indicator-color="#ebedf0" style="height:317upx" @change="swiperChange">
          <swiper-item v-for="(item,index) in viewItem.value.links" :key="index" @click="goLinks(item.url.value)">
            <img :src="item.image" class="bgImg" />
          </swiper-item>
        </swiper>
      </div>
    </view>
    <transition name="fade">
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
          <li v-for="(item,index) in liksT" :key="index" @click="searchKey(item.name)">{{item.name}}</li>
        </ul>
      </view>
    </transition>
  </view>
</template>
	<script>
  // import pagesInfo from '@/build.json'
  // import theme from '@/service/all/theme.js'
  export default {
    components: {
    },
    data () {
      return {
        async: false,
        RClass: null,
        viewModel: null,
        viewItem: null,
        swiperData: null,
        current: 0,
        oldCurrent: 0,
        boxshow: false,
        searchModel: '',
        liksT: [
          {
            name: '文房四宝'
          },
          {
            name: '茅台'
          },
          {
            name: '净化器'
          }
        ],
        newProductClassList: [
          // {
          //   name: '爆款区',
          //   id: 90004
          // },
          // {
          //   name: '品牌区',
          //   id: 90001
          // },
          // {
          //   name: '优选区',
          //   id: 90002
          // },
          // {
          //   name: '新品',
          //   id: 90003
          // }

        ],
        productClassList: [
          {
            id: 10312,
            path: 'life_commodities'
          },
          {
            id: 10303,
            path: 'home_textiles'
          },
          {
            id: 10313,
            path: 'furniture_appliances'
          },
          {
            id: 10311,
            path: 'selected_luggage'
          },
          {
            id: 10309,
            path: 'skin_care'
          },
          {
            id: 10310,
            path: 'sports_outdoor'
          },
          {
            id: 10306,
            path: 'digital_office'
          },
          {
            id: 10305,
            path: 'mother_child'
          },
          {
            id: 10307,
            path: 'clothing_accessories'
          },
          {
            id: 90001, // 品牌区
            path: 'mall_brand'
          },
          {
            id: 90002, // 优选区
            path: 'mall_optimization'
          },
          {
            id: 90003, // 新品体验
            path: 'gift'
          },
          {
            id: 90004, // 爆款
            path: 'explosion'
          }
        ],
        widgetIndex: null,
        widgetItem: [],
        option: '',
        active: -1,
        isNotIosApp: true,
        statusBarHeight: 0,
        appTopHeight: {
          headItem: 0,
          search: 0
        },
        whiteColor: {
          headBg: '#fff',
          headItemColor: '#000',
          headItemBorderColor: '#e4393c',
          headSearchColor: '#303133',
          headSearchBgColor: '#ebeef5'
        },
        otherColor: {
          headBg: 'pink',
          headItemColor: '#fff',
          headItemBorderColor: '#fff',
          headSearchColor: '#fff',
          headSearchBgColor: 'rgba(255, 255, 255,1)',
          orderColro: 'transparent'
        },
        colorList: {
          headBg: '#ffffff',
          headItemColor: '#000',
          headItemBorderColor: '#e4393c',
          headSearchColor: '#303133',
          headSearchBgColor: '#ebeef5',
          orderColro: '#ffffff'
        },
        iosAppsFool: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$on('init', () => {
          this.init()
        })
      })
      if (this.$api.client() === 'AppPlus') {
        this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        this.appTopHeight.headItem = this.$api.getSystemInfoSync().statusBarHeight
        this.appTopHeight.search += this.$api.getSystemInfoSync().statusBarHeight
        this.isNotIosApp = false
      }
    },
    methods: {
      barCode () {
        uni.scanCode({
          onlyFromCamera: true,
          success: function (res) {
            if (res.errMsg === 'scanCode:ok') {
              /* eslint-disable */
              var _this = this
              plus.runtime.openURL(res.result, function (res) {
                _this.$api.toastWarn('跳转失败')
              })
            }
          }
        })
      },
      swiperChange (e) {
        this.oldCurrent = e.detail.current
        if (this.viewItem.value.links[e.detail.current].colors === '#FFFFFF') {
          this.colorList = this.whiteColor
        } else {
          this.otherColor.headBg = 'linear-gradient(to right,' + this.viewItem.value.links[e.detail.current].colors + ',' + this.viewItem.value.links[e.detail.current].color + ')'
          this.colorList = this.otherColor
        }
      },
      async  heaItemClick (index, path, classId) {
        this.active = index
        var calssPath
        if (path !== '/') {
          if (this.widgetItem[index] !== undefined) {
            this.viewModel = this.widgetItem[index]
            this.viewItem = this.viewModel.widgets[0]
          } else {
            for (var i = 0; i < this.productClassList.length; i++) {
              if (this.productClassList[i].id === classId) {
                calssPath = '/' + this.productClassList[i].path
                break
              }
            }
            this.viewModel = await this.$api.themePage({ path: calssPath })
            this.viewItem = this.viewModel.widgets[0]
            this.widgetItem[index] = this.viewModel
          }
        } else {
          if (this.widgetIndex !== null) {
            this.viewItem = this.widgetIndex.widgets[0]
            this.viewModel = this.widgetIndex
          } else {
            calssPath = '/index'
            this.viewModel = await this.$api.themePage({ path: calssPath })
            this.widgetIndex = this.viewModel
            this.viewItem = this.viewModel.widgets[0]
          }
        }
        console.log(this.viewModel)
        this.$emit('newPath', this.viewModel)
        this.current = this.oldCurrent
        this.$nextTick(function () {
          this.current = 0
        })
        if (this.viewItem.value.links !== undefined) {
          if (this.viewItem.value.links[0].colors === '#FFFFFF') {
            this.colorList = this.whiteColor
          } else {
            this.otherColor.headBg = 'linear-gradient(to right,' + this.viewItem.value.links[0].colors + ',' + this.viewItem.value.links[0].color + ')'
            this.colorList = this.otherColor
          }
        }
      },
      showTag () {
        this.boxshow = !this.boxshow
      },
      closeMak () {
        uni.hideKeyboard()
        this.boxshow = false
      },
      search () {
        this.boxshow = false
        uni.hideKeyboard()
        this.$api.to('/pages/index?path=product_list&Keyword=' + this.searchModel)
      },
      searchKey (name) {
        this.$api.to('/pages/index?path=product_list&Keyword=' + name)
      },
      searchConfirm (e) {
        this.boxshow = !this.boxshow
        this.$api.to('/pages/index?path=product_list&Keyword=' + e.detail.value)
      },
      goLinks (url) {
        this.$api.to(url)
      },
      async init () {
        if (this.$api.client() === 'AppPlus' && this.$api.payType() === 3) {
          this.iosAppsFool = true
        }
        var response = await this.$api.httpGet('/api/product/class')
        this.RClass = response.result
        this.RClass = [...this.newProductClassList, ...this.RClass]
        var _this = this
        this.RClass.forEach(() => {
          _this.widgetItem.push(undefined)
        })
        this.viewModel = await this.$api.themePage({ path: '/' })
        this.widgetIndex = this.viewModel
        // this.viewItem = this.viewModel.widgets[0]
        this.viewItem = this.widget
        if (this.viewItem.value.links[0].colors === '#FFFFFF') {
          this.colorList = this.whiteColor
        } else {
          this.otherColor.headBg = 'linear-gradient(to right,' + this.viewItem.value.links[0].colors + ',' + this.viewItem.value.links[0].color + ');'
          this.colorList = this.otherColor
        }
        this.async = true
      }
    }
  }
	</script>
<style lang="scss">
  .new-index-head-bo::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
  .ios-head-placeholder {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background: #ffffff;
    transition: all 0.07s linear;
  }
  .new-index-index-box {
    position: relative;
    // margin-bottom: 10upx;
    width: 100;
    .new-index-head-top-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 375upx;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      transition: all 0.07s linear;
    }
  }
  .new-index-head-placeholder {
    height: 50px;
  }
  .new-index-head-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    height: 50px;
  }
  .new-index-head {
    width: 100%;
    overflow: auto hidden;
    white-space: nowrap;
    height: 50px;
    // transition: all 0.07s linear;
    &::-webkit-scrollbar {
      display: none;
    }
    .head-item {
      display: inline-block;
      // margin: 0 10px;
      // padding: 0 10px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      .head-item-txt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 14px;
        height: 48px;
        line-height: 48px;
        transition: all 0.2s ease;
        // color: #ffffff;
      }
      .head-item-border {
        position: absolute;
        bottom: 4px;
        left: 50%;
        width: 1px;
        height: 3px;
        transform: translateX(-50%);
        opacity: 0;
        border-radius: 40px;
        transition: all 0.17s ease;
      }
    }
    .head-item-active {
      .head-item-txt {
        font-size: 18px;
        font-weight: bold;
        // font-weight: bold;
      }
      .head-item-border {
        // display: block;
        opacity: 1;
        width: 20px;
      }
    }
  }
  .new-index-search-placeholder {
    height: 45px;
  }
  .new-index-search-box {
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 45px;
    // padding: 0 28upx;
    display: flex;
    // margin-bottom: 5px;
    align-items: center;
    transition: all 0.07s linear;
    border-bottom: 1px solid transparent;
    .index-search {
      margin-left: 28upx;
      flex: 1;
      border-radius: 20px;
      height: 25px;
      padding: 0 15px;
      transition: all 0.07s linear;
      display: flex;
      align-items: center;
      color: #303133;
      .head_search-input {
        width: 300upx;
        height: 35upx;
        line-height: 35upx;
        font-size: 26upx;
      }
    }
    .index-icon {
      margin-right: 10px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #ffffff;
      i {
        font-size: 18px;
        margin-left: 12px;
      }
    }
  }
  .new-index-swiper-box {
    position: relative;
    padding: 0 20upx;
    border-radius: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  swiper {
    height: 180px;
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
      height: 56upx;
      font-size: 12px;
      width: 300upx;
      line-height: 60upx;
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
</style>
