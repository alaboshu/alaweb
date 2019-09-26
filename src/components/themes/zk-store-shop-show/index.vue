<template>
  <view class="zk-store-shop-show">
    <view class="zk-store-shop-show_container">
      <div class="fight-shop-content-scroll">
        <div class="zk-image-scroll">
          <scroll-view class="scroll-view_H" scroll-x="true">
            <div class="scroll-view_box" v-for="(item,index) in widgetModel.productItems" :key="index" @click="goLinks(item.id)">
              <image :src="item.thumbnailUrl" />
              <div class="scroll_name">{{item.name}}</div>
              <div class="scroll_price">
                <span v-if="showAdmin">￥{{item.price}}</span>
                <span v-else>{{item.displayPrice}}</span>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
      <div class="store-shop-show_bottom">
        <ul>
          <li v-for="(item,index) in shopsList" :key="index" @click="goLinks(item.id)">
            <div class="circle_top">
              <span>
                {{item.name}}
              </span>
            </div>
            <div class="circle_bottom">
              <span>立即抢购></span>
            </div>
            <div class="show_img">
              <img :src="item.thumbnailUrl" alt="">
            </div>
          </li>
        </ul>
      </div>
    </view>
  </view>
</template>

<script>
  import './var.scss'
  import './styles'
  import apiUrl from '@/service/config.js'

  export default {
    data () {
      return {
        widgetModel: {},
        shopsList: [],
        showAdmin: true
      }
    },
    props: {
      widget: {
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        for (let i = 0; i < 2; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.productItems.length)
          this.shopsList.push(this.widgetModel.productItems[roundMath])
        }
        if (apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showAdmin = false
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }

</script>
