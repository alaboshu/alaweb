<template>
  <div class="zkweb-e-tab-swiper">
    <div class="page">
      <div class="page__bd">
        <div class="weui-tab">
          <div class="weui-navbar">
            <block v-for="(item,index) in viewModel.result" :key="index">
              <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
                <div class="weui-navbar__title">{{item.name}}</div>
              </div>
            </block>
            <!-- <div class="weui-navbar__slider" :class="navbarSliderClass"></div> -->
          </div>
          <div class="weui-tab__panel">
            <div class="weui-tab__content" v-for="(items,indexs) in viewModel.result" :key="indexs" :hidden="activeIndex != indexs">
              <div class="weui-tab__content_title">
                {{items.name}}
              </div>
              <div class="weui-tab__content_grid">
                <!-- <x-grid :gWidth=3></x-grid> -->
                <div class="weui-grids">
                  <div class="page__bd">
                    <div class="weui-grids">
                      <block v-for="(t,i) in items.childClass" :key="i">
                        <a url="" class="weui-grid" hover-class="weui-grid_active" style="'width:33.3'%'">
                          <image class="weui-grid__icon" :src="t.icon" />
                          <div class="weui-grid__label">{{t.name}}</div>
                        </a>
                      </block>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="weui-tab__content" :hidden="activeIndex != 1">
              <div class="weui-tab__content_title">
                选项二
              </div>
              <div class="weui-tab__content_grid">
                <x-grid :gWidth=3></x-grid>
              </div>
            </div>
            <div class="weui-tab__content" :hidden="activeIndex != 2">
              <div class="weui-tab__content_title">
                选项三
              </div>
              <div class="weui-tab__content_grid">
                <x-grid :gWidth=3></x-grid>
              </div>
            </div> -->
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
        tabs: ['选项一', '选项二', '选项三'],
        activeIndex: 0,
        fontSize: 30,
        viewModel: '', // 数据模型
        styles: {} // 可视化编辑样式
      }
    },
    props: {
      color: String,
      isDot: Boolean
    },
    computed: {
      navbarSliderClass () {
        if (this.activeIndex === '0') {
          return 'weui-navbar__slider_0'
        }
        if (this.activeIndex === '1') {
          return 'weui-navbar__slider_1'
        }
        if (this.activeIndex === '2') {
          return 'weui-navbar__slider_2'
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async  init () {
        this.viewModel = await this.$api.get(PRODUCT_CLASS_GET)
        console.log('this.viewModel', this.viewModel)
      },
      tabClick (e) {
        console.log(e)
        this.activeIndex = e.currentTarget.id
      }
    }
  }
</script>

<style lang="less">
  @import '~_style/index.less';
  .zkweb-e-tab-swiper {
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 112rpx;
    page,
    .page,
    .page__bd {
      height: 100%;
    }
    .page__bd {
      padding-bottom: 0;
    }
    .weui-tab__content {
      padding-top: 60px;
      text-align: center;
    }
    .weui-navbar__slider_0 {
      left: 29rpx;
      transform: translateX(0);
    }
    .weui-navbar__slider_1 {
      left: 29rpx;
      transform: translateX(250rpx);
    }
    .weui-navbar__slider_2 {
      left: 29rpx;
      transform: translateX(500rpx);
    }
    .weui-tab {
      display: flex;
    }
    .weui-navbar {
      display: block;
      position: static;
      width: 20%;
      // border-top: 1rpx solid #e5e5e5;
      height: 100%;
      background: #efeff4;
      overflow: auto;
      padding-bottom: 56px;
    }
    .weui-tab__panel {
      flex: 1;
    }
    .weui-tab__content {
      padding-top: 0;
      .weui-tab__content_title {
        height: 46px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 45px;
        text-align: left;
        padding-left: 30px;
      }
    }
    .weui-navbar__item {
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #e5e5e5;
    }
    .weui-bar__item_on {
      color: @brand;
      background: #fff;
    }
    .weui-tab__content_grid {
      padding-top: 10px;
    }
    .weui-grid__icon {
      width: 40px;
      height: 40px;
    }
  }
</style>
