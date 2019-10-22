<template>
  <view class="zk-shop-list-show" v-if="async" ref="zkShops">
    <view class="shop_list_show_container">
      <view class="shop_list_top">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-04/5ccd08dd3b73c60d18571147.png" alt="">
      </view>
      <view class="shop_list_content" v-for="(item,index) in contentList" :key="index" @click="goDetails(item.id)">
        <view class="content_left">
          <img :src="item.thumbnailUrl" alt="">
        </view>
        <view class="content_right">
          <view class="right_name">{{item.name}}</view>
          <view class="right_price">市场价 ￥{{item.marketPrice}}</view>
          <view class="right_bottom">
            <span class="exchange_price"><b>{{item.displayPrice}}</b></span>
            <div class="exchange">
              <span>立即兑换</span>
            </div>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        async: false,
        widgetModel: '',
        contentList: [],
        newContentList: [],
        moreItem: true,
        lists: [],
        listPar: {
          pageIndex: 1,
          pageSize: 10
        }
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
        if (!this.$api.isEmpty(this.widget)) {
          if (!this.$api.isEmpty(this.widget.value)) {
            if (!this.$api.isEmpty(this.widget.value.TagIds)) {
              this.listPar.TagIds = this.widget.value.TagIds
            }
          }
        }
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
        var res = await this.$api.httpGet(apiUrl, par)
        if (res.status === 1) {
          this.contentList = res.result.productItems
        }
        this.newContentList = res.result.productItems
        this.async = true
      },
      goDetails (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
<style lang="scss">
  @import "./style.scss";
</style>


