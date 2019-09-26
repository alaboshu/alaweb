<template>
  <view class="zk-new-scroll-list" v-if="async">
    <div class="zk-new-scroll-list-container">
      <div @click="$api.to('/pages/index?path=product_list&TagIds=12050')">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf769d931109e232cc9c965.jpg" class="banner_img">
      </div>
      <div class="must-fight-shop-list">
        <div class="fight-shop-content-scroll">
          <div class="zk-image-scroll">
            <scroll-view class="scroll-view_H" scroll-x="true">
              <div class="scroll-view_boxs" :style="'width:'+tylistHeight+'px;'" v-for="(item,index) in widgetModel.productItems" :key="index" @click="goLinks(item.id)">
                <img :src="item.thumbnailUrl" :style="'height:'+tylistHeight+'px;'+'width:'+tylistHeight+'px;'" />
                <div class="scroll_name">{{item.name}}</div>
                <div class="scroll_price">
                  <!-- <span v-if="$api.showPrice()">￥{{item.price}}</span>
                  <span v-else>升级后显示价格</span> -->
                  <span>￥{{item.price}}</span>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        dataList: [],
        tylistHeight: 50,
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
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 10) * 0.26
        let paramenter = {
          pageSize: 10
        }
        this.widgetModel = await this.$api.isApiReqGet(this.widget, paramenter)
        this.async = true
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
