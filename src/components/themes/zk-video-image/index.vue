<template>
  <view class="zk-video-image">
    <view class="video-box">
      <!-- <video class="video-box_source" id="myVideo" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4" page-gesture="true" enable-danmu controls></video> -->
      <image class="video-box_source" src="http://img2.imgtn.bdimg.com/it/u=3806557979,3233516071&fm=26&gp=0.jpg" />
    </view>
    <view class="image-box">
      <view class="image-box_list" v-for="(item,index) in imageList" :key="index">
        <router-link class="image-box_a" to="">
          <image class="box_a-image" :src="item.image" />
          <view class="box_a-text">{{item.name}}</view>
        </router-link>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data () {
      return {
        imageList: [
          { image: 'http://img0.imgtn.bdimg.com/it/u=3967239004,1951414302&fm=26&gp=0.jpg', name: '时尚豪车' },
          { image: 'http://img3.imgtn.bdimg.com/it/u=3487137640,3381900027&fm=26&gp=0.jpg', name: '独特风景' }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>

