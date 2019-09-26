<template>
  <view class="zk-preferential-list">
    <view class="top-text">
      <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-04-27/5cc43c821198681fec34153c.png" alt="" srcset="">
    </view>
    <view class="zk-preferential-list_content">
      <view v-for="(item, index) in widgetModel" :key="index" class="content-list" @click="jumpDetail(item)">
        <img :src="item.thumbnailUrl" alt="" class="content-img">
        <view class="content-name">{{item.name}}</view>
        <view class="content-integral">
          <span>{{item.displayPrice}}</span>
          <view class="content-button">立即兑换</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  //
  import './var.scss'


  export default {
    name: 'zk-preferential',
    data () {
      return {
        widgetModel: []
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
        var apiUrl
        var par = {
          pageSize: 100
        }
        // if (!this.$api.isEmpty(this.widget.value.reduceShop)) {
        //   apiUrl = '/api/product/list'
        //   par.ShopType = this.widget.reduceShop
        // } else {
        //   apiUrl = '/Api/PickUpProduct/GetList'
        // }
        // apiUrl = '/api/product/list'
        // par.ShopType = 1
        var model = this.$api.vuexGet('viewModelItem')
        if (model.path === '/scene/mention/index') {
          apiUrl = '/Api/PickUpProduct/GetList'
        } else if (model.path === '/free/convertibility/index') {
          apiUrl = '/api/product/list'
          // par.ShopType = 1
          par.PriceStyleId = 'E0000000-1478-49BD-BFC7-E73A5D699017'
        } else if (model.path === '/fracture/mall/index') {
          apiUrl = '/api/product/list'
          // par.ShopType = 2
          par.PriceStyleId = 'E0000000-1478-49BD-BFC7-E73A5D699111'
        } else if (model.path === '/discount/mall/index') {
          apiUrl = '/api/product/list'
          // par.ShopType = 3
          par.PriceStyleId = 'E0000000-1478-49BD-BFC7-E73A5D699014'
        } else {
          apiUrl = '/Api/PickUpProduct/GetList'
        }
        var resposne = await this.$api.httpGet(apiUrl, par)
        if (resposne.status === 1) {
          var list = resposne.result.productItems
        }
        for (let i = 0; i < 4; i++) {
          var roundMath = Math.round(Math.random() * 50)
          this.widgetModel.push(list[roundMath])
        }
        // if (this.widget.isApiRequest) {
        //     this.widgetModel = await this.$api.themeWidget(this.widget)
        // } else {
        //   this.widgetModel = this.widget
        // }
      },
      jumpDetail (item) {
        this.$api.to('/pages/index?path=product_show&id=' + item.id)
      }
    }
  }
</script>
