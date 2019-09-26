<template>
  <view class="zk-grid-list">
    <view class="grid_list">
      <view class="top_img">
        <img :src="BgImg" alt="">
      </view>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goLinks(item.url.value)">
          <img :src="item.image">
          <span>{{item.name}}</span>
          <span>￥{{item.price}}</span>
          <span>￥{{item.marketPrice}}</span>
        </li>
      </ul>
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
        list: [],
        BgImg: ''
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
                  this.widgetModel = await this.$api.themeWidget(this.widget)
        if (this.widgetModel.value !== undefined) {
          this.list = this.widgetModel.value.links
          this.BgImg = this.widgetModel.value.images
        }
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
