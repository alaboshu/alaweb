<template>
  <view>
    <view class="zk-store-dynamic" v-for="(item,index) in articleList" :key="index" @click="goDetails(item.url)">
      <view class="zk-store-dynamic-cont">
        <view class="zk-store-dynamic-topText">{{item.title}}</view>
        <view class="zk-store-dynamic-ready">{{item.intro}}</view>
      </view>
      <view class="zk-store-dynamic-video">
        <img :src="item.image" alt="">
      </view>
    </view>
  </view>
</template>

<script>
  //
  import './var.scss'


  export default {
    name: 'zk-store-dynamic',
    data () {
      return {
        widgetModel: {},
        articleList: []
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
        var res = await this.$api.httpGet('/api/article/toplinelist')
        if (res.status === 1) {
          this.articleList = res.result.apiDataList
        }
      },
      goDetails (url) {
        this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
  .uni-video-bar {
    height: 20px;
  }
</style>
