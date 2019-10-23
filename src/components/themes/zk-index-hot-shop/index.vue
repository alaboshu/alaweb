<template>
  <div class="zk-index-hot-shop" v-if="async">
    <div class="index-hot-shop-container">
      <div class="hot-shop-content">
        <div class="hot-shop-content-banner" @click="$api.to('/pages/index?path=product_show&id=8917')">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-22/5d356038e84f5e0a0c8967e1.png" alt="">
        </div>
        <div class="hot-shop-content-T">
          <div class="hot-shop-content-T-item" v-for="(item,index) in dataColor" :key="index" @click="goPDetail(item.links)">
            <img :src="item.img" alt="">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import './var.scss'
  import './styles'
  export default {
    data () {
      return {
        async: false,
        widgetModel: {},
        dataColor: [
          {
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-22/5d356038e84f5e0a0c8967e2.png',
            links: '/pages/index?path=product_show&id=9356'
          },
          {
            img: 'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-22/5d356038e84f5e0a0c8967e0.png',
            links: '/pages/index?path=product_show&id=9359'
          }
        ],
        imgList: [
        ],
        isLogin: false
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
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        for (var i = 0; i < this.widgetModel.productItems.length; i++) {
          if (i >= 2) {
            this.imgList.push(this.widgetModel.productItems[i])
          }
        }
        this.async = true
      },
      go (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      goPDetail (url) {
        this.$api.to(url)
      }
    }
  }
</script>
