<template>
  <view class="zk-grid-swiper">
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
</template>

<script>

  import './var.scss'
  import './styles'


  export default {

    data () {
      return {
        widgetModel: {},
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
  .uni-swiper-dot {
    height: 4px;
  }
  .zk-grid-swiper {
    .swiper-box {
      height: 11rem;
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
</style>
