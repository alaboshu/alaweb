<template>
  <view>
    <div class="timeDowm" v-if="timeLimit.isTimeLimit">
      <div class="time_box">
        <div class="tiem_label">
          <div class="label-icon">
            <x-icon class="tiem_icon" name="icon-zk-remind" :size="18" color="#c91230"></x-icon>
          </div>
          <div class="label-title">
            限时抢购
          </div>
        </div>
      </div>
      <div class="tiem_down">
        <div class="tiem_num">
          <p>距离结束</p>
          <div class="info">
            <div>
              {{date}}
            </div>
            <span> 天</span>
            <div>
              {{hours}}
            </div>
            <span> 时</span>
            <div>
              {{miniute}}
            </div>
            <span> 分</span>
            <div>
              {{seconds}}
            </div>
            <span> 秒</span>
          </div>
        </div>
      </div>
    </div>
    <view class="show-info">
      <div class="i_title-row ">
        <div class="i_title"> {{productView.name}}</div>
      </div>
      <div class="i_subTitle-row">
        <div class="i_subTitle">
          <span v-if="productView.detail.productDetailExtension.productSubTitle">{{productView.detail.productDetailExtension.productSubTitle}}</span>
          <div v-if="productView.isFrontShowPrice">
            <div style="display:flex" class="i_activities_displayPrice" v-if="productView.marketPrice&&showPrice">
              <div>{{productView.displayPrice}} </div>
              <div class="i_activities_displayPrice elseItem">￥{{originalPrice}}</div>
            </div>
          </div>
          <div v-else-if="isBClent">
            <div style="display:flex" class="i_activities_displayPrice" v-if="productView.marketPrice">
              <div>{{productView.displayPrice}} </div>
              <div class="i_activities_displayPrice elseItem">￥{{originalPrice}}</div>
            </div>
          </div>
          <div v-else>
            <div style="display:flex" class="i_activities_displayPrice">
              <div>￥{{originalPrice}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="i_activities" v-if="productView.isFrontShowPrice">
        <div class="i_activities_content" v-if="showPrice">
          <!-- <div class="c_item">
            <div class="item_name">
              <span>限时购</span>
            </div>
            <div class="item_time_msg">
              此商品支持大批量采购，价格更优惠
            </div>
          </div> -->
          <div class="c_item" v-for="(grade,gradeIndex) in productView.productActivityExtension.userGradePrices" :key="gradeIndex">
            <div class="item_name">
              <span>{{grade.name}}价</span>
            </div>
            <div class="item_price_msg">
              <span>￥{{grade.lowPrice}}~￥{{grade.highPrice}}</span>
            </div>
          </div>
        </div>
        <div class="F_item_showPrice" v-else>
          <div class="F_item_showPrice_msg">
            <span>￥{{productView.displayPrice}}</span>
            <!-- <span>￥{{productView.displayPrice}}</span> -->
          </div>
        </div>
      </div>
      <div class="i_other" >
        <div class="i_other-repertory">库存{{productView.stock}}件</div>
        <div class="i_other-sold">已售{{productView.soldCount}}件</div>
      </div>
      <!-- <view class="title-price">
        <view class="price-displayprice">
          <view class="price-head">
            <view class="price-money">￥
              <span class="price-money_span">{{productView.displayPrice}}</span>
            </view>
            <view class="price-price">
              <p class="old-price">￥{{productView.marketPrice}}</p>
            </view>
          </view>
          <view class="old-yigou">{{productView.soldCount}}人已购</view>
        </view>
        <view class="title_detail">
          {{productView.name}}
        </view>
      </view>-->
    </view>
  </view>
</template>

<script>
  import config from '@/service/config.js'
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
        originalPrice: null,
        isBClent: false,
        showPrice: true
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
        if (config.themeId === '5cc1bfbe23eb301328298b41') {
          this.isBClent = true
        }
        if (config.themeId === '5d26e11a064c25053c9b3def') {
          this.showPrice = false
        }
      },
      async countTime () {
        var date = new Date()
        var now = date.getTime()
        // var endDate = new Date(this.timeLimit.data.EndTime)
        // var end = endDate.getTime()
        var leftTime = this.timeLimit.data.EndTime - now
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
    padding: 15px 10px 10px 10px;
    .i_title-row {
      .i_title {
        font-size: 18px;
        color: $gl-themeColor;
      }
    }
    .i_subTitle-row {
      .i_subTitle {
        font-size: 14px;
        // display: flex;
        align-items: center;
        span {
          flex: 1;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .elseItem {
          font-size: 0.7rem !important;
          text-decoration: line-through;
          color: #666 !important;
          margin-top: 7px;
        }
        .i_activities_displayPrice {
          color: #c91230;
          font-size: 1rem;
          margin-left: 0.25rem;
        }
      }

      .i_displayPrice {
        margin-top: 5px;
        font-size: 14px;
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
      .F_item_showPrice {
        span {
          &:nth-of-type(1) {
            font-size: 20px;
            color: #c91230;
          }
          &:nth-of-type(2) {
            font-size: 13px;
            color: #666;
            text-decoration: line-through;
          }
        }
      }
    }
    .i_other {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .i_other-repertory {
        flex: 1;
        min-width: 0;
        font-size: 12px;
      }
      .i_other-sold {
        font-size: 12px;
        color: #999999;
      }
    }
    // .title-price {
    //   .price-displayprice {
    //     color: $gl-brand;
    //     font-weight: bold;
    //     color: $gl-black;
    //     padding: 5px 0px;
    //     position: relative;
    //   }
    //   .price-price {
    //     text-align: left;
    //     color: $gl-text2;
    //     margin-left: 5px;
    //     margin-top: 7px;
    //   }
    //   .title_detail {
    //     color: $gl-text1;
    //     font-size: 14px;
    //     line-height: 20px;
    //     word-break: break-all;
    //     text-overflow: ellipsis;
    //     display: -webkit-box;
    //     -webkit-box-orient: vertical;
    //     -webkit-line-clamp: 2;
    //     overflow: hidden;
    //   }
    // }
  }
  // .show-title::before {
  //   content: "";
  //   position: absolute;
  //   display: block;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 1px;
  //   background: #e5e5e5;
  // }

  // .price-money,
  // .price-price {
  //   display: inline-block;
  //   vertical-align: middle;
  //   font-weight: 400;
  // }
  // .price-money {
  //   font-size: 16px;
  //   font-weight: 400;
  //   color: $gl-brand;
  // }
  // .price-money_span {
  //   font-size: 22px;
  //   margin-left: -3px;
  //   color: $gl-brand;
  // }
  // .old-price {
  //   text-decoration: line-through;
  //   color: $gl-text3;
  //   margin: 0px;
  // }
  // .old-yigou {
  //   color: $gl-text2;
  //   font-weight: 400;
  //   position: absolute;
  //   right: 0px;
  //   bottom: 12px;
  // }
  // .price-price p {
  //   line-height: 15px;
  // }
</style>
