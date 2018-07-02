<template>
  <div class="zk-product-item" :style="styles">
    <div class="zkui-product-item__1">
      <ul class="item-box">
        <li class="item">
          <dl class="content">
            <dt>
              <router-link to="" class="content-img-box">
                <img src="http://zqingchun.yiqipingou.com//wwwroot/Uploads/Product/2018/06/e2f9dc3cbfbc43c096d84dc158f7fec7.jpg_320X320.jpg" class="cimg">
              </router-link>
            </dt>
            <dd class="itemTitle">
              <router-link to="" class="titme-test">
                杨雨
              </router-link>
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
  import { DIY_GETLINK } from '@/service/api/apiUrl' // 引入Api接口常量
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        const para = {
          diyKey: 'grid_index'
        }
        this.viewModel = await this.$api.get(DIY_GETLINK, para)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zk-product-item {
  	font-size: @font-size-base;
  	.zkui-product-item__1 {
  		background: #ffffff;
  		.item-box::after {
  			content: '';
  			display: block;
  			clear: both;
  		}
  		.item-box {
  			padding-bottom: 10px;
  			list-style: none;
  		}
  		.item {
  			display: block;
  			float: left;
  			width: 47%;
  			// height: 20rem;
  			margin: 2% 0 0 2%;
  			padding-bottom: 10rem;
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
  						word-break: break-all;
  						text-overflow: ellipsis;
  						display: -webkit-box;
  						-webkit-box-orient: vertical;
  						-webkit-line-clamp: 2;
  						overflow: hidden;
  						color: #000;
  						font-size: 1rem;
  						height: 40px;
  					}
  				}
  				.itemPrice {
  					padding-left: 10px;
  					height: 3rem;
  					.price-box {
  						display: flex;
  						color: #000;
  						height: 50px;
  						font-size: @h6-font-size;
  						flex-wrap: wrap;
  						.price-old {
  							padding-left: 5px;
  							text-decoration: line-through;
  							color: @metal;
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
  			}
  		}
  	}
  }
</style>

