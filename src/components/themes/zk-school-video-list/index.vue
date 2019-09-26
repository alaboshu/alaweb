<template>
  <view class="zk-school-video-list">
    <view class="school_video_list_container">
      <view class="video_list_head">
        <span>课程推荐</span>
      </view>
      <ul>
        <li v-for="(item,index) in videoList" :key="index">
          <video id="myVideo" :src="item.links" show-fullscreen-btn="true" controls class='image'></video>
          <view class="video_list_name">{{item.name}}</view>
          <view class="hot_tag" v-show="index===0">热门</view>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>

  import './var.scss'
  import './styles'


  export default {
    name: 'zk-school-video-list',
    data () {
      return {
        widgetModel: {},
        CIndex: 0,
        videoList: []
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
        let par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        }
        for (var i = 0; i < this.widgetModel.length; i++) {
          if (i > 6) {
            this.videoList.push(this.widgetModel[i])
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .zk-school-video-list {
    .uni-video-cover-play-button {
      width: 56upx;
      height: 56upx;
    }
    .uni-video-controls {
      padding: 0;
    }
    .uni-video-danmu-button {
      padding: 0;
    }
    .uni-video-bar {
      height: 66upx;
    }
    .uni-video-control-button {
      width: 8px;
      height: 15px;
    }
    .uni-video-cover-play-button {
      width: 25px;
      height: 25px;
    }
  }
</style>
