<template>
  <div class="zk-user-collect" v-if="collectModel">
    <view v-if="collectModel.length > 0">
      <view class="list" v-for="(item, index) in collectModel" :key="index">
        <img src="https://s-open.qiniuniu99.com//wwwroot/uploads/api/2019-11-15/5dce1a76a55e6820f808e9dd.jpg_240X240.jpg" class="img" alt="">
        <view class="right">
          <view class="collect-title">澳柯玛暖风机（化妆镜）NF05L939</view>
          <view class="collect-intro">100人收藏</view>
          <view class="collect-foot"><span class="span">￥</span>280.<span class="span">00</span></view>
        </view>
      </view>
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
