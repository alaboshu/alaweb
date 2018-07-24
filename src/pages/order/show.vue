<template>
  <div class="pages-order-show">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
    <x-group :mTop="0" v-if="false">
      <x-cell title="地址" value="请选择地址" isLink to="/baidu.com"></x-cell>
    </x-group>
    <div class="buy-addres_box">
      <div class="address-left-icon">
        <x-icon src="zk-orderaddress" size="30"></x-icon>
      </div>
      <div class="buy-address-content">
        <div class="address-content-top">
          <div class="address-name">
            收货人:
          </div>
          <div class="address-phone">
            184965748482
          </div>
        </div>
        <div class="address-content-bottom">
          <div class="addresss-detail">
            收货地址：湖南 长沙市 雨花区 湘府中路18号德思勤广场A8栋2310-2312室
          </div>
        </div>
      </div>
      <!-- <div class="address-right-icon">
        <x-icon src="zk-right" size="30"></x-icon>
      </div> -->
    </div>
    <x-divider></x-divider>
    <div class="order-show-message_box">
      <div class="content-item_title">
        <div class="item_title-hd">
          志伟
        </div>
        <div class="item_title-ft">
          qwe
        </div>
      </div>
      <div class="item-style_box flex">
        <div class="content-item_left">
          <img src="" alt="">
        </div>
        <div class="content-item_right flex_one">
          <div class="item_right_message">
            <p class="item_title">
              志伟
            </p>
            <p class="item_specification">
              ZK735-1 一份 重量：0g
            </p>
          </div>
          <div class="item_right_price">
            <p>￥44</p>
            <span>×1</span>
          </div>
        </div>
      </div>
      <div class="item-total-price">
        <div>
          实付款：
          <span class="num">￥250</span>(含运费
          <span class="num">￥10</span>)
        </div>
      </div>
      <!-- <div class="item-btn-box">
        <button type="button">待付款</button>
        <button type="button" class="main">待付款</button>
      </div> -->
    </div>
    <x-divider></x-divider>
    <div class="order-show-sub_message">
      <div class="sub_message-item">
        订单编号:9000000448
      </div>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '订单详情'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-order-show {
    width: 100%;
    .buy-addres_box {
      padding-left: 30px;
      padding-right: 30px;
      position: relative;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid #d9d9d9;
      .buy-address-content {
        width: 100%;
        .address-content-top {
          display: flex;
          .address-name {
            flex: 1;
          }
        }
        .address-content-bottom {
          .addresss-detail {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .address-left-icon {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .address-right-icon {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
    .flex_one {
      flex: 1;
    }
    .flex {
      display: flex;
    }
    .order-show-message_box {
      background: #fff;
      border: 1px solid rgba(229, 229, 229, 0.7);
      .content-item_title {
        height: 40px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        .item_title-hd {
          flex: 1;
          height: 100%;
          color: @brand;
        }
        .item_title-ft {
          text-align: right;
          color: #999999;
        }
      }
      .item-style_box {
        padding: 8 * @rem;
        background: #f8f9fa;
        .content-item_left {
          width: 4.5rem;
          height: 4.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content-item_right {
          height: 4.5rem;
          padding-left: 5px;
          position: relative;
          display: flex;
          padding-right: 60px;
          .item_right_message {
            .item_title {
              font-size: @h5-font-size;
            }
            .item_specification {
              font-size: @h6-font-size;
              color: @text-secondary;
            }
          }
          .item_right_price {
            position: absolute;
            width: 60px;
            top: 0;
            right: 0;
            text-align: right;
            p {
              color: @brand;
              font-size: @h4-font-size;
              font-weight: @font-weight-bold;
              text-align: right;
            }
            span {
              color: #adb5bd;
              font-size: @h5-font-size;
            }
          }
        }
      }
      .item-total-price {
        height: 40px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        div {
          flex: 1;
          text-align: right;
          .num {
            color: @brand;
          }
        }
      }
      .item-btn-box {
        min-height: 40px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid #e5e5e5;
        button {
          width: 85px;
          background: #fff;
          height: 30px;
          line-height: 30px;
          color: #555;
          border: 1px solid #555;
          margin-left: 5px;
          border-radius: 20px;
        }
        .main {
          color: @brand;
          border: 1px solid @brand;
        }
      }
    }
    .order-show-sub_message {
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      padding: 0.41666667rem 0.83333333rem;
      .sub_message-item {
        color: #999;
        font-size: @h6-font-size;
      }
    }
  }
</style>

