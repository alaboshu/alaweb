<template>
  <view class="zk-collapse">
    <view class="page">
      <view class="uni-card" style="margin-top:50px;">
        <view class="uni-list">
          <block v-for="(list,index) in lists" :key="index">
            <view class="uni-list-cell uni-collapse">
              <view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">{{list.title}}</view>
              <view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
                <swiper v-if="list.type === 'swiper'" autoplay="true" indicator-dots="true" circular="true" style="height: 400upx;">
                  <swiper-item v-for="(img,key) in imgUrls" :key="key">
                    <image :src="img" style="height: 400upx;" />
                  </swiper-item>
                </swiper>
                <view v-if="list.type === 'font'" class="page-pd">
                  <view class="uni-h1">hello uni-app</view>
                  <view class="uni-h2">hello uni-app</view>
                  <view class="uni-h3">hello uni-app</view>
                  <view class="uni-h4">hello uni-app</view>
                  <view class="uni-h5">hello uni-app</view>
                </view>
                <view v-if="list.type === 'list'">
                  <view class="uni-list">
                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                      <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                    </view>
                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                      <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                    </view>
                    <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                      <view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
      </view>
    </view>
  </view>
</template>
<script>

  import './var.scss'
  import './styles/a.scss'

  export default {

    data () {
      return {
        widgetModel: {},
        lists: [
          {
            title: '图片轮播',
            type: 'swiper',
            show: false
          },
          {
            title: '列表',
            type: 'list',
            show: false
          },
          {
            title: '标题',
            type: 'list',
            show: false
          },
          {
            title: '文字排版',
            type: 'font',
            show: false
          }
        ],
        imgUrls: [
          'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
          'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
          'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg'
        ]
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
      trigerCollapse (e) {
        for (let i = 0, len = this.lists.length; i < len; ++i) {
          if (e === i) {
            this.lists[i].show = !this.lists[i].show
          } else {
            this.lists[i].show = false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
</style>

