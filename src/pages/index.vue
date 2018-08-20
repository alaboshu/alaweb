<template>
  <!-- <x-page :pageInfo="pageInfo" v-if="pageInfo">

  </x-page> -->
  <div>
    <div class="zk-top-nav">
      <div class="top-nav_box">
        <div class="top-nav_left">
          <ul class="left_box">
            <li>
              <x-icon src="alert1" size="12"></x-icon>
              手机阿里
            </li>
            <li>欢迎来到阿里巴巴
              <a href="" class="left_login">
                请登录
              </a>
              <a href="" class="left_reg">
                免费注册
              </a>
            </li>
          </ul>
        </div>
        <div class="top-nav_right">
          <ul class="right_box">
            <li>
              <a href="">168首页</a>
            </li>
            <li>
              <a href="" class="pull-down">我的阿里
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">进货单
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">收藏夹
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">诚信通官网
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">实力商家
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">我是供应商
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
            <li>
              <a href="" class="pull-down">网站导航
                <x-icon src="zk-arrows_below" size="12"></x-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="zk-header">
      <div class="header-logo">
        <a href=""></a>
      </div>
      <div class="header-search">
        <div class="search-input">
          <input type="text">
          <button type="button">搜索</button>
        </div>
        <div class="search-recommend ">
          <ul class="recommend-box">
            <li>大家都在搜:</li>
            <li>
              <a href="">女装</a>
            </li>
            <li>
              <a href="">连衣裙</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="header-introduce ">

      </div>
    </div>
    <div class="zk-nav">
      <div class="zk-nav_box">
        <div class="nav-left">
          <x-icon src="zk-pc-option " size="16"></x-icon> 行业分析
        </div>
        <div class="nav-right">
          <ul class="nav-right_box">
            <li>
              <a href="">首页</a>
            </li>
            <li>
              <a href="">实力品牌</a>
            </li>
          </ul>
        </div>
        <div class="nav-left-popup">
          <ul class="left-popup_box">
            <li>
              <a href="">
                <x-icon src="alert1" size="12"></x-icon>
                <span>服饰内衣 运动户外</span>
              </a>
            </li>
            <li>
              <a href="">
                <x-icon src="alert1" size="12"></x-icon>
                <span>服饰内衣 运动户外</span>
              </a>
            </li>
            <li>
              <a href="">
                <x-icon src="alert1" size="12"></x-icon>
                <span>服饰内衣 运动户外</span>
              </a>
            </li>
            <li>
              <a href="">
                <x-icon src="alert1" size="12"></x-icon>
                <span>服饰内衣 运动户外</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="zk-swiper">
      <template>
        <el-carousel arrow="never" height="332px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            <img src="" alt="">
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
    <div class="zk-advertising">
      <ul class="advertising-box">
        <li>
          <a href=""></a>
        </li>
        <li>
          <a href=""></a>
        </li>
        <li>
          <a href=""></a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>
    </div>
    <div class="zk-content">
      <div class="zk-title">
        <div class="title-big">
          <x-icon src="alert1" size="24"></x-icon>
          热卖推荐
        </div>
      </div>
      <div class="zk-product-list">
        <ul class="product-list_box">
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="zk-title">
        <div class="title-big">
          <x-icon src="alert1" size="24"></x-icon>
          热卖推荐
        </div>
      </div>
      <div class="zk-product-list">
        <ul class="product-list_box">
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
          <li>
            <a href="">
              <img class="product-img" src="http://lll.5ug.com/wwwroot/Uploads/image/20180511/6366164979607695801177721.jpg" alt="">
              <div class="product-price">
                ￥399.00
              </div>
              <div class="product-title">
                2018春夏女士倒三角
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="zk-foot">
      <div class="foot">
        <div class="foot-left">
          <ul>
            <li class="first">title</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <ul>
            <li class="first">title</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <ul>
            <li class="first">title</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <ul>
            <li class="first">title</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        <div class="foot-right">
          <img src="" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageInfo: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.pageInfo = await this.$themeApi.pageInfo(this.$client, this.$route.path)
        // console.info(this.$route.path, this.pageInfo)
      }
    }
  }
</script>
<style lang="less">
  @import '~_style/index.less';
  .zk-top-nav {
    width: 100%;
    height: 30px;
    border-top: 1px solid #b6b4b6;
    border-bottom: 1px solid #b6b4b6;
    .top-nav_box {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      .top-nav_left {
        ul.left_box {
          height: 100%;
          display: flex;
          align-items: center;
          li {
            position: relative;
            font-size: 12px;
            padding: 0 10px;
            color: #555;
          }
          li:after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 12px;
            background: #b6b4b6;
          }
          li:last-child:after {
            content: none;
          }
          .left_login,
          .left_reg {
            margin-left: 5px;
            font-size: 12px;
            color: #555;
          }
          .left_login:hover,
          .left_reg:hover {
            color: @brand;
            border-bottom: 1px solid @brand;
          }
        }
      }
      .top-nav_right {
        flex: 1;
        ul.right_box {
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          li {
            position: relative;
            a {
              font-size: 12px;
              padding: 0 10px;
              color: #555;
            }
          }
          li:last-child:after {
            content: none;
          }
          li:after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 12px;
            background: #b6b4b6;
          }
        }
      }
    }
  }
  .zk-header {
    width: 1200px;
    height: 120px;
    margin: 0 auto;
    display: flex;
    .header-logo {
      width: 190px;
      height: 100%;
      position: relative;
      a {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 190px;
        height: 50px;
        display: block;
      }
    }
    .header-search {
      width: 440px;
      padding-top: 40px;
      margin-left: 120px;
      margin-right: 10px;
      .search-input {
        width: 440px;
        height: 38px;
        margin: 0 auto;
        display: flex;
        input {
          padding: 10px;
          width: 340px;
          height: 38px;
          border: 2px solid @brand;
          outline: none;
        }
        button {
          width: 100px;
          height: 38px;
          background: @brand;
          color: #fff;
          font-size: 18px;
        }
      }
      .search-recommend {
        margin-top: 10px;
        width: 100%;
        ul.recommend-box {
          display: flex;
          width: 100%;
          overflow: hidden;
          li {
            margin-right: 10px;
            a {
              color: #000;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .zk-nav {
    width: 100%;
    height: 45px;
    background: @brand;
    .zk-nav_box {
      width: 1200px;
      margin: 0 auto;
      height: 45px;
      display: flex;
      position: relative;
    }
    .nav-left {
      width: 228px;
      height: 45px;
      background: rgba(0, 0, 0, 0.8);
      text-align: center;
      font-size: 16px;
      line-height: 45px;
      color: #fff;
    }
    .nav-left-popup {
      width: 228px;
      height: 332px;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      top: 45px;
      left: 0;
      z-index: 999;
      .left-popup_box {
        padding: 20px;
        li {
          margin-top: 15px;
          margin-bottom: 15px;
          a {
            color: #fff;
            font-size: 12px;
            span {
              margin-left: 10px;
            }
          }
        }
        li:hover {
          background: @brand;
        }
      }
    }
    .nav-right {
      background: @brand;
      flex: 1;
      .nav-right_box {
        display: flex;
        height: 45px;
        li {
          padding: 0 40px;
          a {
            font-size: 16px;
            color: #fff;
            line-height: 45px;
          }
        }
      }
    }
  }
  .zk-swiper {
    width: 100%;
    height: 332px;
  }
  .zk-advertising {
    width: 1200px;
    height: 140px;
    margin: 0 auto;
    border: 3px solid #b6b4b6;
    .advertising-box {
      display: flex;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        border-right: 1px solid #b6b6b6;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      li:last-child {
        border-right: none;
      }
    }
  }
  .zk-content {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    .zk-title {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid @brand;
      display: flex;
      align-items: center;
      .title-big {
        font-size: 24px;
        color: @brand;
        padding-left: 20px;
        font-weight: bold;
      }
      .title-little {
        margin-left: 40px;
      }
    }
    .zk-product-list {
      margin-top: 20px;
      min-height: 50px;
      .product-list_box {
        margin-left: 20px;
        li {
          transition: all 0.2s linear;
          float: left;
          width: 275px;
          margin-right: 20px;
          margin-bottom: 20px;
          border: 1px solid #e5e5e5;
          a {
            display: block;
            width: 275px;
            box-sizing: border-box;
            .product-img {
              width: 274px;
              height: 275px;
            }
            .product-price {
              margin: 5px 0;
              padding: 0 5px;
              color: @brand;
              font-size: 18px;
            }
            .product-title {
              padding: 0 5px;
              color: #000;
              font-size: 12px;
              margin-bottom: 10px;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
        }
        li:hover {
          box-shadow: 2px 5px 2px #888888;
        }
      }
      .product-list_box:after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }
  .zk-foot {
    border-top: 9px solid #e5e5e5;
    background: #fafafa;
    .foot {
      width: 1200px;
      margin: 0 auto;
      padding: 40px 10px;
      display: flex;
      .foot-left {
        flex: 1;
        display: flex;
        ul {
          width: 25%;
          padding-left: 20px;
          padding-right: 10px;
          position: relative;
          li {
            color: #555;
            font-size: 12px;
            margin-bottom: 10px;
          }
          li.first {
            font-size: 16px;
          }
        }
        ul:after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: #b6b4b6;
        }
      }
      .foot-right {
        width: 200px;
        height: 150px;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
