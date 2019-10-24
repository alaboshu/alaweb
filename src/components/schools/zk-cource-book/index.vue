<template>
  <view class="zk-cource-book">
    <view class="zk-book-head">
      <x-icon src="zk-return"></x-icon>
      <p>我的预约</p>
    </view>
    <view class="zk-book-content">
      <view class="uni-list">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
          <view class="uni-media-list" @click="selectCource">
            <view class="uni-media-list-logo">
              <!-- <image v-if="showImg" :src="value.img" class="zk-book-img"/>  -->
              <img :src="value.img" alt class="zk-book-img">
            </view>
            <view class="uni-media-list-body">
              <view class="uni-media-list-text-top name" style="font-size:14px;">{{value.name}}</view>
              <view class="uni-media-list-text-top">{{value.title}}</view>
              <view class="uni-media-list-text-bottom uni-ellipsis">{{value.content}}</view>
              <view class="zk-book-price">{{value.price}}</view>
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
        list: [{
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
        },
        {
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
        },
        {
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
        },
        {
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
        },
        {
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
        },
        {
          name: '课程名称',
          title: '东莞 厚街 喜来登酒店',
          content: '2019年1月14日-2019年1月14日',
          img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90',
          price: '￥1998元'
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
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-cource-book {
    font-size: $gl-size-base;
  }

  .zk-book-head {
    height: 44px;
    background: rgba(233, 54, 55, 1);
    line-height: 44px;
    color: #ffffff;
    font-size: 18px;
    display: flex;
    padding: 0 10px;
    p {
      margin: 0 auto;
      font-size: 16px;
      margin-left: 120px;
    }
  }
  .zk-book-img {
    width: 66px;
    height: 53px;
  }
  .uni-media-list-body {
    margin-left: 25px;
    .uni-media-list-text-top {
      font-size: 12px;
      color: #8c8b8b;
    }
    .uni-ellipsis {
      font-size: 10px;
    }
    .name {
      font-size: 15px;
      color: #131313;
    }
  }
  .uni-media-list {
    padding: 15px;
  }
  .uni-media-list-body {
    height: 54px;
  }
  .uni-media-list-text-bottom {
    color: #dddde1;
  }
  .zk-book-price {
    position: absolute;
    right: 10px;
    top: 48px;
    color: #f21415;
  }
  .uni-list:after {
    height: 0;
  }
</style>
