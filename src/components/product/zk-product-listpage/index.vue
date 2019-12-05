<template>
  <view class="zk-product-listpage">
    <div class="search-placeholder"></div>
    <div class="search-box" :style="'top:'+fixed.searchBoxHeight+'px'">
      <zk-search :widget="widgetModel" :shows="true" @searchClick="listPage" :inputModel="listPar.Keyword "></zk-search>
    </div>
    <view class="uni-tab-bar">
      <!-- <div class="uni-swiper-tab-placeholder"></div> -->
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" :style="'top:'+fixed.uniSwiperTabHiehgt+'px'">
        <div class="swiper-tab-item " v-for="(tab,tabIndex) in tabBars" :key="tabIndex" :class="{'tabItem-active':tab.id===tabIndexs}" @click="tabClick(tab.id)">
          <span>{{tab.name}}</span>
        </div>
      </scroll-view>
      <zk-product-list :widget="{value: {productType: 3}}"></zk-product-list>
      <!-- <zk-product-item ref="zkProductItem" :type="type" :isNot="false" v-if="!isNotData" :showPrice="productItem.isFrontShowPrice"></zk-product-item> -->
      <div class="listpage_not" v-if="isNotData">
        <div class="icon_data">
          <i class="icon iconfont zk-temporarily"></i>
        </div>
        <p>暂无数据</p>
      </div>
      <div v-show="loading" class="productList-loading" v-if="!isNotData">{{loadingMessage}}</div>
    </view>
  </view>
</template>

<script>
  import { setInterval, clearInterval } from 'timers'
  export default {

    data () {
      return {
        async: false,
        widgetModel: '',
        productItem: '',
        loading: false,
        isNotData: false,
        loadingMessage: '加载中……',
        tabIndexs: 99,
        scrollLeft: 0,
        isClickChange: false,
        numLength: 0,
        defalutInput: '',
        fixed: {
          searchBoxHeight: 0,
          uniSwiperTabHiehgt: 46
        },
        listPar: {
          userId: '',
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
          pageSize: 20
        },
        type: '',
        tabBars: [{
          name: '销量',
          id: 99
        }, {
          name: '价格',
          id: 2
        }, {
          name: '最新',
          id: 5
        }, {
          name: '人气',
          id: 6
        }, {
          name: '最热',
          id: 1
        }
        ]
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$nextTick(async () => {
        this.$bus.$off('onBottom').$on('onBottom', async (type) => {
          this.numLength += this.productItem.productItems.length
          if (this.productItem.productItems.length >= 20) {
            this.listPar.pageIndex += 1
            this.loading = true
            var that = this
            var tiems = setInterval(async () => {
              that.loading = false
              var produtList = await that.$api.httpGet('/api/product/list', this.listPar)
              that.productItem = produtList.result
              that.$refs.zkProductItem.$emit('toProductItem', this.productItem, true)
              clearInterval(tiems)
            }, 500)
          } else {
            this.loadingMessage = '没有更多数据了……'
            this.loading = true
          }
        })
      })
    },
    onLoad (option) {
      this.option = option
    },
    methods: {
      listPage () {
        if (this.$refs.zkProductItem.testMsg === 'b') {
          this.$refs.zkProductItem.testMsg = 'e'
        } else {
          this.$refs.zkProductItem.testMsg = 'b'
        }
      },
      async  init () {
        if (this.$api.client() === 'AppPlus') {
          this.fixed.searchBoxHeight = 0
          this.fixed.uniSwiperTabHiehgt = 46
        }
        this.listPar.userId = this.$user.loginUser().id
        this.widgetModel = await this.$api.themeWidget(this.widget)

        if (!this.$api.isEmpty(this.widget.route.ClassIds)) {
          this.listPar.ClassIds = this.widget.route.ClassIds
        }

        if (!this.$api.isEmpty(this.widget.route.Keyword)) {
          this.listPar.Keyword = this.widget.route.Keyword
        }
        if (!this.$api.isEmpty(this.widget.route.TagIds)) {
          this.listPar.TagIds = this.widget.route.TagIds
        }
        // this.async = true
        if (this.widget.value !== null && this.widget.value.priceStyleId !== undefined) {
          this.listPar.priceStyleId = this.widget.value.priceStyleId
        }
        var produtList = await this.$api.httpGet('/api/product/list', this.listPar)
        this.productItem = produtList.result
        if (this.productItem.productItems.length === 0) {
          this.isNotData = true
        } else {
          this.$refs.zkProductItem.$emit('toProductItem', this.productItem)
          this.isNotData = false
        }
      },
      async tabClick (id) {
        this.tabIndexs = Number(id)
        if (id === 99) {
          id = ''
        }
        this.listPar.SortOrder = id
        var produtList = await this.$api.httpGet('/api/product/list', this.listPar)
        this.productItem = produtList.result
        if (this.productItem.productItems.length === 0) {
          this.isNotData = true
        }
        this.$refs.zkProductItem.$emit('toProductItem', this.productItem)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-product-listpage {
    font-size: $gl-size-base;
    .search-placeholder {
      height: 46px;
    }
    .search-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 999;
      border-bottom: 1px solid transparent;
    }
    .uni-swiper-tab-placeholder {
      height: 35px;
    }
    .uni-swiper-tab {
      position: fixed;
      top: 46px;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 999;
      height: 35px;
      line-height: 30px;
      border-top: 1px solid transparent;
    }
    .listpage_not {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      .icon_data {
        height: 70px;
        line-height: 70px;
        i {
          color: #ddd;
          font-size: 72px;
        }
      }
      .infos {
        height: 100px;
      }
      p {
        text-align: center;
        color: #ddd;
      }
    }
  }
  .swiper-tab-item {
    display: inline-block;
    // padding: 0 20px;
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
</style>
