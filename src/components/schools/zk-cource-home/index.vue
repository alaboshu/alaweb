<template>
  <view class="zk-cource-home">
    <view class="zk-qiNNHeader">
      <view class="header">企牛牛</view>
    </view>
    <view class="zk-qiNN-content">
      <view class="zk-couse-type">
        <view class="content" @click="hide">
          <!-- <img src="../../../static/img/zk-course/view1.png"  class="clicks"> -->
          <p class="content-title">选择课程</p>
          <view class="goNext">
            <p>企牛牛课程预定</p> &nbsp;
            <x-icon src="zk-jiantou" size="12"></x-icon>
          </view>
        </view>
        <view class="content" @click="hides">
          <!-- <img src="../../../static/img/zk-course/view1.png"  class="clicks"> -->
          <p class="content-title" style="margin-left:-136px">日期选择</p>
          <p class="goNext"> 日期 &nbsp;
            <x-icon src="zk-jiantou" size="12"></x-icon>
          </p>
        </view>
        <view class="content" style="border:none">
          <view style="font-size:16px; margin-top:-5px">添加人数</view>
          <view class="uni-numbox">
            <view class="uni-numbox-minus" :class="{'uni-numbox-disabled': disableSubtract}" @click="reduce">-</view>
            <view style="width:35px;line-height:38px;text-align:center;">{{inputValue}}</view>
            <view class="uni-numbox-plus" :class="{'uni-numbox-disabled': disableAdd}" @click="add">+</view>
          </view>
        </view>
      </view>
    </view>
    <view class="btn">开始预定</view>
    <transition>
      <view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide">
        <view>
          <view class="zk-courses">
            <view class="uni-list">
              <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
                <view class="uni-media-list">
                  <view class="uni-media-list-logo">
                    <image v-if="showImg" :src="value.img" />
                  </view>
                  <view class="uni-media-list-body">
                    <view class="uni-media-list-text-top">{{value.title}}</view>
                    <view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </transition>
    <view>
      <view class="uni-mask" v-show="shows" :style="{top:offsetTop + 'px'}" @click="hides">
        <view class="data">
          <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
              <view class="uni-media-list" id="content" @click="selectCource">
                <view class="uni-media-list-logo">
                  <image v-if="showImg" :src="value.img" />
                </view>
                <view class="uni-media-list-body">
                  <view class="uni-media-list-text-top">{{value.title}}</view>
                  <view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="zk-cource-list">
      <h2 class="noticeCource"> 热门课程</h2>
      <ul class="list-content">
        <li v-for="(item,index) in datas" :key="index" @click="selectCource" id="content">
          <x-a path="##">
            <img :src="item.image" />
            <p>{{item.tip}}</p>
          </x-a>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>

  export default {

    data () {
      let offsetTop = 0
      // //#ifdef H5
      // offsetTop = 44
      // //#endif
      return {
        widgetModel: '',
        popType: 'bottom',
        offsetTop: offsetTop,
        msg: '底部弹出层',
        type: 'bottom',
        show: false,
        shows: false,
        showPopupBottom: true,
        inputValue: '0',
        showImg: true,
        list: [{
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90'
        },
        {
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90'
        },
        {
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90'
        }]
      }
    },
    props: {
      widget: {}
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      reduce () {
        this.inputValue--
        if (this.inputValue <= 0) {
          this.inputValue = 0
        }
      },
      add () {
        this.inputValue++
      },
      selectCource () {
        // var value = document.getElementById('#content')
      },
      hide () {
        this.$emit('hidePopup')
        this.show = !this.show
      },
      hidePopup () {
        this.showPopupMiddle = false
        this.showPopupTop = false
        this.showPopupBottom = false
      },
      showBottomPopup () {
        this.hidePopup()
        this.popType = 'bottom'
        this.msg = '底部 popup 信息内容'
        this.showPopupBottom = true
      },
      hides: function () {
        this.shows = !this.shows
      }
    },
    computed: {
      disableSubtract () {
        return this.value <= this.min
      },
      disableAdd () {
        return this.value >= this.max
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-cource-home {
    font-size: $gl-size-base;

    .uni-list {
      width: 80%;
      margin: 0 auto;
      border: none;
    }
  }
  .uni-actionsheet__action {
    z-index: 999999999;
    display: none !important;
  }
  .uni-numbox {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 70upx;
    position: relative;
  }
  .uni-mask {
    position: fixed;
    z-index: 998;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .uni-picker-header {
    display: none !important;
  }
  .uni-picker-action-cancel {
    display: none !important;
  }
  .uni-popup {
    position: absolute;
    z-index: 999;
    background-color: #ffffff;
    box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
  }

  .uni-popup-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 380upx;
    height: 380upx;
    border-radius: 10upx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    padding: 30upx;
  }

  .uni-popup-top {
    top: 0;
    left: 0;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
    text-align: center;
  }

  .uni-popup-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100upx;
    line-height: 100upx;
    text-align: center;
  }
  .uni-numbox::after {
    content: "";
    position: absolute;
    transform-origin: center;
    box-sizing: border-box;
    pointer-events: none;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    border: 1px solid #c8c7cc;
    transform: scale(0.5);
  }
  .uni-numbox-minus,
  .uni-numbox-plus {
    margin: 0;
    background-color: #f9f9f9;
    width: 80upx;
    height: 100%;
    line-height: 70upx;
    text-align: center;
    color: #555555;
    position: relative;
  }
  .uni-numbox-minus {
    border-right: none;
    border-top-left-radius: 6upx;
    border-bottom-left-radius: 6upx;
  }
  .uni-numbox-plus {
    border-left: none;
    border-top-right-radius: 6upx;
    border-bottom-right-radius: 6upx;
  }
  .uni-numbox-value {
    position: relative;
    background-color: #ffffff;
    width: 80upx;
    height: 100%;
    text-align: center;
  }

  .uni-numbox-value::after {
    content: "";
    position: absolute;
    transform-origin: center;
    box-sizing: border-box;
    pointer-events: none;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    border-style: solid;
    border-color: #cccccc;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 0;
    border-bottom-width: 0;
    transform: scale(0.5);
  }

  .uni-numbox-disabled {
    color: #c0c0c0;
  }
  .zk-qiNNHeader {
    height: 300px;
    // background: url('../../../static/img/zk-course/bg.png') no-repeat center;
    // background-size: 117% 300px;
    overflow: hidden;
    .header {
      text-align: center;
      font-size: 17px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin-top: 10px;
    }
  }
  .zk-qiNN-content {
    width: 330px;
    height: 210px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 13px 0px rgba(108, 108, 108, 0.14);
    border-radius: 18px;
    margin: 0 auto;
    margin-top: -87px;
  }
  .zk-qiNN-content {
    .content {
      width: 80%;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      margin: 0 auto;
      margin-top: 8px;
      //  margin-bottom: 20px;
    }
  }
  .clicks {
    width: 18px;
    height: 18px;
    margin-top: 10px;
  }
  .zk-courses {
    background: #ffffff;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;
  }
  .content-title {
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 37px;
    margin-left: -74px;
  }
  .goNext {
    display: flex;
    font-size: 10px;
    color: rgba(102, 102, 102, 1);
  }

  .uni-input {
    line-height: 23px;
    padding-left: 5px;
    font-size: 13px;
  }
  .uni-list-cell-left {
    padding: 0 0px;
    font-size: 13px;
  }
  .data {
    width: 100%;
    height: 300px;
    background: #ffffff;
    position: absolute;
    bottom: 0;
  }
  .btn {
    width: 175px;
    height: 34px;
    background: rgba(233, 54, 55, 1);
    border-radius: 34px;
    font-size: 15px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 19px;
    text-align: center;
    line-height: 33px;
    margin: 0 auto;
    margin-top: -47px;
  }
  .noticeCource {
    font-size: 17px;
    margin: 20px;
  }

  .list-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    li {
      width: 155px;
      margin-top: 10px;
    }
    img {
      width: 155px;
      height: 80px;
    }
  }
</style>
