<template>
  <div class="pages-order-buy">
    <zk-head backText="首页" :title="pageInfo.title"></zk-head>
    <zk-buy-address></zk-buy-address>
    <!-- <x-divider></x-divider> -->
    <x-group>
      <x-cell title="志伟" class="border-bottom"></x-cell>
      <div class="order-buy-content">
        <ul class="content-item_box">
          <li class="content-item flex">
            <div class="content-item_left">
              <img src="" alt="">
            </div>
            <div class="content-item_right flex_one">
              <p class="item_title">
                志伟
              </p>
              <p class="item_specification">
                ZK735-1 一份 重量：0g
              </p>
              <div class="item-price-box">
                <p class="item-price_now">
                  ￥1314.00元
                </p>
                <p class="item-price_old">
                  ￥2000.00元
                </p>
              </div>
              <div class="item_quantity">
                ×1
              </div>
            </div>
          </li>
          <li></li>
        </ul>
      </div>
      <x-cell title="请选择快递方式" @click="ceshi()" isLink></x-cell>
      <x-textarea placeholder="给卖家留言" :rows="1" :show-counter="false" v-model="leaveMessage" />
      <div class="order-buy-account ">
        <div class="account-content">
          共
          <span class="brand">1</span>件-运费
          <span class="brand">￥0</span>-小计
          <span class="brand">￥330</span>
        </div>
      </div>
    </x-group>
    <div class="order-buy-bottom">
      <div class="buy-bottom_left">
        总计：
        <span class="brand">
          ￥317
        </span>
        共1件商品
      </div>
      <div class="buy-bottom_right">
        <button>提交订单</button>
      </div>
    </div>
    <div class="order-buy_modal" @click="popupVisible1=false" v-if="popupVisible1===true">

    </div>
    <x-popup :visible.sync="popupVisible1" class="popup-radio">
      <x-radio title="选择快递方式" v-model="value" :options="options" @change="onChange" />
    </x-popup>
    <!-- <zk-foot></zk-foot> -->
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '购买'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        popupVisible1: false,
        leaveMessage: '',
        value: 'hello',
        options: [{
          label: '对象值',
          value: {
            name: 'tian'
          }
        },
        {
          label: '字符串值',
          value: 'hello'
        },
        {
          label: '布尔值',
          value: true
        },
        {
          label: '禁用项',
          value: 'value4'
        }]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      ceshi () {
        this.popupVisible1 = true
      },
      async init () {
        this.$loading = true
        this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      },
      onChange (val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-order-buy {
    width: 100%;
  }
  .flex_one {
    flex: 1;
  }
  .flex {
    display: flex;
  }
  .brand {
    color: @brand;
  }
  .border-bottom:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 0.08333333rem;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .order-buy-content {
    min-height: 50 * @rem;
    .content-item_box {
      .content-item {
        padding: 8 * @rem;
        .content-item_left {
          width: 6.5rem;
          height: 6.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content-item_right {
          height: 6.5rem;
          padding-left: 5px;
          position: relative;
          .item_title {
            font-size: @h6-font-size;
          }
          .item_specification {
            font-size: @h6-font-size;
            color: @text-secondary;
          }
          .item-price-box {
            position: absolute;
            left: 5px;
            bottom: 0;
            .item-price_now {
              color: @brand;
              font-size: @h5-font-size;
              font-weight: bold;
            }
            .item-price_old {
              color: @text-secondary;
              font-size: @h6-font-size;
              text-decoration: line-through;
            }
          }
          .item_quantity {
            position: absolute;
            bottom: 0;
            right: 0;
            color: @text-secondary;
            font-size: @h6-font-size;
          }
        }
      }
    }
  }
  .order-buy_modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 950;
  }
  .popup-radio {
    position: relative;
    z-index: 999;
    background: #fff;
  }
  .order-buy-account {
    height: 40px;
    position: relative;
    .account-content {
      height: 100%;
      line-height: 40px;
      text-align: right;
      padding-right: 5px;
      color: #909399;
      .brand {
        color: @brand;
      }
    }
  }
  .order-buy-account::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .order-buy-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background: #f7f7fa;
    .buy-bottom_left {
      flex: 1;
      height: 100%;
      line-height: 50px;
      color: @metal;
      font-weight: bold;
      font-size: @h5-font-size;
      padding-left: 10px;
      .brand {
        font-size: @h4-font-size;
      }
    }
    .buy-bottom_right {
      width: 110px;
      height: 100%;
      button {
        width: 100%;
        height: 100%;
        color: @light;
        background: @brand;
      }
    }
  }
  .order-buy-bottom::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 0.08333333rem;
    border-top: 1px solid #c0bfc4;
    color: #c0bfc4;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
</style>

