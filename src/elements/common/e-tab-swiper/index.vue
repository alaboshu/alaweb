<template>
  <div class="zkweb-e-tab-swiper">
    <x-searchbar></x-searchbar>
    <div class="zkweb-class-box">
      <div class="class-left">
        <x-navbar v-model="navbar_selected" active-color="red">
          <x-navbar-item v-for="(item,index) in viewModel.result " :key="index" :id="item.id">
            <div @click="bindingId(item.id)">{{item.name}}</div>
          </x-navbar-item>
          <!-- <x-navbar-item id="navbar2_item2">选项2</x-navbar-item>
          <x-navbar-item id="navbar2_item3">选项3</x-navbar-item> -->
        </x-navbar>
      </div>
      <div class="class-right">
        <div class="class-right-item" v-for="(item,index) in viewModel.result " :key="index" v-if="navbar_selected===item.id">
          <div class="class-right-title">
            {{item.name}}
          </div>
          <div class="class=right-content">
            <div class="weui-grids">
              <a href="item.url" class="weui-grid" v-for="(t,i) in item.childClass " :key="i">
                <div class="weui-grid__icon">
                  <x-icon :src="t.icon"></x-icon>
                  <!-- <img :scr="t.icon"> -->
                </div>
                <p class="weui-grid__label">{{t.name}}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PRODUCT_CLASS_GET } from '@/service/api/apiUrl'
  export default {
    name: 'e-tab-swiper',
    data () {
      return {
        viewModel: '', // 数据模型
        styles: {}, // 可视化编辑样式
        navbar_selected: '',
        selectId: ''
      }
    },
    props: {
      color: String,
      isDot: Boolean
    },
    mounted () {
      this.init()
    },
    methods: {
      bindingId (sid) {
        this.selectId = sid
      },
      async  init () {
        this.viewModel = await this.$api.get(PRODUCT_CLASS_GET)
        this.navbar_selected = this.viewModel.result[0].id
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less'; // 颜色、边框、大小请使用assets/style/variable.less 和theme.less中的变量
  .zkweb-e-tab-swiper {
  	height: 100vh;
  	padding-bottom: 65px;
  	display: flex;
  	flex-direction: column;
  	.zkweb-class-box {
  		flex: 1;
  		display: flex;
  		.class-left {
  			width: 20%;
  			.wv-navbar {
  				display: block;
  				background: #efeff4;
  				overflow: auto;
  				height: 100%;
  				.wv-navbar__item {
  					padding: 0;
  					text-align: center;
  					height: 45px;
  					line-height: 45px;
  					border-bottom: 1px solid #e5e5e5 !important;
  				}
  			}
  		}
  		.class-right {
  			flex: 1;
  			.class-right-title {
  				height: 45px;
  				line-height: 45px;
  				padding-left: 20px;
  				border-bottom: 1px solid #e5e5e5;
  			}
  		}
  	}
  	.weui-grid {
  		text-decoration: none;
  		color: @brand;
  		width: 33.3333333%;
  		padding: 10px 10px;
  		.weui-grid__icon {
  			margin: 0 auto;
  		}
  	}
  	.weui-cell:visited {
  		color: #000;
  	}
  	.weui-grid__label {
  		text-decoration: none;
  		color: #000;
  	}
  }
</style>
