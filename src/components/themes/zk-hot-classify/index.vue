<template>
  <view class="zk-hot-classify-a">
    <view class="zk-hot-classify">
      <view class="container_box">
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" scroll-with-animation="true" v-if="widget">
          <view id="demo1" class="scroll-view-item_H " v-for="(item,index) in list1" :key="index">
            <view class="scroll_img" @click="goLinks(item.url.value)">
              <img v-if="item.image" :src="item.image" style="width:100px;height:80px;">
              <view class="mask"></view>
              <view class="type_name">{{item.name}}</view>
            </view>
          </view>
          <view style="margin-left:50px; display:flex" class="scroll_img">
            <view v-for="(item,index) in list2" :key="index" style="margin-right:20upx;position:relative" @click="goLinks(item.url.value)">
              <img v-if="item.image" :src="item.image" style="width:100px;height:80px;">
              <view class="maskLinks" style="left:0"></view>
              <view class="type_name">{{item.name}}</view>
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
        contentList: [],
        list1: [],
        list2: []
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
          this.contentList = this.widgetModel.value.links
        }
        var arr = []
        var brr = []
        if (this.contentList.length % 2 === 0) {
          for (var i in this.contentList) {
            if (i < this.contentList.length / 2) {
              arr.push(this.contentList[i])
            } else {
              brr.push(this.contentList[i])
            }
          }
        } else {
          for (var i in this.contentList) {
            if (i < (this.contentList.length + 1) / 2) {
              arr.push(this.contentList[i])
            } else if (i >= (this.contentList.length + 1) / 2) {
              brr.push(this.contentList[i])
            }
          }
        }
        this.list1 = arr
        this.list2 = brr
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
</style>

