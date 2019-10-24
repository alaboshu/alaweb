<template>
  <view>
    <view class="common" v-for="(item,index) in viewModel" :key="index">
      <view class="common-image">
        <img :src="'http://api.szwft.me/'+ item.thumbnailUrl" alt="">
      </view>
      <view class="common-right">
        <view class="common-title">{{item.name}}</view>
        <view class="common-intro "></view>
        <view class="common-price"></view>
      </view>
    </view>
  </view>
</template>


<script>
  export default {
    props: {
      viewModel: {}
    },
    data () {
      return {

      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        console.info('所以说先景来这里啊样式风格使用什么来进行区分', this.viewModel)
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/common.scss";
</style>
