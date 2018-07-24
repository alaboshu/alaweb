<template>
  <div class="zk-product-item" :style="styles">
    <div class="zkui-product-item__1">
      <ul class="item-box">
        <li class="item">
          <dl class="content">
            <dt>
              <a href="" class="content-img-box">
                <img src="http://zqingchun.yiqipingou.com//wwwroot/Uploads/Product/2018/06/e2f9dc3cbfbc43c096d84dc158f7fec7.jpg_320X320.jpg" class="cimg">
              </a>
            </dt>
            <dd class="itemTitle">
              <a href="" class="titme-test">
                杨雨111111111111111111111111111111111111111111111111111111111111222222222222222222222222233333333333333
              </a>
            </dd>
            <dd class="itemPrice">
              <div class="price-box">
                2
                <span class="price-old">￥1</span>
              </div>
            </dd>
          </dl>
        </li>
        <li class="item">
          <dl class="content">
            <dt>
              <a href="" class="content-img-box">
                <img src="http://zqingchun.yiqipingou.com//wwwroot/Uploads/Product/2018/06/e2f9dc3cbfbc43c096d84dc158f7fec7.jpg_320X320.jpg" class="cimg">
              </a>
            </dt>
            <dd class="itemTitle">
              <a href="" class="titme-test">
                杨雨111111111111111111111111111111111111111111111111111111111111222222222222222222222222233333333333333
              </a>
            </dd>
            <dd class="itemPrice">
              <div class="price-box">
                2
                <span class="price-old">￥1</span>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    props: {
      elementData: {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .h5-x-product-item {
    font-size: @font-size-base;
  }
  .zk-product-item {
    // font-size: @font-size-base;
    .zkui-product-item__1 {
      background: #ffffff;
      .item-box::after {
        content: '';
        display: block;
        clear: both;
      }
      .item-box {
        padding-bottom: 5px;
        list-style: none;
      }
      .item {
        display: block;
        float: left;
        width: 47%;
        // height: 20rem;
        margin: 2% 0 0 2%;
        padding-bottom: 10px;
        border-radius: 2px;
        border: 1px solid rgba(229, 229, 229, 0.4);
        .content {
          .content-img-box {
            display: block;
            .cimg {
              width: 100%;
              display: block;
            }
          }

          .itemTitle {
            .titme-test {
              display: block;
              margin: 5px;
              color: #000;
              font-size: 16px;
              height: 25px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
          .itemPrice {
            padding-left: 10px;
            height: 20px;
            .price-box {
              display: flex;
              color: #000;
              height: 20px;
              flex-wrap: wrap;
              font-size: 14px;
              .price-old {
                font-size: 14px;
                padding-left: 5px;
                text-decoration: line-through;
                color: @metal;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }
</style>


