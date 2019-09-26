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
  import './styles'


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
        var par = {
          TableName: this.widget.value.name
        }
        var response = await this.$api.httpGet('Api/LightApp/getList', par)
        if (response.status === 1) {
          this.widgetModel = response.result
          this.async = true
        }
        for (let i = 0; i < 1; i++) {
          var roundMath = Math.round(Math.random() * this.widgetModel.length)
          this.shopsList.push(this.widgetModel[roundMath])
        }
      },
      videoErrorCallback: function (e) {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false
        })
      },
      getRandomColor: function () {
        const rgb = []
        for (let i = 0; i < 3; ++i) {
          let color = Math.floor(Math.random() * 256).toString(16)
          color = color.length === 1 ? '0' + color : color
          rgb.push(color)
        }
        return '#' + rgb.join('')
      }

    }
  }
</script>
<style lang="scss">
  @import "./styles/a.scss";
</style>

