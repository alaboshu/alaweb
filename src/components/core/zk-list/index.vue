<template>
  <div class="zk-list" :style="styles" component-path="core/zk-list" v-if="asyncflag">
    <x-scroll>
      <div class="weui-panel weui-panel_access" v-for="item in viewModel" :key="item.id">
        <div class="weui-panel__bd">
          <a :href="item.url" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <router-link :to="item.url">
                <img :src="item.image" alt="" class="weui-media-box__thumb">
              </router-link>
            </div>
            <div class="weui-media-box__bd">
              <router-link :to="item.url">
                <h4 class="weui-media-box__title">
                  {{item.title}}</h4>
              </router-link>
              <p class="weui-media-box__desc">{{item.intro}}</p>
              <p class="weui-media-box__desc" style="text-align: right">{{item.extra}}</p>
            </div>
          </a>
        </div>
      </div>
    </x-scroll>
  </div>
</template>

<script>
  import { editSetting } from './property'
  export default {
    name: editSetting.key,
    props: {
      widget: {}
    },
    data () {
      return {
        viewModel: '',
        asyncflag: false,
        styles: {}
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        if (this.widget !== undefined) {
          if (this.widget.value !== undefined) {
            this.viewModel = this.widget.value
          } else {
            const parameter = {
              dataId: this.widget && this.widget.dataId,
              defaultId: '5b406cddfef00000a0000001'
            }
            this.viewModel = await this.$api.get(this.widget.apiUrl, parameter)
          }
        } else {
          console.error('错误:请传入widget数据!!')
        }
        this.asyncflag = true
        // console.info('zk-list数据',this.viewModel)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~_style/index.less';
  .zk-list {
  	font-size: @font-size-base;
  	.zk-not-data {
  		margin: 0 auto;
  		padding-top: 150 * @rem;
  		text-align: center;
  		svg {
  			width: 50 * @rem;
  			height: 50 * @rem;
  		}
  		p {
  			font-size: @h4-font-size;
  		}
  	}
  	.weui-panel:after {
  		border: none !important;
  	}
  	.mescroll-upwarp {
  		display: none !important;
  	}
  	.ZKList-Items {
  		.weui-media-box {
  			padding: 0.5rem;
  		}
  		.weui-media-box__hd {
  			margin: 10px auto;
  			.brand {
  				// width: 50 * @rem;
  				// height: 50 * @rem;
  				padding-top: 0.1rem;
  				border-radius: 50%;
  			}
  		}

  		.weui-media-box__title {
  			// color: @black;
  		}
  		.weui-media-box__bd {
  			padding-left: 0.1rem;
  		}
  		.weui-media-box__desc {
  			padding-top: 0.3rem;
  			font-size: @h6-font-size;
  			word-break: break-all;
  			text-overflow: ellipsis;
  			display: -webkit-box;
  			-webkit-box-orient: vertical;
  			-webkit-line-clamp: 2;
  			overflow: hidden;
  		}
  		.weui-media-box__title__extra {
  			font-size: @h5-font-size;
  			font-weight: bold;
  			float: right;
  		}
  	}
  }
</style>

