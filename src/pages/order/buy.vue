<template>
  <div class="pages-order-buy">
    <zk-head backText="首页" :title="pageInfo.title" v-if="asyncFlag"></zk-head>
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
      <x-cell title="志伟" @click="ceshi()"></x-cell>
    </x-group>
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
        this.popupVisible1 = !this.popupVisible1
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
</style>

