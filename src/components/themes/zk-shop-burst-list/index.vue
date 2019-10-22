<template>
  <view class="zk-shop-burst-list-a">
    <view class="zk-shop-burst-list">
      <ul>
        <li v-for="(item,index) in contentList" :key="index" class="product-item">
          <div @click="goLinks(item.id)" class="product-item-box" :style="'height:'+tylistHeight+'px;'">
            <image :src="item.thumbnailUrl" class="product-item-image" />
          </div>
          <div class="product-item-content">
            <div @click="goLinks(item.id)" class="product-name">{{item.name}}</div>
            <p class="produce-item-news" v-if="widgetModel.isFrontShowPrice">
              <span class="product-item-price">
                <span class="item-price_span">￥</span>{{item.price}}</span>
              <span class="product-item-market_price">{{item.marketPrice}}</span>
            </p>
            <p class="produce-item-news" v-else>
              <span class="product-item-price">{{widgetModel.priceAlterText}}</span>
            </p>
            <!-- <p class="product-item-tag">惊爆价</p>
            <p class="product-item-sale">已售{{item.soldCount}}件</p>
            <p class="instance_sale">立即购买</p> -->
          </div>
        </li>
      </ul>
    </view>
    <!-- <div class="zk-shop-burst-Loading" v-show="showLoading">
      <div v-show="moreItem" @click="LoadMore()">
        猜中你的喜好有点难度哦，点我在尝试下吧
      </div>
      <div v-show="!moreItem">
        暂无更多宝贝
      </div>
    </div> -->
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
        contentList: [],
        newContentList: [],
        priceList: [],
        showLoading: false,
        moreItem: true,
        listPar: {
          pageIndex: 1,
          pageSize: 20
        },
        itemHeight: '',
        tylistHeight: ''
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      var _this = this
      this.$nextTick(() => {
        this.$bus.$off('shopBurstList').$on('shopBurstList', () => {
          _this.init()
        })
        this.$bus.$off('onBottomBurst').$on('onBottomBurst', (type) => {
          // _this.showLoading = true
          if (_this.newContentList.length >= 20) {
            _this.moreItem = true
            _this.listPar.pageIndex += 1
            _this.init()
          }
        })
      })
    },
    methods: {
      async init () {
        var this_ = this
        uni.getSystemInfo({
          success: function (res) {
            this_.itemHeight = res.screenWidth * 0.47
            this_.itemWidth = res.screenWidth / 2 - 12
          }
        })
        var marginWidth = (this.$api.getSystemInfoSync().screenWidth * 0.02) * 3
        this.tylistHeight = (this.$api.getSystemInfoSync().screenWidth - marginWidth) / 2
        if (!this.$api.isEmpty(this.widget)) {
          if (!this.$api.isEmpty(this.widget.value)) {
            if (!this.$api.isEmpty(this.widget.value.TagIds)) {
              this.listPar.TagIds = this.widget.value.TagIds
            }
          }
        }
        this.listPar.userId = this.$user.id()
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        console.info('this.widget', this.widgetModel.productItems)
        // this.widgetModel = await this.$api.httpGet('/Api/product/list', this.listPar)
        // if (this.widgetModel.status !== 1) {
        //   return
        // }
        if (this.contentList.length !== 0) {
          this.contentList = [...this.contentList, ...this.widgetModel.productItems]
        } else {
          this.contentList = this.widgetModel.productItems
        }
        this.newContentList = this.widgetModel.productItems
        for (var i = 0; i < this.contentList.length; i++) {
          this.priceList.push((this.contentList[i].marketPrice - this.contentList[i].price).toFixed(2))
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
    // updated () {
    //   var query = uni.createSelectorQuery()
    //   var view = query.select('.product-item')
    //   view.fields({
    //     size: true,
    //     scrollOffset: true
    //   }, data => {
    //     if (data !== null) {
    //       this.tylistHeight = data.width
    //     }
    //   }).exec()
    // }

  }
</script>
