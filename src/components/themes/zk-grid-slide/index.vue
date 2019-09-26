<template>
  <view class="zk-grid-slide">
    <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
      <view class="scroll-view_box" v-for="(item,index) in dataList" :key="index" v-if="index > 10">
        <view>
          <view class="swiper_grid_item">
            <img :src="item" />
            <view style="font-size:12px">会员中心</view>
          </view>
          <view class="swiper_grid_item" v-if="index>10">
            <img :src="item" />
            <view style="font-size:12px">现场自提</view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="slide_dots">
      <span :style="'left:'+XLeft+'px'"></span>
    </view>
  </view>
</template>

<script>
 
  import './var.scss'
  import './styles'


  export default {
    
    data () {
      return {
        widgetModel: {},
        scrollTop: 0,
        old: {
          scrollTop: 0
        },
        dataList: [
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg',
          'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg'
        ],
        XLeft: ''
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
     this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      scroll (ev) {
        this.XLeft = ev.detail.scrollLeft * 0.1 - (this.$api.getSystemInfoSync().screenWidth * 0.1 * 0.3 * 0.5)
      }
    }
  }
</script>
<style lang="scss">
  @import "./var.scss";
</style>
