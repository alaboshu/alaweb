<template>
  <div class="zk-groupbuy" :style="styles" component-path="shop/zk-groupbuy">
    <div class="order_buy_product ">
      <div class="item-contnet">
        <ul>
          <li class="zkui-order-cart-item" v-for="(item,index) in viewModel" :key="index">
            <div class="order-cart-commodity">
              <div class="demo-content " style="height: 7.8rem;">
                <ul class="flex order-cart-commodity-box">
                  <li class="flex_one">
                    <div class="order-cart-commodit-into flex">
                      <div class="order-cart-commodity-into_left">
                        <router-link :to="showUrl+item.id">
                          <img :src="item.thumbnailUrl" alt="">
                        </router-link>
                      </div>
                      <div class="flex_one order-cart-commodity-into_right ">
                        <router-link :to="showUrl+item.id">
                          <p> {{item.name}}</p>
                        </router-link>
                        <span></span>
                        <div class="price-box">
                          <p class="price_now">￥{{item.displayPrice}}</p>
                          <div class="flex">
                            <span class="price_old flex_one "> ￥{{item.marketPrice}} </span>
                            <x-button :href="showUrl+item.id">去拼团</x-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { GROUPBUY_LIST_GET } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: ['widgetDataId'],
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}, // 可视化编辑样式
        showUrl: '/product/show/'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        let response = await this.$api.get(GROUPBUY_LIST_GET, this.widgetDataId)
        this.viewModel = response.result.productItems
        console.log('this.viewModel', this.viewModel)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-groupbuy {
  	.flex {
  		display: flex;
  	}
  	.flex_one {
  		flex: 1;
  	}
  	.order_buy_product {
  		.weui-cells {
  			margin-top: 0;
  		}
  	}
  	#index_scroll {
  		.mescroll-upwarp {
  			display: none;
  		}
  	}
  	.zkui-product-item__1 {
  		background: #ffffff;
  		ul::after {
  			content: '';
  			display: block;
  			clear: both;
  		}
  		ul {
  			padding-bottom: 10px;
  		}
  		li {
  			display: block;
  			float: left;
  			width: 47%;
  			// height: 20rem;
  			margin: 2% 0 0 2%;
  			padding-bottom: 0.3rem;
  			border-radius: 2px;
  			border: 1px solid rgba(229, 229, 229, 0.4);

  			dl {
  				a {
  					display: block;
  					img {
  						width: 100%;
  						display: block;
  					}
  				}

  				.itemTitle {
  					a {
  						display: block;
  						margin: 0.3rem 0.3rem 0.1rem 0.3rem;
  						word-break: break-all;
  						text-overflow: ellipsis;
  						display: -webkit-box;
  						-webkit-box-orient: vertical;
  						-webkit-line-clamp: 2;
  						overflow: hidden;
  						color: #000;
  						font-size: 14px;
  						height: 40px;
  					}
  				}
  				.itemPrice {
  					padding-left: 0.3rem;
  					div {
  						display: flex;
  						color: @brand;
  						margin-left: -0.2rem;
  						font-size: @h5-font-size;
  						flex-wrap: wrap;
  						span {
  							padding-left: 5px;
  							text-decoration: line-through;
  							color: #6c757d;
  							font-size: @h6-font-size;
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
  				.itembuy {
  					.weui-btn {
  						width: 50%;
  						background: @brand;
  						color: @white;
  						margin-right: 0;
  					}
  				}
  			}
  		}
  		li.yqp-item {
  			dl {
  				.itemPrice {
  					height: auto;
  					div {
  						height: 1.5rem;
  						font-size: @h5-font-size;
  					}
  				}
  			}
  		}
  	}
  	.item-contnet {
  		.weui-cells {
  			margin-top: 0;
  		}
  		.weui-cells_checkbox {
  			.cart_item-title {
  				padding: 0.3rem 0;
  			}
  		}
  		ul {
  			.zkui-order-cart-item {
  				border-bottom: 1px solid #e5e5e5;
  				padding-bottom: 0.5rem;
  				.order-cart-commodity {
  					height: 7.8rem;
  					.order-cart-commodit-into {
  						height: 100%;
  						.order-cart-commodity-into_left {
  							width: 6.5rem;
  							height: 6.5rem;
  							margin-top: 0.8rem;
  							margin-left: 10px;
  							img {
  								width: 100%;
  								height: 100%;
  							}
  						}
  						.order-cart-commodity-into_right {
  							margin-top: 0.8rem;
  							padding: 0 0.8rem;
  							position: relative;
  							p {
  								font-size: @h5-font-size;
  								color: #000;
  								font-family: Helvetica;
  								word-break: break-all;
  								text-overflow: ellipsis;
  								display: -webkit-box;
  								-webkit-box-orient: vertical;
  								-webkit-line-clamp: 2;
  								overflow: hidden;
  							}
  							span {
  								font-size: 0.8rem;
  								color: #adb5bd;
  								font-family: Helvetica;
  							}
  							div.price-box {
  								width: 95%;
  								position: absolute;
  								left: 10px;
  								bottom: 10px;
  								height: 2rem;
  								vertical-align: bottom;
  								align-items: flex-end;
  								p.price_now {
  									color: @danger;
  									font-size: @h5-font-size;
  									font-weight: bold;
  									font-family: Helvetica;
  								}
  								span.price_old {
  									padding-left: 5px;
  									text-decoration: line-through;
  									color: #adb5bd;
  									font-family: Helvetica;
  								}
  								.weui-btn {
  									width: 8rem;
  									height: 2rem;
  									line-height: 2rem;
  								}
  								span.price_num {
  									text-align: right;
  									color: #adb5bd;
  									padding-left: 10px;
  									font-family: Helvetica;
  									.vux-number-round {
  										height: 1.3rem;
  										div {
  											display: block;
  											.vux-number-selector-sub {
  												position: relative;
  												svg {
  													position: absolute;
  													top: 0;
  													left: 0;
  												}
  											}
  										}
  									}
  								}
  								.go-groupbuy-btn {
  									background: @brand;
  									color: #fff;
  								}
  							}
  						}
  					}
  				}
  			}
  		}
  	}
  }
</style>

