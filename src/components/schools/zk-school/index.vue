<template>
  <view class="zk-school">
    <view class="zk-schoolHead">
      <x-icon src="zk-return" color="#ffffff"></x-icon>
      <p>商学院</p>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" style="height:178.5px; margin-top:44px;" class="zh-school-swiper">
      <swiper-item v-for="(item,index) in lists" :key="index">
        <x-a path="##" class="uni-app-img">
          <!-- <img src="../../../assets/img/banner.png" style="height:180px; width:100%;" :alt="item.intro" :height="height" > -->
        </x-a>
      </swiper-item>
    </swiper>
    <zk-grid :valueArray="itemList"></zk-grid>
    <view class="zk-school-div"></view>
    <view class="zk-head-title">
      <view class="zk-school-head">
        <h1>免费课程</h1>
        <x-a src="##">更多</x-a>
      </view>
      <ul class="zk-school-list">
        <li v-for="(item,index) in list" :key="index">
          <x-a path="##">
            <!-- <img src="../../../assets/img/list.png"> -->
            <p>本月免费课程</p>
          </x-a>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        lists: [
          'item1',
          'item2',
          'item3'
        ],
        list: [
          'item1',
          'item2',
          'item1',
          'item2',
          'item1',
          'item2',
          'item2',
          'item1'
        ],
        itemList: [
          // {
          //   image: '../../../assets/img/list.png',
          //   url: 'http://www.baidu.com'
          // },
          // {
          //   image: '../../../assets/img/list.png',
          //   url: 'http://www.baidu.com'
          // },
          // {
          //   image: '../../../assets/img/list.png',
          //   url: 'http://www.baidu.com'
          // }
        ]
      }
    },

    props: {
      widget: {},
      height: {
        type: Number,
        default: 180
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-school {
    font-size: $gl-size-base;
    .uni-swiper {
      height: 180px;
    }
  }
  .uni-swiper-item {
    padding-top: 0px !important;
  }
  .uni-swiper {
    height: 180px;
    margin-top: 44px;
  }
  .uni-swiper .uni-swiper-dot {
    width: 6px;
    height: 6px;
  }
  .uni-app-img {
    display: block;
    height: 180px;
    width: 100%;
  }

  .weui-grid__icon {
    width: auto;
    height: auto;
    font-size: 12px;
    img {
      width: 26px;
      height: 24px;
    }
  }
  .zh-school-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
  }
  .zh-school-a {
    display: block;
    width: 25%;
    margin-top: 18.5px;
  }
  .zk-school-text {
    margin-top: 13.5px;
    margin-bottom: 13.5px;
  }
  .zk-school-div {
    width: 100%;
    height: 11px;
    background: rgba(243, 243, 243, 1);
  }
  .zk-school-head {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    a {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
    }
    h1 {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
    }
  }
  .zk-school-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: -16px;
    margin-bottom: 14px;
    li {
      width: 50%;
      box-sizing: border-box;
      margin-top: 21px;
      li:nth-child(2n) {
        margin-left: 23.5px;
      }
      img {
        display: block;
        margin: 0 auto;
        width: 155px;
        height: 81px;
      }
      p {
        text-align: center;
        margin-top: 7.5px;
      }
    }
  }
  .zk-schoolHead {
    width: 100%;
    height: 44px;
    background: rgba(233, 54, 55, 1);
    color: #ffffff;
    display: flex;
    line-height: 44px;
    padding: 0 20px;
    position: fixed;
    top: 0px;
    z-index: 100;
    p {
      margin: 0 auto;
      font-size: 18px;
    }
  }
  /* .zh-school-swiper{
              margin-top: 44px;
            } */
</style>
