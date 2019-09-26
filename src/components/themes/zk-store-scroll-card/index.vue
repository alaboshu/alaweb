<template>
  <view class="zk-store-scroll-card">
    <view class="zk-store-scroll-card_container">
      <div class="scroll_card_top">
        <h2>精品推荐</h2>
        <div class="scroll_card_top_meaages">口碑保证 精挑细选</div>
      </div>
      <div class="fight-shop-content-scroll">
        <div class="zk-image-scroll">
          <scroll-view class="scroll-view_H" scroll-x="true">
            <div class="scroll-view_box" v-for="(item,index) in widgetModel.productItems" :key="index" @click="goLinks(item.id)">
              <image :src="item.thumbnailUrl" />
              <div class="scroll_name">{{item.name}}</div>
              <div class="scroll_price">
                <span v-if="showEle">￥{{item.price}}</span>
                <span v-else>{{item.displayPrice}}</span>
              </div>
            </div>
          </scroll-view>
        </div>
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
        showEle: true
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
        this.widgetModel = await this.$api.isApiReqGet(this.widget)
        if (apiUrl.themeId === '5d26e11a064c25053c9b3def') {
          this.showEle = false
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
