<template>
  <view class="show_title">
    <view class="countdown">
      <view class="countdown_box">
        <span class="countdown_box-O">距结束：</span>
        <view class="countdown_box-p">{{date}}</view>
        天
        <view class="countdown_box-p">{{hours}}</view>
        时
        <view class="countdown_box-p">{{miniute}}</view>
        分
        <view class="countdown_box-p">{{seconds}}</view>
        秒
      </view>
    </view>
    <view class="show-info">
      <view class="i_title-row ">
        <view class="i_title"> {{productView.name}}</view>
      </view>
      <view class="i_subTitle-row">
        <view class="info_price">
          <view class="info_price-left">
            <!-- ￥ -->
            <span class="s-price_text">{{productView.displayPrice}}</span>
          </view>
          <view class="original-price">
            <view class="original-price_text price_thiltr">￥{{originalPrice}}</view>
            <view class="original-price_text">已售{{productView.soldCount}}件</view>
          </view>
          <view class="purchase-buttom" @click="$emit('showSaleModel')">立即抢购</view>
        </view>
      </view>
      <view class="info_coupon">
        <span>限时抢购</span>
        <span>厂家直销</span>
        <span>货到付款</span>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      productView: {},
      isActivity: {},
      timeLimit: {}
    },
    data () {
      return {
        date: '',
        hours: '',
        miniute: '',
        seconds: '',
        originalPrice: null
      }
    },
    components: {
    },
    mounted () {
      this.init()
      this.countTime()
    },
    onLoad () {
      this.countTime()
    },
    methods: {
      init () {
        this.originalPrice = parseFloat(this.productView.marketPrice).toFixed(2)
      },
      async countTime () {
        var date = new Date()
        var now = date.getTime()
        // var leftTime = this.timeLimit.data.EndTime - now
        var endtime = new Date('2019/6/20,18:19:00')// 结束时间
        var leftTime = endtime - now
        if (leftTime >= 0) {
          this.date = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          this.hours = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          this.miniute = Math.floor(leftTime / 1000 / 60 % 60)
          this.seconds = Math.floor(leftTime / 1000 % 60)
        } else {
          this.date = '00'
          this.hours = '00'
          this.miniute = '00'
          this.seconds = '00'
        }
        setTimeout(this.countTime, 1000)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  .show_title {
    .countdown {
      width: 100%;
      height: 45px;
      background-color: #cf2a4f;
      position: relative;
      .countdown_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
        background: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        text-align: center;
        border-radius: 40px;
        padding: 4px 0px;
        .countdown_box-p {
          display: inline-block;
          background-color: #000;
          color: #fff;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 3px;
          margin: 0px 2px;
        }
        span {
          color: #fff;
        }
        .countdown_box-O {
          font-size: 13px;
        }
      }
    }
    .timeDowm {
      display: flex;
      height: 60px;
      .time_box {
        width: 35%;
        background: #c91230;
        position: relative;
        .tiem_label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid #fff;
          border-radius: 20px;
          padding: 1px;
          width: 100px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          .label-icon {
            width: 40px;
            height: 100%;
            background: #fff;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            position: relative;
            .tiem_icon {
              position: absolute;
              top: 50%;
              left: 60%;
              transform: translate(-50%, -50%);
            }
          }
          .label-title {
            flex: 1;
            color: #fff;
            font-size: 12px;
            text-align: center;
          }
        }
      }
      .tiem_down {
        flex: 1;
        background: rgb(255, 204, 203);
        position: relative;
        .tiem_num {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          p {
            color: #000;
            text-align: center;
            margin-top: 5px;
          }
          .info {
            margin: 0 auto;
            color: #c91230;
            display: flex;
            font-size: 12px;
            line-height: 22px;
            justify-content: center;
            div {
              margin-left: 2px;
              padding: 0 5px;
              border-radius: 5px;
              text-align: center;
              line-height: 20px;
              color: #fff;
              background: #c91230;
            }
            span {
              font-weight: bold;
              margin-left: 2px;
              font-size: 14px;
            }
          }
        }
      }
    }
    .show-info {
      color: #666;
      position: relative;
      background: #fff;
      padding: 15px;
      .i_title-row {
        .i_title {
          font-size: 18px;
          color: #333;
          line-height: 25px;
        }
      }
      .i_subTitle-row {
        .info_price {
          display: flex;
          align-items: center;
          .info_price-left {
            color: #cf2a4f;
            font-size: 14px;
            font-weight: 300;
            .s-price_text {
              font-weight: 500;
              font-size: 28px;
            }
          }
          .original-price {
            flex: 1;
            min-width: 0px;
            margin-left: 5px;
            .original-price_text {
              color: #999999;
              font-size: 12px;
              line-height: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .price_thiltr {
              text-decoration: line-through;
            }
          }
          .purchase-buttom {
            border: 1px solid red;
            background-color: #cf2a4f;
            color: #ffffff;
            border-radius: 5px;
            font-size: 16px;
            padding: 4px 14px;
          }
        }
      }
      .info_coupon {
        margin-top: 10px;
        span {
          display: inline-block;
          border: 1px solid #cf2a4f;
          color: #cf2a4f;
          border-radius: 3px;
          font-size: 10px;
          margin-right: 4px;
          height: 18px;
          line-height: 18px;
          padding: 0px 4px;
        }
      }
      .i_activities {
        margin-top: 10px;
        display: flex;
        .i_activities_content {
          flex: 1;
          margin-left: 10px;
          .c_item {
            display: flex;
            margin-top: 3px;
            .item_name {
              span {
                color: #c91230;
                border: 1px solid #c91230;
                border-radius: 20px;
                padding: 0 5px;
                font-size: 12px;
              }
            }
            .item_time_msg {
              margin-left: 15px;
              color: #000;
            }
            .item_msg {
              color: #000;
              margin-left: 10px;
            }
            .item_price_msg {
              color: #c91230;
              span {
                margin-left: 10px;
              }
            }
          }
        }
      }
      .i_other {
        margin-top: 10px;
      }
    }
  }
</style>
