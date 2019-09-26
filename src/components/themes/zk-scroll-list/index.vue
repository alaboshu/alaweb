<template>
  <view class="zk-scroll-list">
    <view class="scroll_list">
      <view class="zk-image-scroll">
        <view class="list_top_img" v-if="widgetModel.value">
          <img :src="widgetModel.value.images" alt="">
        </view>
        <scroll-view class="scroll-view_H" scroll-x="true">
          <view class="scroll-view_box" v-for="(item,index) in list" :key="index" @click="goLinks(item.url.value)">
            <img :src="item.image" alt="">
            <view class="scroll-view_content">
              <span v-if="widgetModel.value">{{widgetModel.value.tags}}</span>
              <span>￥{{item.price}}</span>
              <span>￥{{item.marketPrice}}</span>
            </view>
          </view>
        </scroll-view>
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
        scrollTop: 0,
        old: {
          scrollTop: 0
        },
        list: []

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
        if (this.widgetModel !== undefined) {
          this.list = this.widgetModel.value.links
        }
      },
      scroll: function (e) {
        this.old.scrollTop = e.detail.scrollTop
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
