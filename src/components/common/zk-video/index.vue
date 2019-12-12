<template>
  <view class="zk-video-list-a" v-if="async">
    <view class="zk-image-list-t">
      <ul class="zk-image-list">
        <li v-for="(item ,index) in shopsList" class='image-list' :class="'image-list-'+index" :key="index">
          <a :alt="item.name" href="javascript:void(0)">
            <video id="myVideo" :src="item.links" enable-danmu danmu-btn controls class='image'></video>
          </a>
        </li>
      </ul>
    </view>
  </view>

</template>

<script>

  import './var.scss'
  export default {

    data () {
      return {
        async: false,
        widgetModel: {},
        shopsList: []
      }
    },
    onReady: function (res) {
      this.videoContext = uni.createVideoContext('myVideo')
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
