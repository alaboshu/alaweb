<template>
  <div class="pages-test" v-if="asyncFlag">
    <div class="zkui-pc-productshow auto">
      <div class="productshow-top-box">
        <div class="top-box-left">
          <div class="clearfix">
            <div class="goods-info fl">
              <div class="info-box">
                <h1 class="goods-title">
                  {{productShow.name}}
                </h1>
                <div class="goods-prowrap goods-main">
                  <div class="clearfix main-box">
                    <dl class="clearfix property-box">
                      <dt class=" property-type">价格</dt>
                      <dd class="property-cont">
                        <span class="price">￥{{productShow.marketPrice}}</span>
                      </dd>
                    </dl>
                    <dl class="clearfix property-box">
                      <dt class=" property-type">促销价</dt>
                      <dd class="property-cont property-cont-now">
                        <span class="price">￥{{productShow.displayPrice}}</span>
                      </dd>
                      <dd class="property-extra">
                        <span class="mr10">评价：
                          <span class="num">
                            0 </span>
                        </span>
                        <span>累计销量：
                          <span class="num">
                            0 </span>
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div class="goods-prowrap" v-for="(par,num) in productShow.productExtensions.productCategory.salePropertys" :key="num">
                  <dl class="clearfix">
                    <dt>{{par.name}}</dt>
                    <dd>
                      <el-radio-group v-model="saleItems[num]" size="medium">
                        <el-radio-button v-for="sale in par.propertyValues" :key="sale.id" :label="sale" @click.native="ceshi">
                          {{sale.valueAlias}}
                        </el-radio-button>
                      </el-radio-group>
                    </dd>
                  </dl>
                </div>
                <div class="goods-prowrap">
                  <dl class="clearfix">
                    <dt>数量</dt>
                    <dd>
                      <el-input-number v-model="buyCount" :min="1" :max="10" label="描述文字"></el-input-number>
                    </dd>
                  </dl>
                </div>
                <div class="goods-buy">
                  <div to="" class="buy-btn buy-now" @click="buyProduct()">
                    立即购买
                  </div>
                  <div to="" class="buy-btn buy-cart" @click="addToCart()">
                    加入购物车
                  </div>
                </div>
                <div class="goods-prowrap">
                  <dl class="clearfix">
                    <dt>服务承诺</dt>
                    <dd>
                      <ul class="goods-list">
                        <li>
                          <i class="el-icon-edit"></i>
                          退货补运费
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                          72小时发货
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                          7天无理由退货
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                          全国包邮
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
                <div class="goods-prowrap">
                  <dl class="clearfix">
                    <dt>支付方式</dt>
                    <dd>
                      <ul class="goods-pay">
                        <li>
                          <i class="el-icon-edit"></i>
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                        </li>
                        <li>
                          <i class="el-icon-edit"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="goods-img fl">
              <el-carousel height="400px">
                <el-carousel-item v-for="(item,index) in productShow.productExtensions.productThums" :key="index">
                  <img :src="item.showCaseUrl" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="productshow-cneter-box">
        <div class="col-main">
          <div class="tabpanel">
            <div class="tabbar-box">
              <ul class="tabbar-list">
                <li :class="{'active':tabbarList==1}" @click="tabbarFirst()">
                  <router-link to="">
                    商品详情
                  </router-link>
                </li>

              </ul>
            </div>
            <div class="panel-box">
              <div class="particulars" v-if="tabbarList==1" v-html="productShow.detail.mobileIntro">
                <!-- <img v-for="(item,index) in productShow.productExtensions.productThums" :key="index" :src="item.showCaseUrl" alt=""> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-sidebar ">
          <h1 class="store-title">本店分类</h1>
          <div class="classify-list">
            <ul>
              <li v-for="(item,index) in productClass" :key="index">
                <router-link to="">
                  <i class="el-icon-edit"></i>{{item.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-extra ">
          <div class="module-cart">
            <router-link to="">
              <div class="cart-text">
                <i class="el-icon-edit"></i>
                热卖推荐
              </div>
            </router-link>
          </div>
          <div class="module-extranav">
            <div class="extranav-list">
              <ul>
                <li class="extranav-list_item" v-for="(item,index) in productList.productItems" :key="index">
                  <router-link :to="'/product/show'+item.id">
                    <img :src="item.thumbnailUrl" alt="">
                  </router-link>
                  <p>￥{{item.displayPrice}}</p>
                </li>
                <li class="extranav-list_item">
                </li>
                <li class="extranav-list_item">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  THEME_GETPAGE_GET
  import { PRODUCT_CLASS_GET, PRODUCT_SHOW_GET, PRODUCT_LIST_GET, CART_ADDCART_POST } from '@/service/api/apiUrl'
  export default {
    data () {
      return {
        pageInfo: '',
        asyncFlag: false,
        saleItems: [], // 商品规格
        num1: 1,
        tabbarList: 1,
        productClass: '',
        productShow: '',
        buyCount: 1,
        productList: ''
      }
    },
    mounted () {
      // window.addEventListener('scroll', this.handleScroll)
      this.init()
    },
    methods: {
      // handleScroll (e) {
      //   console.log(e)
      //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   console.log(scrollTop)
      // },
      async init () {
        this.$loading = true
        // this.pageInfo = await this.$api.get(THEME_GETPAGE_GET, 'clientType=' + this.$client + '&url=' + this.$route.path)
        // console.log('pageInfo', this.pageInfo)
        var productClass = await this.$api.get(PRODUCT_CLASS_GET)
        this.productClass = productClass
        var productShow = await this.$api.get(PRODUCT_SHOW_GET, 'id=' + this.$route.query.id)
        this.productShow = productShow
        for (var i = 0; i < this.productShow.productExtensions.productCategory.salePropertys.length; i++) {
          this.saleItems[i] = this.productShow.productExtensions.productCategory.salePropertys[i].propertyValues[0]
        }
        this.selectSku = this.productShow.productExtensions.productSkus[0]
        var productList = await this.$api.get(PRODUCT_LIST_GET)
        this.productList = productList
        this.$loading = false
        this.asyncFlag = true
        // console.info('测试一页面', this.pageInfo)
      },
      // 添加购物车
      async addToCart () {
        if (this.selectSku.id === undefined) {
          this.$message.error('请选择商品规格')
        } else {
          let params = {
            ProductSkuId: this.selectSku.id,
            productId: this.productShow.id,
            storeId: this.productShow.storeId,
            count: this.buyCount
          }
          console.log('ProductSkuId = ' + this.selectSku.id + ' & productId=' + this.productShow.id + ' & storeId=' + this.productShow.storeId + ' & count=' + this.buyCount)
          var response = await this.$api.post(CART_ADDCART_POST, params)
          console.log('response', response)
          if (response.data.status === 1) {
            this.$message({
              message: '加入购物车成功',
              type: 'success'
            })
          } else {
            this.$message.error('加入购物车失败')
          }
        }
      },
      // 购买商品
      async buyProduct () {
        if (this.selectSku.id === undefined) {
          this.$message.error('请选择商品规格')
        }
        if (this.buyCount < 1) {
          this.$message.error('购买数量不能小于1')
        }
        let buyProductInfo = [{
          ProductSkuId: this.selectSku.id,
          Count: this.buyCount,
          ProductId: this.productShow.id,
        storeId: this.productShow.storeId,
          LoginUserId: this.LoginUser().id
        }]
        this.showSale = false
        console.log('buyProductInfo', buyProductInfo)
        this.$router.push({
          name: 'order_buy',
          params: {
            buyInfo: buyProductInfo
          }
        })
      },
      getSku () {
        var specSn = ''
        this.saleItems.forEach(element => {
          specSn += element.id + '|'
        })
        var skus = this.productShow.productExtensions.productSkus
        var sku = ''
        for (var i = 0; i < skus.length; i++) {
          if (skus[i].specSn === specSn) {
            sku = skus[i]
          }
        }
        if (sku.id === undefined) {
          // this.$vux.toast.warn('请选择商品规格')
        }
        return sku
      },
      changSku () {
        this.selectSku = this.getSku()
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .pages-test {
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-carousel__arrow {
    i {
      font-size: 36px;
    }
  }
  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .auto {
    margin: 0 auto;
    width: 1200px;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix:after {
    content: '';
    display: table;
    clear: both;
  }
  .zkui-pc-productshow {
    .productshow-top-box {
      background-color: #fff;
      position: relative;
      overflow: hidden;
      margin: 30px 0;
      min-height: 500px;
      .top-box-left {
        position: relative;
        width: 1058px;
        background: #fff;
        z-index: 7;
        overflow: hidden;
        .goods-info {
          width: 100%;
          min-height: 530px;
          .info-box {
            padding: 0 90px 25px 431px;
            overflow: hidden;
            .goods-title {
              font-family: Microsoft YaHei, arial;
              color: #333;
              width: 100%;
              margin-bottom: 15px;
              font-size: 24px;
              line-height: 25px;
              font-weight: bold;
            }
            .goods-im {
              margin-top: 15px;
            }
            .goods-buy {
              padding: 5px 0 20px 60px;
              .buy-btn {
                display: inline-block;
                text-align: center;
                font: 20px Microsoft YaHei;
                color: #fff;
                background: #fff;
                height: 50px;
                line-height: 50px;
                width: 200px;
                cursor: pointer;
              }
              .buy-now {
                background: #ef2f23;
                height: 50px;
                line-height: 50px;
              }
              .buy-cart {
                color: #333;
                border: 1px solid #ddd;
              }
            }
          }
          .goods-main {
            border-bottom: 1px solid #f3f3f3;
            border-top: 1px solid #f3f3f3;
            background: #e9ecef;
            margin-bottom: 15px;
            dl {
              padding-bottom: 0 !important;
            }
            .property-box {
              position: relative;
              .property-type {
                height: 32px;
                line-height: 32px;
              }
              .property-cont {
                font-size: 14px;
                color: #999;
                height: 32px;
                line-height: 32px;
                text-decoration: line-through;
                span {
                  font-size: 14px;
                  color: #999;
                  height: 32px;
                  line-height: 32px;
                }
              }
              .property-cont-now {
                height: auto;
                margin-left: -6px;
                .price {
                  color: @brand;
                  font-size: 18px;
                  display: inline-block;
                  vertical-align: middle;
                  font-weight: 700;
                }
              }
              .property-extra {
                position: absolute;
                right: 0;
                bottom: 0;
                line-height: 32px;
                margin-right: 10px;
                color: #999;
                padding-left: 0;
                span {
                  font-size: 12px;
                }
                span.num {
                  color: #333;
                }
                .mr10 {
                  margin-right: 10px !important;
                }
              }
            }
          }
          .goods-list,
          .goods-pay {
            display: flex;
            li {
              margin-right: 15px;
              font-size: 13px;
              i {
                color: @brand;
                font-size: 13px;
              }
            }
          }
        }
        .goods-info .goods-prowrap dl {
          min-height: 20px;
          padding-left: 10px;
          padding-bottom: 15px;
          position: relative;
        }
        .goods-info .goods-prowrap dt {
          color: #999;
          float: left;
          font-size: 12px;
        }
        .goods-info .goods-prowrap dd {
          padding-left: 60px;
          font-size: 13px;
          .el-radio-button--medium .el-radio-button__inner {
            padding: 5px 10px;
          }
          .el-input-number__decrease,
          .el-input-number__increase {
            height: 30px;
            background: transparent;
          }
          .el-input__inner {
            height: 30px;
          }
          .el-input-number__increase,
          .el-input-number__decrease {
            i {
              font-size: 16px;
            }
          }
        }
        .goods-img {
          margin-left: -100%;
          width: 400px;
          min-height: 400px;
          border: 1px solid #e5e5e5;
          overflow: hidden;
        }
      }
      .top-box-right {
        position: absolute;
        left: 100%;
        top: 0;
        z-index: 6;
        overflow: hidden;
        border-left: 1px solid #eee;
        padding-left: 20px;
        margin-left: -140px;
        min-height: 500px;
        width: 140px;
        .goods-recommend {
          width: 100%;
          p.goods-recommend-title {
            // color: @tab-text-default-color;
            height: 14px;
            line-height: 14px;
            margin-bottom: 10px;
            width: 100%;
            position: relative;
            text-align: center;
            s {
              position: absolute;
              top: 7px;
              margin-left: -50%;
              width: 100%;
              height: 0;
              border-top: 1px solid #eee;
              text-decoration: none;
            }
            span {
              font-size: 16px;
              color: #999;
              text-align: center;
              width: 6em;
              top: 0;
              left: 50%;
              margin-left: -3em;
              background-color: #fff;
              position: absolute;
            }
          }
          .list-box {
            height: 500px;
            overflow: hidden;
            width: 120px;
            position: relative;
            ul {
              li {
                margin-bottom: 11px;
                a {
                  display: block;
                  width: 120px;
                  height: 120px;
                  overflow: hidden;
                }
                p {
                  font-size: 14px;
                  margin-top: 5px;
                  color: #000;
                  display: block;
                  width: 100%;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
    .productshow-cneter-box {
      position: relative;
      .col-main {
        width: 100%;
        min-height: 300px;
        padding-left: 220px;
        .tabpanel {
          width: 740px;

          min-height: 300px;
          border: 1px solid #e5e5e5;
          .tabbar-box {
            width: 100%;
            height: 58px;
            background: #f6f6f6;
            border-bottom: 1px solid #e5e5e5;
            ul.tabbar-list {
              li {
                float: left;
                width: 149px;
                height: 58px;
                border-right: 1px solid #e5e5e5;
                font-size: 0;
                a {
                  display: block;
                  border-top: 4px solid #f6f6f6;
                  line-height: 54px;
                  font-family: Microsoft YaHei\, arial;
                  font-size: 16px;
                  color: #333;
                  text-align: center;
                }
              }
              li.active a {
                border-top: 4px solid #ef2f23;
                border-bottom: 1px solid #fff;
                background: #fff;
              }
            }
          }
          .panel-box {
            width: 100%;
            padding-bottom: 20px;
            .particulars {
              p {
                img {
                  width: 100%;
                  height: auto;
                }
              }
            }
            .comment {
              overflow: hidden;
              padding-left: 19px;
              padding-right: 19px;
              .comment-title {
                overflow: hidden;
                padding: 40px 0 20px;
                h1 {
                  float: left;
                  line-height: 18px;
                  padding-bottom: 4px;
                  border-bottom: 1px solid #333;
                  color: #333;
                  font-size: 18px;
                  font-weight: @font-weight-bold;
                  font-family: Microsoft YaHei\, arial;
                }
              }
              .comment-content {
                .comment-content-title {
                  padding: 20px 0;
                  color: #333;
                  font-weight: 700;
                  font-size: 12px;
                }
                .content-item {
                  margin-bottom: 30px;
                  padding-left: 40px;
                  position: relative;
                  .face {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    img {
                      display: block;
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .info {
                    min-height: 100px;
                    padding-left: 20px;
                    .info-t {
                      margin-bottom: 4px;
                      .t-name {
                        font-size: 14px;
                        color: #333;
                        float: left;
                        margin-right: 5px;
                      }
                      .t-data {
                        color: #999;
                        float: right;
                        font-size: 14px;
                      }
                    }
                    .info-w {
                      word-break: break-all;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                      overflow: hidden;
                      font-size: 14px;
                      color: #666;
                      margin-bottom: 4px;
                      line-height: 18px;
                    }
                    .info-b {
                      ul {
                        display: flex;
                        li {
                          margin-right: 40px;
                          // color: @cell-value-color;
                          font-size: 13px;
                        }
                      }
                    }
                    .info-i {
                      margin-top: 7px;
                      ul {
                        display: flex;
                        li {
                          width: 100px;
                          height: auto;
                          margin-right: 10px;
                          padding-bottom: 10px;
                          img {
                            display: block;
                            width: 100%;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .col-sidebar {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        min-height: 300px;
        border: 1px solid #e5e5e5;
        .store-title {
          width: 100%;
          height: 58px;
          background: #f6f6f6;
          border-bottom: 1px solid #e5e5e5;
          line-height: 54px;
          font-family: Microsoft YaHei\, arial;
          font-size: 16px;
          color: #333;
          text-align: center;
        }
        .classify-list {
          margin: 20px 0 20px 20px;
          li {
            line-height: 14px;
            margin: -1px 0 16px;
            i {
              font-size: 14px;
              color: #666;
            }
            a {
              display: block;
              width: 155px;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              overflow: hidden;
              white-space: nowrap;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              color: #666;
            }
          }
        }
      }
      .col-extra {
        position: absolute;
        top: 0;
        right: 0;
        width: 240px;
        height: 300px;
        border-top: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        .module-cart {
          width: 100%;
          height: 60px;
          border-bottom: 1px solid #e5e5e5;
          a {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            .cart-text {
              width: 100%;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              text-align: center;
              color: #333;
              font-size: 20px;
              i {
                color: #333;
                font-size: 20px;
              }
            }
          }
        }
        .module-extranav {
          .extranav-list {
            width: 204px;
            margin: 15px 18px 0;
            min-height: 100px;
            ul {
              height: 600px;
              overflow: auto;
              li.extranav-list_item {
                margin-bottom: 11px;
                cursor: pointer;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                a {
                  display: inline-block;
                  width: 120px;
                  height: 120px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                p {
                  font-size: 14px;
                  margin-top: 5px;
                  color: #000000;
                  display: block;
                  width: 100%;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

