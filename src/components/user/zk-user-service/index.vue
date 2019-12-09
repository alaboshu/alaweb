<template>
  <view class="zk-user-service">
    <view class="head">
      <view class="head-list" v-for="(item, index) in serviceModel.links" :key="index">
        <view class="head-image">
          <img :src="item.image" class="image" alt="">
        </view>
        <view class="head-test">{{item.name}}</view>
      </view>
    </view>
    <view class="cont">
      <h3 class="cont-head">常见问题</h3>
      <view class="" v-for="(item, index) in serviceModel.commonModel" :key="index">
        <view class="cont-list" @click="clickCommon(index)" :class="{active: commonIndex == index&&isTrue}">
          <view class="test">{{item.name}}</view>
          <view class="cont-show" :style="{height:commonIndex == index&&isTrue? (item.links.length*40)+'px': '0'}">
            <view class="cont-show-list" v-for="(linkItem , linkIndex) in item.links" :key="linkIndex">{{linkItem.name}}</view>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  import indexJson from './index.json'
  export default {
    data () {
      return {
        serviceModel: indexJson,
        commonIndex: null,
        isTrue: false
      }
    },
    methods: {
      clickCommon (index) {
        if (this.commonIndex !== index) {
          this.commonIndex = index
          this.isTrue = true
        } else {
          this.isTrue = !this.isTrue
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "./var.scss";
</style>
