<template>
  <view class="zk-timeline">
    <view class="page">
      <view class>
        <view class="uni-timeline" style="padding: 30upx 20upx;background-color: #fff;">
          <view class="uni-timeline-item uni-timeline-first-item" v-for="(item,index) in widgetModel" :key="index">
            <view class="uni-timeline-item-keynode">{{item.data}}</view>
            <view class="uni-timeline-item-divider"></view>
            <view class="uni-timeline-item-content">
              <view class="text">{{item.text}}</view>
              <view class="tName">
                <img :src="item.img">
                <view class="name">{{item.name}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import dataJson from './data.json'
  import './var.scss'
  import './styles'

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
        this.widgetModel = dataJson
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .uni-timeline-item-content {
    width: 100%;
    padding-left: 10px;
    background: #f7f7f7;
    border-radius: 4px;
    margin-left: 5px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
  .tName {
    display: flex;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      color: #cccccc;
    }
  }
</style>



