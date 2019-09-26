<template>
  <view class="zk-store-brand-show">
    <view class="zk-store-brand-show_container" v-if="shopsList[0]">
      <div class="brand_show_top" @click="$api.to('/pages/index?path=product_show&id='+shopsList[0].id)">
        <view class="brand-show_left">
          <div class="brand_show_name">{{shopsList[0].name}}</div>
          <div class="brand_show_price">￥{{shopsList[0].displayPrice}}</div>
          <span>立即购买</span>
        </view>
        <view class="brand-show_right">
          <img :src="shopsList[0].thumbnailUrl" alt="">
        </view>
      </div>
      <div class="brand-show_bottom">
        <ul>
          <li v-for="(item,index) in brandList" :key="index">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
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
        brandList: [
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbfc.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbfb.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbfa.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbf9.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbf8.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbf7.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbf6.png',
          'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-12/5d28002846c412294cbebbf5.png'
        ],
        shopsList: []
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
        // this.widgetModel = await this.$api.isApiReqGet(this.widget)
        var res = await this.$api.httpGet('/Api/product/list')
        if (res.status === 1) {
          this.widgetModel = res.result
        }
        for (let i = 0; i < 1; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.productItems.length)
          this.shopsList.push(this.widgetModel.productItems[roundMath])
        }
      }
    }
  }
</script>
