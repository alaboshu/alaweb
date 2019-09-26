<template>
  <view class="zk-cource-intro">
    <view class="zk-cource-head">
      <x-icon src="zk-return" color="#ffffff" class="zk-icon-left"></x-icon>
      <p>课程详情</p>
    </view>
    <view class="zk-intro-banner">
      <!-- <img src="../../../static/img/zk-course/introBg.png" alt=""> -->
    </view>
    <view class="zk-intro-content">
      <view class="cource-tile">
        <view class="left">
          <h2>初中生物八年级</h2>
          <p>挥刀将面前挡路的荆棘斩断，王金洋眉头紧蹙，手中拿着一款军用三防手机，</p>
        </view>
        <view class="right">
          <p>456人购买</p>
        </view>
      </view>
      <view class="line"></view>
      <view class="zk-cource-detail">
        <h2>课程详情</h2>
        <p class="detail-content" :class="fold ? 'fold' : 'unfold'">
          挥刀将面前挡路的荆棘斩断，王金洋眉头紧蹙，手中拿着一款军用三防手机， 开口道：“张局，你确定人真的入山了？”挥刀将面前挡路的荆棘斩断，王金 洋眉头紧蹙，手中拿着一款军用三防手机，开口道：“张局，你确定人真的入 刀将面前挡路的荆棘斩断，王金洋眉头紧蹙，手中拿着一款军用三防手机， 开口道：“张局，你确定人真的入山了？”挥刀将面前挡路的荆棘斩断，王金 洋眉头紧蹙，手中拿着一款军用三防手机，开口道：“张局，你确定人真的入
        </p>
        <p style="margin-left:325px; margin-top:10px" v-show="fold" @click="handleFold">展开</p>
        <p style="margin-left:325px; margin-top:10px" v-show="!fold" @click="handleFold">收起</p>
      </view>
      <view class="zk-cource-list">
        <h2>课程列表</h2>
        <view class="uni-list">
          <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
            <view class="uni-media-list" @click="selectCource">
              <view class="uni-media-list-logo">
                <image v-if="showImg" :src="value.img" />
              </view>
              <view class="uni-media-list-body">
                <view class="uni-media-list-text-top">{{value.title}}</view>
                <view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
              </view>
              <view class="zk-icon">
                <p>
                  <x-icon src="zk-jiantou" size="12"></x-icon>
                </p>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      return {
        widgetModel: '',
        showImg: true,
        fold: true,
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
        }
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
      async  init () {
                  this.widgetModel = await this.$api.themeWidget(this.widget)
      },
      handleFold () {
        this.fold = !this.fold
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-cource-intro {
    font-size: $gl-size-base;
  }

  .zk-cource-head {
    width: 100%;
    height: 44px;
    background: rgba(233, 54, 55, 1);
    display: flex;
    line-height: 44px;
    color: #ffffff;
    padding: 0 10px;
    position: fixed;
    top: 0;
    p {
      font-size: 18px;
      margin: 0 auto;
    }
  }
  .zk-intro-banner {
    margin-top: 44px;
    img {
      width: 100%;
      height: 211px;
    }
  }
  .cource-tile {
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 38px;
    display: flex;
    padding: 19px;
    .left {
      width: 250px;
      h2 {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 19px;
      }
      p {
        font-size: 9px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 16px;
        margin-top: 10px;
      }
    }
    .right {
      p {
        margin-left: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 19px;
        margin-top: 40px;
      }
    }
  }
  .line {
    width: 750px;
    height: 9px;
    background: rgba(241, 241, 241, 1);
  }
  .zk-cource-detail {
    padding: 20px 15px;
    border-bottom: 1px solid rgba(241, 241, 241, 1);
    h2 {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 10px;
    }
    p {
      font-size: 10px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
  }
  .zk-cource-list {
    h2 {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      padding: 10px 15px;
    }
  }

  .uni-list::before {
    height: 0;
  }
  .zk-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    color: rgba(153, 153, 153, 1);
    p {
      font-size: 16px;
    }
  }

  .detail-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .detail-content.fold {
    -webkit-line-clamp: 3;
  }

  .detail-content.unfold {
    -webkit-line-clamp: 100;
  }
</style>
