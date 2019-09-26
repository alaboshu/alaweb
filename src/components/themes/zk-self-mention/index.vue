<template>
  <view class="zk-self-mention">
    <view class="zk-exchange-list ">
      <view class="top-text">热门兑换</view>
      <view class="zk-exchange-list_content">
        <view class="content-list" v-for="(item, index) in topList" :key="index">
          <img :src="item.thumbnailUrl" alt="" class="content-img">
          <view class="content-name">{{item.name}}</view>
          <view class="content-integral">{{item.marketPrice}}</view>
        </view>
      </view>
    </view>
    <view class="banner_img">
      <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-03-27/5c9b86889ab5b0193c05d234.jpg" alt="">
    </view>
    <view class="zk-preferential-list">
      <view class="top-text">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-27/5cc43c821198681fec34153c.png" alt="" srcset="">
      </view>
      <view class="zk-preferential-list_content">
        <view v-for="(item, index) in topList" :key="index" class="content-list">
          <img :src="item.thumbnailUrl" alt="" class="content-img">
          <view class="content-name">{{item.name}}</view>
          <view class="content-integral">
            <span>{{item.marketPrice}}</span>
            <view class="content-button">联系客服自提</view>
          </view>
        </view>
      </view>
    </view>
    <view class="banner_img">
      <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-03-27/5c9b86889ab5b0193c05d234.jpg" alt="">
    </view>
    <view class="zk-shop-list-show" v-if="contentList" ref="zkShops">
      <view class="shop_list_show_container">
        <view class="shop_list_top">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-04/5ccd08dd3b73c60d18571147.png" alt="">
        </view>
        <view class="shop_list_content" v-for="(item,index) in topList" :key="index">
          <view class="content_left">
            <img :src="'http://s-test.qiniuniu99.com'+item.thumbnailUrl" alt="">
          </view>
          <view class="content_right">
            <view class="right_name">{{item.name}}</view>
            <view class="right_price">市场价 ￥{{item.price}}</view>
            <view class="right_bottom">
              <span><b>1980</b></span>
              <span>联系客服自提</span>
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
        topList: [],
        shopsList: [],
        contentList: []
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
        var resposne = await this.$api.httpGet('/Api/PickUpProduct/GetList')
        if (resposne.status === 1) {
          var list = resposne.result
          this.topList = list
        }
        /*  for (let i = 0; i < 3; i++) {
           var roundMath = Math.round(Math.random() * list.length)
           this.topList.push(list[roundMath])
         } */
        for (let i = 0; i < 4; i++) {
          var roundMath = Math.round(Math.random() * list.length)
          this.shopsList.push(list[roundMath])
        }
        for (let i = 0; i < 10; i++) {
          var roundMath = Math.round(Math.random() * list.length)
          this.contentList.push(list[roundMath])
        }
      },
      jumpDetail (item) {
        this.$api.to('/pages/index?path=product_show&id=' + item.id)
      }
    }

  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
