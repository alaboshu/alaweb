<template>
  <div class="pages-order-index">
    <zk-head backText="首页" :title="pageInfo.title" v-if="true"></zk-head>
    <div class="order-index_navbar">
      <x-navbar v-model="navbar1_selected" @change="changed" active-color="#21292c">
        <x-navbar-item id="navbar1_item1">全部</x-navbar-item>
        <x-navbar-item id="navbar1_item2">待付款</x-navbar-item>
        <x-navbar-item id="navbar1_item3">待发货</x-navbar-item>
        <x-navbar-item id="navbar1_item4">待收货</x-navbar-item>
      </x-navbar>
    </div>
    <!-- 全部 -->
    <div class="order-index_content" v-if="navbar1_selected==='navbar1_item1'">
      <ul class="content-item_box">
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 待付款 -->
    <div class="order-index_content" v-if="navbar1_selected==='navbar1_item2'">
      <ul class="content-item_box">
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 待发货 -->
    <div class="order-index_content" v-if="navbar1_selected==='navbar1_item3'">
      <ul class="content-item_box">
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- 待收货 -->
    <div class="order-index_content" v-if="navbar1_selected==='navbar1_item4'">
      <ul class="content-item_box">
        <li class="content-item ">
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
              共
              <span class="num">1</span> 件商品 合计：
              <span class="num">￥250</span>(含运费
              <span class="num">￥10</span>)
            </div>
          </div>
          <div class="item-btn-box">
            <button type="button">待付款</button>
            <button type="button" class="main">待付款</button>
          </div>
        </li>
      </ul>
    </div>
    <zk-foot></zk-foot>
  </div>
</template>

<script>
  import { THEME_GETPAGE_GET } from '@/service/api/apiUrl'
  export default {
    config: {
      'navigationBarTitleText': '订单中心'
    },
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        navbar1_selected: 'navbar1_item2'
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
      },
      changed (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .pages-order-index {
    width: 100%;
    display: flex;
    height: 100vh;
    flex-direction: column;
  }
  .flex_one {
    flex: 1;
  }
  .flex {
    display: flex;
  }
  .order-index_navbar {
    height: 36px;
  }
  .order-index_content {
    flex: 1;
    background: #f8f8f8;
    .content-item_box {
      padding-top: 5 * @rem;
      height: 100%;
      overflow: auto;
      .item-style_box {
      }

      .content-item {
        background: #fff;
        border: 1px solid rgba(229, 229, 229, 0.7);
        margin-bottom: 5 * @rem;
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
    }
  }
  .demo-wrapper {
    display: block;
    overflow: hidden;
    margin: 100px 0 50px;

    .demo-label {
      display: block;
      font-size: 13px;
      color: #555;
      margin-bottom: 0.5em;
      text-align: center;
    }
  }
</style>

