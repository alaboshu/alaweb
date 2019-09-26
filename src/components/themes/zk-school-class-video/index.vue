<template>
  <view class="zk-school-class-video">
    <view class="school_class_video_container">
      <view class="zk-image-list-t">
        <ul class="zk-image-list">
          <li v-for="(item ,index) in widgetModel" class='video-list' :class="'image-list-'+index" :key="index">
            <video id="myVideo" :src="item.links" enable-danmu danmu-btn controls class='image'></video>
            <view class="video_name">{{item.name}}</view>
          </li>
        </ul>
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
        let par = {
          TableName: this.widget.value.tagName
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
        }
      }
    }
  }
</script>
