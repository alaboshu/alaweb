<template>
  <view class="zk-store-index-grid">
    <view class="zk-index-new-top">
      <view class="body-bg">
        <div class="inde-grid_text">
          <view class="zk-grid-swiper-list">
            <swiper :indicator-dots="false" :autoplay="false" :circular="isCircular" class="swiper-box" indicator-active-color="#c81432" column-num="5">
              <swiper-item v-for="(item,cindex) in dataList" :key="cindex">
                <view class="uni-grid-9">
                  <view v-for="(Citem,index) in item" :key="index" class="uni-swiper_list" :style="'width:'+100/5+'%;'" @click="goLinks(Citem.url.value)">
                    <image class="uni-grid-9-image" :src="Citem.image" />
                    <view>
                      <text class="uni-grid-9-text">{{Citem.name}}</text>
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </view>
        </div>
        <div class="index-banner" @click="$api.to('/pages/index?path=mall_explosive')">
          <img src="https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-07-23/5d36a85204bdc31f90349555.gif" alt="">
        </div>
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
        title: 'swiper',
        widgetModel: {},
        tabIndex: 0,

        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        height: 0,
        imgWidth: 0,
        topPadding: 0,
        list: [

        ],
        dataList: [],
        isCircular: true
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
        var list = this.widgetModel.value.links
        var arr = []
        var brr = []
        for (var i = 0; i < list.length; i++) {
          if (i < 10) {
            arr.push(list[i])
          } else {
            brr.push(list[i])
          }
        }
        this.dataList.push(arr)
        // this.dataList.push(brr)
      },
      switchChange (e) {
        this.isCircular = e.detail.value
      },
      goLinks (url) {
        this.$api.to(url)
      }
    }
  }
</script>
<style lang="scss">
  .zk-store-index-grid {
    .zk-grid-swiper-list {
      uni-swiper {
        height: 360upx;
      }
      .uni-grid-9 {
        background: #ffffff;
        border-top: none;

        .uni-swiper_list {
          box-sizing: border-box;
          text-align: center;
          padding: 5px 0px;

          .uni-grid-9-text {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
