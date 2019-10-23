<template>
  <div class="zk-index-day-update" v-if="async">
    <div class="zk-index-day-updata-container">
      <div class="index-day-updata-container-box" v-for="(item, index) in viewModel" :key="index" @click="go(item.id)">
        <div class="updata-container-box-left">
          <img :src="item.thumbnailUrl" alt="">
        </div>
        <div class="updata-container-box-right">
          <div class="updata-container-box-name">{{item.name}}</div>
          <div class="updata-container-box-tag">库存&nbsp; {{item.stock}}</div>
          <div class="updata-container-box-price" v-if="showAdmin">
            <span v-if="$api.showPrice()||isPrice()">￥{{item.price.toFixed(2)}}</span>
            <span v-if="$api.showPrice()||isPrice()">立即抢购</span>
            <span v-else>￥{{item.marketPrice}}</span>
          </div>
          <div class="updata-container-box-price" v-else>
            <span v-if="$api.showPrice()||isPrice()">￥{{item.displayPrice}}</span>
            <span v-if="$api.showPrice()||isPrice()">立即抢购</span>
            <span v-else>￥{{item.marketPrice}}</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import './var.scss'
  import './styles'
  import api from '@/service/config.js'

  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        isLogin: false,
        showAdmin: true,
        viewModel: []
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
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        let paramenter = {
          pageSize: 10
        }
        this.widgetModel = await this.$api.isApiReqGet(this.widget, paramenter)
        this.widgetModel.productItems.sort(this.compare('id'))

        for (let i = 0; i < this.widgetModel.productItems.length; i++) {
          if (i < 6) {
            this.viewModel.push(this.widgetModel.productItems[i])
          }
        }
        this.async = true
        if (api.themeId === '5d26e11a064c25053c9b3def') {
          this.showAdmin = false
        }
      },
      go (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      isPrice () {
        if (!this.$user.isLogin() && api.themeId === '5d26e11a064c25053c9b3def') {
          return true
        }
      },
      compare (prop) {
        return function (obj1, obj2) {
          var val1 = obj1[prop]
          var val2 = obj2[prop]
          if (val1 < val2) {
            return 1
          } else if (val1 > val2) {
            return -1
          } else {
            return 0
          }
        }
      }
    }
  }
</script>
