<template>
  <view class="zk-index-type-list" v-if="async">
    <view class="zk-index-type-container">
      <!-- <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''" :id="tab.id" :data-current="index" @click="topClick(index)">{{tab.name}}</view>
      </scroll-view> -->
      <!-- <x-scroll :widget="widget">
        <template slot-scope="list"> -->
      <view class="index-type-content-list">
        <view class="content-list_li" v-for="(item,index) in newModel[0]" :key="index" @click="goLinks(item.id)">
          <div class="showTage_item" :class="item.tag===true?'showtag':''" v-if="item.tag">
            <span>升级会员享更低价</span>
            <span>1088.00</span>
            <span>RMB ￥</span>
          </div>
          <image lazy-load="true" class="list_li-img" :style="'height:'+tylistHeight+'px;'+'width:'+tylistHeight+'px;'" :src="item.thumbnailUrl" />
          <div class="type-content-name">
            <div class="name_T">
              <span class="name_T-span1">爆</span>
              <span class="name_T-span2">{{item.name}}</span>
            </div>
            <div class="name_Price" v-if="!showF2Cprice">
              <span>￥
                <span class="name_Price-span" v-if="$api.showPrice()||isPrice()">{{item.price}}</span>
                <span v-else>{{item.marketPrice}}</span>
                <!-- <span class="name_Price-span">{{item.price}}</span> -->
              </span>

              <span v-if="item.hidePrice&&$api.showPrice()">￥{{item.hidePrice}}</span>
            </div>
            <div class="name_Price" v-else-if="showF2Cprice">
              <span>￥
                <span class="name_Price-span ele_price" v-if="$api.showPrice()||isPrice()">{{item.displayPrice}}</span>
                <span v-else>{{item.marketPrice}}</span>
                <!-- <span class="name_Price-span ele_price">{{item.displayPrice}}</span> -->
              </span>

              <span v-if="item.hidePrice&&$api.showPrice()">￥{{item.hidePrice}}</span>
            </div>
            <div class="name_Tag" v-if="index==0||index==7||index==9||index==12||index==20">
              <span>平台推荐</span>
              <span>热销爆款</span>
            </div>
          </div>
        </view>
      </view>
      <!-- </template>
      </x-scroll> -->
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import apiUrl from '@/service/config.js'

  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        viewModel: [],
        newModel: [[]],
        scrollLeft: 0,
        tabIndex: 0,
        tabBars: [
          {
            name: '精选推荐',
            id: 'guanzhu'
          }, {
            name: '家具家电',
            id: 'tuijian'
          }, {
            name: '生活用品',
            id: 'tiyu'
          }, {
            name: '精选箱包',
            id: 'redian'
          }, {
            name: '数码相机',
            id: 'caijing'
          }, {
            name: '母婴用品',
            id: 'yule'
          }, {
            name: '商品百货',
            id: 'junshi'
          }
        ],
        tylistHeight: 240,
        showF2Cprice: false,
        parmenter: {
          pageIndex: 1
        },
        totalSize: 0,
        pageSizeList: [],
        isLogin: false,
        showList: true
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$nextTick(async () => {
        this.$bus.$off('zkIndexTypeLists').$on('zkIndexTypeLists', async () => {
          // if (this.totalSize !== this.parmenter.pageIndex) {
          //   this.parmenter.pageIndex += 1
          //   this.viewModel = await this.$api.scrollTolower(this.widget, this.parmenter, this.viewModel)
          // }
          this.parmenter.pageIndex = this.roundMath()
          var list = await this.$api.scrollTolower(this.widget, this.parmenter, this.newModel[0])
          this.$set(this.newModel, [0], list)
        })
      })
    },
    methods: {
      async  init () {
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        // 用来获取页数
        var res = await this.$api.scrollGetData(this.widget, this.parmenter)
        if (res !== undefined && res !== null) {
          this.totalSize = res.totalSize
          this.parmenter.pageIndex = this.roundMath()
          // 开始正式请求数据
          this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 24) / 2
          this.widgetModel = await this.$api.scrollGetData(this.widget, this.parmenter)
          this.newModel[0] = this.widgetModel.productItems
          this.totalSize = this.widgetModel.totalSize
        }
        this.async = true
        if (apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showF2Cprice = true
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      async topClick (index) { // 点击tab-bar
        this.tabIndex = index
      },
      isPrice () {
        if (!this.$user.isLogin() && apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      },
      roundMath () {
        var pageSize = 0
        if (this.pageSizeList.length === 36) {
          return
        }
        for (let i = 1; i < this.totalSize; i++) {
          pageSize = Math.round(Math.random() * i)
        }
        if (Number(pageSize) === 0) {
          return this.roundMath()
        }
        for (let j = 0; j < this.pageSizeList.length; j++) {
          if (Number(pageSize) === Number(this.pageSizeList[j])) {
            return this.roundMath()
          }
        }
        this.pageSizeList.push(pageSize)
        return pageSize
      }
    }
  }
</script>
