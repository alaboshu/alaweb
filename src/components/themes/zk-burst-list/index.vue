<template>
  <view class="zk-burst-list-a">
    <view class="zk-burst-list" v-if="widgetModel">
      <view class="container_box" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
        <view class="list_img">
          <img :src="item.thumbnailUrl" />
        </view>
        <view class="list_name">{{item.name}}</view>
        <!-- <view class="list_reduce_price">波炉360转盘加热 旋钮操作精</view> -->
        <view class="list_bottom">
          <view class="test_price">体验价<span>￥{{item.displayPrice}}</span></view>
          <view class="sale_count">库存剩余{{Number(item.stock)-Number(item.soldCount)}}件</view>
        </view>
        <view class="count_tag">{{index+1}}
          <view class="tragier_white"></view>
        </view>
      </view>
      <div v-show="loading" class="productList-loading" v-if="!isNotData">{{loadingMessage}}</div>
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
        list: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
        numLength: 0,
        loading: false,
        isNotData: false,
        loadingMessage: '加载中……',
        listPar: {
          SortOrder: '', // 商品排序方式
          Keyword: '', // 搜索关键字
          MinPrice: '', // 最低价格
          MaxPrice: '', // 最高价格
          ClassIds: '', // 商品分类Id
          TagIds: '', // 商品标签ID
          ProductIds: '', // 商品Id
          BrandId: '', // 商品品牌Id
          PriceStyleId: '', //  商品模式
          OrderType: '', // 排序方式
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.$nextTick(async () => {
        this.$bus.$off('onBottom').$on('onBottom', async (type) => {
          // this.numLength += this.productItem.productItems.length
          if (this.list >= 10) {
            this.listPar.pageIndex += 1
            this.loading = true
          } else {
            this.loadingMessage = '没有更多数据了……'
            this.loading = true
          }
        })
      })
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.httpGet('/Api/product/list')
        if (this.widgetModel.status !== 1) {
          return
        }
        this.list = this.widgetModel.result.productItems
      },
      godetail (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
<style lang="scss">
  .productList-loading {
    padding: 10px 0;
    color: #666;
    text-align: center;
  }
</style>
