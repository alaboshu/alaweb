<template>
  <view class="zk-shepherd-kings">
    <view class="shepherd-kings_one">
      <img class="one-image" src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-19/5d318f42f1d2ca1de8a50eaa.png" alt="" />
    </view>
    <view class="shepherd-kings_two">
      <!-- <img class="two-image" src="" alt="" /> -->
      <view class="kings-video">
        <div></div>
        <view class="kings_video_item">
          <video id="myVideo" :src="widget.value.frequencyUrl" autoplay controls loop show-fullscreen-btn class="kings_video-box"></video>
        </view>
      </view>
    </view>
    <view class="shepherd-kings_ul">
      <view class="shepherd-kings_li" v-for="(item,index) in widget.value.imageList" :key="index" @click="$api.to(item.url.value)">
        <img class="kings_li-image" :src="item.image" alt="" />
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
      }
    }
  }
</script>
