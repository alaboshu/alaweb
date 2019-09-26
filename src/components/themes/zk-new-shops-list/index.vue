<template>
  <view class="zk-new-shops-list">
    <view class="shops_list">
      <view class="list_item" v-for="(item,index) in contentList" :key="index" @click="goLinks(item.id)">
        <view class="list_left">
          <img :src="item.thumbnailUrl" alt="">
        </view>
        <view class="list_right">
          <view class="list_right_name">{{item.name}}</view>
          <view class="list_right_count">{{item.soldCount}}件已预售</view>
          <view class="list_right_price">市场价{{item.marketPrice}}</view>
          <view class="list_right_disprice">
            <view class="disprice">
              <span>体验价</span>
              <span>￥{{item.price}}</span>
            </view>
            <view class="icon_cart">
              <x-icon name="zk-cart" size="18" color="#c81432"></x-icon>
            </view>
          </view>
        </view>
      </view>
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
        contentList: [
          {
            name: '美的 (Midea)百雀羚套装 ',
            count: '5000',
            img: 'https://s-open.qiniuniu99.com//wwwroot/uploads/api/2019-04-03/5ca4163b155cef1ae4bc701a.jpg_320X320.jpg',
            price: '843'
          },
          {
            name: '百雀羚套装百雀羚套装 ',
            count: '200',
            img: 'https://s-open.qiniuniu99.com//wwwroot/uploads/api/2019-04-03/5ca4163b155cef1ae4bc701a.jpg_320X320.jpg',
            price: '788'
          },
          {
            name: '正品授权AHC百雀羚套装 ',
            count: '200',
            img: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/16069/11/10311/128914/5c872cafE3a5d3350/7e17694affa0afae.jpg!q80.dpg',
            price: '788'
          },
          {
            name: '九阳（Joyoung)百雀羚套装 ',
            count: '200',
            img: 'https://s-open.qiniuniu99.com//wwwroot/uploads/api/2019-04-03/5ca41434155cef1ae4bc6fb2.jpg_320X320.jpg',
            price: '788'
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
        this.widgetModel = await this.$api.httpGet('/Api/product/list')
        if (this.widgetModel.status !== 1) {
          return
        }
        this.contentList = this.widgetModel.result.productItems
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
