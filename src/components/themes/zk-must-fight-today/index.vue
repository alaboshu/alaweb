<template>
  <view class="zk-must-fight-today" v-if="widgetModel.productItems.length!==0">
    <div class="zk-must-fight-tody-container">
      <div class="index-must-fight-today">
        <div class="must-fight-box">
          <div class="tiem-limit-title-box">
            <div class="limit-title">
              精品
            </div>
            <div class="limit-time" v-if="false">
              <div>距结束</div>
              <div class="limit-time-count" v-if="timeAsync">
                <!-- <span>{{h}}</span><b>:</b>
                <span>{{m}}</span><b>:</b>
                <span>{{s}}</span> -->
                <x-countDown color="#FFFFFF" background-color="#000" :showDay="false" border-color="#00B26A" :hour="h" :minute="m" :second="s"></x-countDown>
              </div>
            </div>
          </div>
          <div class="fight-shop-content">
            <div class="fight-shop-content-left">
              <img :src="singleData.thumbnailUrl" alt="">
              <div class="fight-mask">
                <span>精品</span>
              </div>
            </div>
            <div class="fight-shop-content-right" @click="goLinks()">
              <div class="shop-content-right-name">{{singleData.name}}</div>
              <div class="shop-content-right-tag" v-if="false">
                <span> 已抢光</span>
                <span></span>
              </div>
              <div class="shop-content-right-btn">
                <span v-if="$api.showPrice()">￥{{singleData.price}}</span>
                <span v-else>￥{{singleData.marketPrice}}</span>

                <!-- <span>￥{{singleData.price}}</span> -->
                <span>精品<x-icon name="icon-zk-jiantou" size="12"></x-icon></span>
              </div>
            </div>
          </div>
          <div class="fight-shop-content-scroll">
            <div class="zk-image-scroll">
              <scroll-view class="scroll-view_H" scroll-x="true">
                <div class="scroll-view_box" v-for="(item,index) in dataList" :key="index" @click="go(item.id)">
                  <img :src="item.thumbnailUrl" :style="'height:'+tylistHeight+'px;'+'width:'+tylistHeight+'px;'" />
                  <div v-if="false" class="shop-content-right-tag">
                    <span> 已抢70%</span>
                    <span></span>
                  </div>
                  <div class="scroll_name">{{item.name}}</div>
                  <div class="scroll_price">
                    <span v-if="$api.showPrice()">￥{{item.price}}</span>
                    <span v-else>￥{{item.marketPrice}}</span>
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="must-fight-banner">
        <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-05/5cf769d931109e232cc9c965.jpg" alt="">
        <div class="must-fight-shop-list">
          <div class="fight-shop-content-scroll">
            <div class="zk-image-scroll">
              <scroll-view class="scroll-view_H" scroll-x="true">
                <div class="scroll-view_box" v-for="(item,index) in dataList" :key="index">
                  <image :src="item.img" />
                  <div class="scroll_name">{{item.text}}</div>
                  <div class="scroll_price">
                    <span>￥{{item.price}}</span>
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        timeAsync: false,
        widgetModel: {
          productItems: []
        },
        h: '',
        m: '',
        s: '',
        dataList: [],
        singleData: {},
        tylistHeight: '',
        isLogin: false
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
      this.countTime()
    },
    methods: {
      async init () {
        console.info('this.widget', this.widget)
        if (this.$user.isLogin() && this.$user.loginUser().gradeName !== '免费会员') {
          this.isLogin = true
        }
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 10) * 0.26
        let paramenter = {
          pageSize: 5
        }
        this.widgetModel = await this.$api.isApiReqGet(this.widget, paramenter)
        for (var i = 0; i < this.widgetModel.productItems.length; i++) {
          if (i > 0) {
            this.dataList.push(this.widgetModel.productItems[i])
          } else {
            this.singleData = this.widgetModel.productItems[i]
          }
        }
      },
      countTime () {
        var now = new Date().getTime()
        var end = new Date(2019, 7, 23, 24, 0, 0).getTime()
        var leftTime = end - now
        if (leftTime >= 0) {
          this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          this.m = Math.floor(leftTime / 1000 / 60 % 60)
          this.s = Math.floor(leftTime / 1000 % 60)
        }
        this.timeAsync = true
      },
      go (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      },
      goLinks () {
        this.$api.to('/pages/index?path=product_show&id=' + this.singleData.id)
      }
    }
  }
</script>
