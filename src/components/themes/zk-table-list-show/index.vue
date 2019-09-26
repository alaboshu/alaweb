<template>
  <view class="zk-table-list-show" v-if="async">
    <view class="table_list_show_container">
      <view class="show_list_top">
        <span v-for="(item,index) in list " :key="index" class="show_list_item" :class="Cindex==index?'clickAcitve':''" @click="getIndex(index)">
          <x-icon :name="item.icon" v-if="item.icon"></x-icon>
          <span>{{item.name}}</span>
        </span>
      </view>
      <view class="show_list_content">
        <view class="content_list_item" v-for="(item,index) in viewModel" :key="index" @click="goDetails(item.id)">
          <view class="showList_img">
            <img :src="item.thumbnailUrl">
          </view>
          <view class="list_item_content">
            <view class="item_content_left">
              <span class="item_content_name">{{item.name}}</span>
            </view>
            <view class="item_content_right">
              <span class="exchange_price">{{item.displayPrice}}</span>
              <div class="exchange"><span>立即兑换</span></div>
            </view>
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
        list: [
          {
            name: '低价特惠',
            icon: 'zk-orderaddress'
          },
          {
            name: '超值特惠'
          },
          {
            name: '爆款特惠'
          },
          {
            name: '家具电器'
          }
        ],
        contentList: [],
        Cindex: 0
      }
    },
    props: {
      model: {},
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        var apiUrl
        var par = {
          pageSize: 6,
          SortOrder: 6
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
          par.ShopType = 1
        } else if (model.path === '/fracture/mall/index') {
          apiUrl = '/api/product/list'
          par.ShopType = 2
        } else if (model.path === '/discount/mall/index') {
          apiUrl = '/api/product/list'
          par.ShopType = 3
        } else {
          apiUrl = '/Api/PickUpProduct/GetList'
        }
        var res = await this.$api.httpGet(apiUrl, par)
        if (res.status === 1) {
          this.viewModel = res.result.productItems
          this.widgetModel = res.result.productItems
        }
        this.async = true
      },
      getIndex (index) {
        this.Cindex = index
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



