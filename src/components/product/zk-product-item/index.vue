<template>
  <view class="zk-product-item-a">
    <view class="zk-product-item" v-if="async">
      <ul class="zk-product-all">
        <li v-for="(item,index) in productItem.productItems" :key="index">
          <div @click="goShow(item.id)" class="product-item-box" :style="'height:'+itemHeight+'px;'+'width:'+itemHeight+'px;'">
            <img :src="item.thumbnailUrl" class="product-item-image" />
          </div>
          <div class="product-item-content">
            <div @click="goShow(item.id)" class="product-name">{{item.name}}</div>
            <p class="produce-item-news" v-if="showPrice &&!showF2Cprice">
              <span class="product-item-price">
                <span class="item-price_span">￥</span>{{item.price}}</span>
              <span class="product-item-market_price">{{item.marketPrice}}</span>
            </p>
            <p class="produce-item-news" v-else-if="showPrice&&showF2Cprice">
              <span class="product-item-price">
                <span class="item-price_span">￥</span>{{item.displayPrice}}</span>
              <span class="product-item-market_price">{{item.marketPrice}}</span>
            </p>
            <p class="produce-item-news" v-else>
              <span class="product-item-price">
                <span class="item-price_span">￥</span>{{item.marketPrice}}</span>
            </p>
          </div>
        </li>
      </ul>
    </view>
    <div v-if="isWidgetTagIds">
    </div>
  </view>
</template>

<script>

  import './var.scss'
  import apiBaseUrl from '@/service/config.js'
  export default {
    data () {
      return {
        async: false,
        widgetModel: {},
        productItem: [],
        newProductItem: [],
        apiUrl: '',
        itemWidth: '',
        itemHeight: '',
        testMsg: 'b',
        isWidgetTagIds: false,
        listPar: {
          TagIds: '',
          pageIndex: 1,
          pageSize: 50
        },
        showF2Cprice: false
      }
    },
    props: {
      widget: {},
      isNot: {
        default: true
      },
      showPrice: {
        default: true
      }
    },
    mounted () {
      this.init()
      this.$nextTick(() => {
        this.$on('toProductItem', (productItem, isLoading) => {
          if (this.isWidgetTagIds === false) {
            this.async = true
            if (isLoading) {
              var oldList = this.productItem.productItems
              var newList = productItem.productItems
              this.productItem.productItems = [...oldList, ...newList]
            } else {
              this.productItem = productItem
            }
          }
        })
        this.$bus.$off('onBottom').$on('onBottom', (type) => {
          this.async = true
          if (this.isWidgetTagIds) {
            if (this.newProductItem.length < this.listPar.pageSize) {
            } else {
              this.listPar.pageIndex += 1
              this.init().then(() => {
              })
            }
          }
        })
      })
    },
    methods: {
      goShow (id) {
        this.$api.to('/pages/product/show?id=' + id)
      },
      async init () {
        var this_ = this
        uni.getSystemInfo({
          success: function (res) {
            this_.itemHeight = res.screenWidth * 0.47
            this_.itemWidth = res.screenWidth / 2 - 12
          }
        })
        if (!this.$api.isEmpty(this.widget)) {
          if (!this.$api.isEmpty(this.widget.value)) {
            if (!this.$api.isEmpty(this.widget.value.TagIds)) {
              this.isWidgetTagIds = true
              this.listPar.TagIds = this.widget.value.TagIds
              var response = await this.$api.httpGet('api/product/list', this.listPar)
              if (response.status === 1) {
                if (this.newProductItem.length === 0) {
                  this.productItem = response.result
                } else {
                  this.productItem.productItems = [...this.productItem.productItems, ...response.result.productItems]
                }
                this.newProductItem = response.result.productItems
                this.async = true
              }
            }
          }
        }
        if (apiBaseUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showF2Cprice = true
        }
      }
    }
  }
</script>
