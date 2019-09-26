<template>
  <view class="zk-selected-shop-list">
    <view class="selected-shop-list-container">
      <view class="shop-list_content">
        <view class="list_item_S" v-for="(item,index) in dataList" :key="index" @click="goLinks(item.id)" :style="'width:'+tylistHeight+'px;'">
          <view class="list_item_S_IN">
            <view class="list_item_S_IN_Name">
              <span>{{item.name}}</span>
              <span v-if="index!==0" class="must-fight-tag">立即抢购 > </span>
            </view>
            <img :src="item.thumbnailUrl" alt="">
          </view>
          <view class="list_item_S_Text">享受轻生活主义</view>
        </view>
      </view>
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
        dataList: [],
        tylistHeight: 0
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
        this.tylistHeight = (this.$api.getSystemInfoSync().windowWidth - 24) / 2
        this.widgetModel = await this.$api.themeWidget(this.widget)
        for (var i = 0; i < this.widgetModel.value.result.productItems.length; i++) {
          if (i < 4) {
            this.dataList.push(this.widgetModel.value.result.productItems[i])
          }
        }
      },
      goLinks (id) {
        this.$api.to('/pages/index?path=product_show&id=' + id)
      }
    }
  }
</script>
