<template>
  <view class="zk-exchange-list" v-if="async">
    <view class="top-text">热门兑换</view>
    <view class="zk-exchange-list_content">
      <view class="content-list" v-for="(item, index) in viewModel" :key="index" @click="jumpDetail(item)">
        <!-- {{item.thumbnailUrl}} -->
        <img :src="item.thumbnailUrl" alt="" class="content-img">
        <view class="content-name">{{item.name}}</view>
        <view class="content-integral">{{item.displayPrice}}</view>
      </view>
    </view>
  </view>
</template>

<script>

  import './var.scss'


  export default {

    data () {
      return {
        async: false,
        widgetModel: []
      }
    },
    props: {
      widget: {},
      model: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var apiUrl
        var par = {
          pageSize: 3,
          SortOrder: 1
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
          this.viewModel = resposne.result.productItems
          this.widgetModel = await this.$api.themeWidget(this.widget)
          this.async = true
        }
      },
      jumpDetail (item) {
        this.$api.to('/pages/index?path=product_show&id=' + item.id)
      }
    }
  }
</script>
