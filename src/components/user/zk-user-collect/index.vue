<template>
  <div class="zk-user-collect" v-if="collectModel">
    <view v-if="collectModel.length > 0">
      <view class="list" v-for="(item, index) in collectModel" :key="index">
        <img :src="item.image" class="img" alt="">
        <view class="right">
          <view class="collect-title">{{item.name}}</view>
          <view class="collect-intro">{{item.entityId}}人收藏</view>
          <view class="collect-foot"><span class="span">￥</span>100.<span class="span">00</span></view>
        </view>
      </view>
    </view>
    <view v-else class="noData-image">
      <img class="temporarily_img" src="http://ui.5ug.com/static/static/nodata.webp">
    </view>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        collectModel: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var para = {
          userId: this.$user.id()
        }
        var response = await this.$api.httpGet('/Api/Favorite/List', para)
        if (response.status === 1) {
          this.collectModel = response.result
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./var.scss";
</style>
