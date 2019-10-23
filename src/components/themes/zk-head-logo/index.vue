<template>
  <view class="zk-head-logo-a">
    <view class="zk-head-logo-placeholder"></view>
    <view class="zk-head-logo" :style="'top:'+headLogoHeight+'px;width:'+headLogoWidth+'px'">
      <view class="head_logo">
        <img :src="widget.value.image" alt="文房四宝">
      </view>
      <view class="head_search" @click="showTag()">
        <i class="icon iconfont icon-zk-search"></i>
        <input class="head_search-input" type="text" disabled confirm-type="搜索" @blur="showTag()" @confirm="searchConfirm" placeholder="热搜索推荐">
      </view>
      <view class="head_icon" v-if="widgetModel.value">
        <!-- <i class="icon iconfont " :class="widget.value.icon.name"></i> -->
        <div @click="$api.to('/pages/index?path=order_cart')">
          <x-icon :name="widgetModel.value.icon.name" :size="widgetModel.value.icon.size" :color="widgetModel.value.iconColor"></x-icon>
        </div>
        <div @click="shareClick()" v-if="isApp">
          <x-icon name="icon-zk-share" :size="widgetModel.value.icon.size" :color="widgetModel.value.iconColor"></x-icon>
        </div>
        <!-- <x-icon class="icon_item" :name="widgetModel.value.icons.name" :size="widgetModel.value.icons.size" :color="widgetModel.value.iconsColor" @click.native="toShopsList()"></x-icon> -->
        <!-- <i class="icon iconfont icon-zk-add"></i> -->
      </view>
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
          <li v-for="(item,index) in widget.value.links" :key="index" @click="searchKey(item.name)">{{item.name}}</li>
        </ul>
      </view>
    </transition>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'
  // const wushare = uni.requireNativePlugin('WUApp-Share')
  export default {
    
    data () {
      return {
        searchModel: '',
        widgetModel: {},
        boxshow: false,
        statusBarHeight: 0,
        isApp: true,
        headLogoHeight: 0,
        headLogoWidth: 0
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      toCart () {
        this.$api.to('/pages/index?path=order_cart')
      },
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        this.headLogoWidth = this.$api.getSystemInfoSync().windowWidth
        if (this.$api.client() === 'AppPlus') {
          this.isApp = true
          this.headLogoWidth = this.$api.getSystemInfoSync().windowWidth - 20
          this.headLogoHeight += this.$api.getSystemInfoSync().statusBarHeight
          this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        } else {
          this.isApp = false
        }
      },
      shareClick () {
        this.$api.share('文房四宝', 'http://s-open.qiniuniu99.com/wwwroot/uploads/image/20190524/logo.jpg', '实体商家业绩倍增服务平台', 'http://m.qiniuniu99.com/')
      },
      showTag () {
        this.boxshow = !this.boxshow
      },
      closeMak () {
        this.boxshow = false
      },
      searchKey (name) {
        this.$api.to('/pages/index?path=product_list&Keyword=' + name)
      },
      searchConfirm (e) {
        this.$api.to('/pages/index?path=product_list&Keyword=' + e.detail.value)
      },
      search () {
        this.$api.to('/pages/index?path=product_list&Keyword=' + this.searchModel)
      },
      toShopsList () {
        this.$api.to('/pages/index?path=product_list')
      }
    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>
