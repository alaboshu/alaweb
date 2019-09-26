<template>
  <view class="zk-shop-mall-swiper" v-if="async">
    <view class="shop_mall_swiper_container">
      <view class="swiper_title_HH" @click="goBack()" v-if="show">
        <x-icon name="zk-return" size="18"></x-icon>
        <span>{{widgetModel.value.title}}</span>
      </view>
      <view class="swiper_top" :style="'background: url('+widgetModel.value.images+') no-repeat;background-position: center center;background-size: 100% 100%;'">
        <swiper class="shop-mall-swiper" :indicator-dots="true" :autoplay="true" indicator-color="rgb(255,255,255,.5)" indicator-active-color="rgb(255,255,255)" circular="true">
          <swiper-item v-for="(item, index) in viewModel" :key="index">
            <view class="swiper_img" @click="jumpDetail(item)">
              <img :src="item.thumbnailUrl" alt="">
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>
<script>
 
  export default {
    
    props: {
      widget: {},
      model: {}
    },
    data () {
      return {
        async: false,
        widgetModel: '',
        viewModel: [],
        show: true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.themeWidget(this.widget)
        var apiUrl
        var par = {
          pageSize: 3,
          SortOrder: 5
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
          if (apiUrl === '/Api/PickUpProduct/GetList') {
            this.viewModel = resposne.result
          }
          if (this.$api.client() === 'WeChatLite') {
            this.show = false
          } else {
            this.show = true
          }
          this.async = true
        }
      },
      goBack () {
        this.$api.back()
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
