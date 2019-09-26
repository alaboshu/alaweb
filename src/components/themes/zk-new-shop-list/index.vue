<template>
  <view class="zk-new-shop-list">
    <view class="zk-index-type-container">
      <view class="index-type-content-list">
        <view class="content-list_li" v-for="(item,index) in viewModel" :key="index" @click="goLinks(item.id)" :class="{'addBorder': showBorder === true}">
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
                <!-- 
                <span class="name_Price-span">{{item.price}}</span> -->
              </span>
              <span v-if="item.hidePrice&$api.showPrice()">￥{{item.hidePrice}}</span>
            </div>
            <div class="name_Price" v-else-if="showF2Cprice">
              <span>￥
                <span class="name_Price-span" style="font-size:12px" v-if="$api.showPrice()||isPrice()">{{item.displayPrice}}</span>
                <span v-else>￥{{item.marketPrice}}</span>

                <!-- <span class="name_Price-span" style="font-size:12px">{{item.displayPrice}}</span> -->
              </span>
              <span v-if="item.hidePrice&$api.showPrice()">￥{{item.hidePrice}}</span>
            </div>
            <div class="name_Tag" v-if="index==0||index==7||index==9||index==12||index==20">
              <span>平台推荐</span>
              <span>热销爆款</span>
            </div>
          </div>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'
  import api from '@/service/config.js'

  export default {

    data () {
      return {
        widgetModel: {},
        viewModel: [],
        scrollLeft: 0,
        isClickChange: false,
        tabIndex: 0,
        newsitems: [],
        ShowTag: true,
        showBorder: false,
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
        contentList: [],
        listPar: {
          pageIndex: 1,
          pageSize: 20
        },
        EvenList: [],
        OddList: [],
        newContentList: [],
        moreItem: true,
        ranData: [],
        tylistHeight: '',
        parmenter: {
          pageIndex: 1
        },
        totalSize: 0,
        isLogin: false,
        showF2Cprice: false
      }
    },
    props: {
      widget: {}
    },
    onLoad () {
      if (!this.$api.isEmpty(this.widget)) {
        if (!this.$api.isEmpty(this.widget.value)) {
          if (!this.$api.isEmpty(this.widget.value.TagIds)) {
            this.parmenter.TagIds = this.widget.value.TagIds
          }
        }
      }
    },
    mounted () {
      this.init()
      // var _this = this
      this.$nextTick(() => {
        this.$nextTick(async () => {
          this.$bus.$off('zkIndexTypeList').$on('zkIndexTypeList', async () => {
            if (this.totalSize !== this.parmenter.pageIndex) {
              this.parmenter.pageIndex += 1
              this.viewModel = await this.$api.scrollTolower(this.widget, this.parmenter, this.viewModel)
            }
          })
        })
      })
    },
    methods: {
      async init () {
        if (api.themeId === '5d26e11a064c25053c9b3def') {
          this.showBorder = true
          this.showF2Cprice = true
        }
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 24) / 2
        this.widgetModel = await this.$api.scrollGetData(this.widget, this.parmenter)
        this.viewModel = this.widgetModel.productItems
        this.totalSize = this.widgetModel.totalSize
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      async topClick (index) { // 点击tab-bar
        this.tabIndex = index
      },
      isPrice () {
        if (!this.$user.isLogin() && api.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      },
      watchRoute () {
        this.init()
      }
    },
    watch: {
      widget: 'watchRoute'
    }
  }
</script>
<style lang="scss">
  .zk-new-shop-list {
    .addBorder {
      border: 1px solid #e5e5e5;
    }
  }
</style>
