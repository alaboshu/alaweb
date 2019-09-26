<template>
  <view class="zk-nav-swiper">
    <view class="uni-tab-bar" :style="'top:'+uniTabBarHeight+'px'">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x="true" scroll-left="0" scrollIndicator="none">
        <div class="swiper-tab-item " v-for="(tab,tabIndex) in tabBars" :key="tabIndex" :class="{'tabItem-active':tab.id===tabIndexs}" @click="tabClick(tab.id,tab)">
          <span>{{tab.name}}</span>
        </div>
      </scroll-view>
    </view>
    <view class="uni-tab-bar-placeholder"></view>
  </view>
</template>

<script>

  import { PRODUCT_LIST_GET } from '@/service/all/apiUrl.js'
  export default {

    data () {
      return {
        widgetModel: '',
        productItem: '',
        loading: false,
        tabIndexs: 'jtmlelc2ms1p6gwwp',
        scrollLeft: 0,
        isClickChange: false,
        numLength: 0,
        listPar: {
          SortOrder: '', // 商品排序方式
          Keyword: '', // 搜索关键字
          MinPrice: '', // 最低价格
          MaxPrice: '', // 最高价格
          ClassIds: '', // 商品分类Id
          TagIds: '', // 商品标签ID
          ProductIds: '', // 商品Id
          BrandId: '', // 商品品牌Id
          PriceStyleId: '', //  商品模式
          OrderType: '', // 排序方式
          pageIndex: 1,
          pageSize: 10
        },
        type: '',
        tabBars: [],
        uniTabBarHeight: 56
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel !== undefined) {
          this.tabBars = this.widgetModel.value.links
        }
        if (this.$api.client() === 'AppPlus') {
          this.uniTabBarHeight += this.$api.getSystemInfoSync().statusBarHeight
        }
      },
      async tabClick (id, conter) {
        this.tabIndexs = id
        if (id === 99) {
          id = ''
        }
        this.$api.to(conter.url.value)
        this.listPar.SortOrder = id
        var produtList = await this.$api.httpGet(PRODUCT_LIST_GET, this.listPar)
        this.productItem = produtList.result
      }
    },
    onReachBottom: function () {
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-nav-swiper {
    font-size: $gl-size-base;
    .uni-swiper-tab {
      height: 35px;
      line-height: 30px;
      border-bottom: none;
    }
    .uni-tab-bar {
      position: fixed;
      top: 56px;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 35px;
      background: #fff;
    }
    .uni-tab-bar-placeholder {
      height: 35px;
    }
  }
  .swiper-tab-item {
    display: inline-block;
    width: 20%;
    text-align: center;
  }
  .tabItem-active {
    span {
      padding: 5px 0;
      color: $gl-themeColor;
      border-bottom: 2px solid $gl-themeColor;
    }
  }
  .productList-loading {
    padding: 10px 0;
    color: #666;
    text-align: center;
  }
  .uni-scroll-view {
    margin-left: 12px;
  }

  .uni-scroll-view::-webkit-scrollbar {
    display: none;
  }
</style>
