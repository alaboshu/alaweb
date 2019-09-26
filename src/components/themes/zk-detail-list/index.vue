<template>
  <view class="zk-detail-list">
    <view v-for="(item,index) in widgetModel" :key="index">
      <view class="banner">
        <image class="banner-img" :src="item.bgImg" />
        <view class="banner-title">{{item.title}}</view>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in item.list" :key="key">
          <view class="uni-media-list">
            <image class="uni-media-list-logo" :src="value.img" />
            <view class="uni-media-list-body">
              <view class="uni-media-list-text-top">{{value.title}}</view>
              <view class="uni-media-list-text-bottom">
                <text>{{value.name}}</text>
                <text>{{value.time}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  import dataJosn from './data.json'
  import './var.scss'
  import './styles/a.scss'


  export default {
    
    data () {
      return {
        widgetModel: {}
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
        this.widgetModel = dataJosn
      }
    }
  }
</script>
