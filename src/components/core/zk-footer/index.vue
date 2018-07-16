<template>
  <div class="zk-footer" :style="styles">
    <div class="zkweb-footer">
      <div class="zkweb-tabbar">
        <a href="" class="tabbar__item">
          <span style="display: inline-block; position: relative;">
            <img src="" alt="" class="tabbar__icon">
          </span>
          <p class="tabbar__label">
            微信
          </p>
        </a>
        <a href="" class="tabbar__item">
          <span style="display: inline-block; position: relative;">
            <img src="" alt="" class="tabbar__icon">
          </span>
          <p class="tabbar__label">
            微信
          </p>
        </a>
        <a href="" class="tabbar__item">
          <span style="display: inline-block; position: relative;">
            <img src="" alt="" class="tabbar__icon">
          </span>
          <p class="tabbar__label">
            微信
          </p>
        </a>
        <a href="" class="tabbar__item">
          <span style="display: inline-block; position: relative;">
            <img src="" alt="" class="tabbar__icon">
          </span>
          <p class="tabbar__label">
            微信
          </p>
        </a>
      </div>
      <div class="footer-placeholder " :style="'height:'+placeholderHeight+'px'"></div>
    </div>
  </div>
</template>

<script>
  import { DIY_GETLINK_GET } from '@/service/api/apiUrl'
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    props: {
      placeholderHeight: {
        type: Number,
        default: 56
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
        this.viewModel = await this.$api.get(DIY_GETLINK_GET, para)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zkweb-footer {
  	font-size: 123px;
  	.zkweb-tabbar {
  		position: fixed;
  		bottom: 0;
  		left: 0;
  		z-index: 500;
  		width: 100%;
  		background-color: #f7f7fa;
  		display: flex;
  		.tabbar__item {
  			display: block;
  			flex: 1;
  			padding: 5px 0 0;
  			font-size: 0;
  			color: #999999;
  			text-align: center;
  			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  			.tabbar__icon {
  				display: inline-block;
  				width: 27px;
  				height: 27px;
  			}
  			.tabbar__label {
  				text-align: center;
  				color: #999999;
  				font-size: 14px;
  				line-height: 1.8;
  			}
  		}
  	}
  	.zkweb-tabbar:before {
  		content: ' ';
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		height: 1px;
  		border-top: 1px solid #c0bfc4;
  		color: #c0bfc4;
  		transform-origin: 0 0;
  		transform: scaleY(0.5);
  	}
  }
</style>

