<template>
  <view class="zk-cource-order">
    <view class="zk-cource-orderHead">
      <view class="icon">
        <x-icon src="zk-return" color="#fff"></x-icon>
      </view>
      <h1 class="title">填写订单</h1>
    </view>

    <view class="zk-order-content">
      <view class="uni-list">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
          <view class="uni-media-list">
            <view class="uni-media-list-logo">
              <image v-if="showImg" :src="value.img" />
            </view>
            <view class="uni-media-list-body">
              <view class="uni-media-list-text-top">{{value.title}}</view>
              <view class="uni-media-list-text-bottom uni-ellipsis">
                <view class="courceTitle">{{value.content}}</view>
                <view style="display:flex;">
                  <view class="data">2019年11月12日-2019年12月1日</view>
                  <view class="price">￥ {{price}}元</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="zk-order-count">
        <p class="count">数量</p>
        <view class="zk-addCount">
          <view class="countdot" @click="reduce">-</view>
          <view class="detailMount">{{value}}</view>
          <view class="countdot" @click="add">+</view>
        </view>
      </view>
      <view class="zk-words">
        <p>买家留言 ： <span class="news">选填填写内容</span></p>
      </view>
    </view>
    <view class="zk-order-bottom">
      <view class="left">
        <span class="total">合计 ： </span>
        <span class="totalPrice">￥{{parseFloat(totalPrice).toFixed(2)}}元</span>
      </view>
      <view class="right">
        <p>提交订单</p>
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
        value: 0,
        price: 198,
        totalPrice: 0,
        list: [{
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
      reduce () {
        this.value--
        if (this.value <= 0) {
          this.value = 0
        }
        this.totalPrice = this.value * this.price
      },
      add () {
        this.value++
        this.totalPrice = this.value * this.price
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-cource-order {
    font-size: $gl-size-base;
  }
  .zk-cource-orderHead {
    display: flex;
    color: #fff;
    height: 44px;
    background: rgba(233, 54, 55, 1);
    line-height: 44px;
    .icon {
      margin-left: 10px;
    }
    h2 {
      text-align: center;
    }
    .title {
      font-size: 18px;
      margin: 0 auto;
      font-weight: normal;
      margin-left: 124px;
    }
  }
  .uni-media-list-body {
    height: 60px;
    font-size: 15px;
  }
  .data {
    font-size: 9px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(221, 221, 221, 1);
  }
  .courceTitle {
    font-size: 10px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .price {
    margin-left: 80px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(233, 54, 55, 1);
    line-height: 32px;
    margin-top: -10px;
  }

  .zk-order-count {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    padding: 20px 20px;
    .count {
      font-size: 18px;
    }
    .zk-addCount {
      display: flex;
      .detailMount {
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
      }
      .countdot {
        width: 24px;
        height: 24px;
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 3px 0px 0px 3px;
        text-align: center;
        line-height: 24px;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .zk-words {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    padding: 20px 15px;

    .news {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
  .uni-list:after {
    background: rgba(238, 238, 238, 1) !important;
  }
  .zk-order-bottom {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: -38px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(238, 238, 238, 1);
    line-height: 50px;

    .total {
      color: #333333;
      font-size: 18px;
      padding-left: 30px;
    }
    .totalPrice {
      color: #e93637;
      font-size: 18px;
    }
    .right {
      height: 55px;
      line-height: 50px;
      text-align: center;
      color: #ffffff;
      width: 198px;
      background: rgba(233, 54, 55, 1);
      p {
        font-size: 18px;
      }
    }
  }
</style>
