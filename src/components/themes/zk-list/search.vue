<template>
  <div class="list-search" v-if="async">
    <view class="header">
      <!-- <view>
        <x-icon name="zk-return" size="20" color="#666"></x-icon>
      </view> -->
      <view class="input-view" style="margin:0 5px">
        <view><input confirm-type="search" @confirm="confirm" type="text" placeholder="输入搜索关键词" /></view>
      </view>
      <view @click="show('right')">
        <x-icon name="icon-zk-classify" size="20" color="#666"></x-icon>
      </view>
    </view>
    <view class="drawer_content">
      <view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':showRigth,'uni-drawer-right':true}" :style="'top:'+fixedTop+'px;height:'+windowHeight+'px'">
        <view v-if="true" class="uni-drawer-mask" @tap="closeDrawer('right')"></view>
        <view class="uni-drawer-content">
          <view class="container_all_box">
            <scroll-view :scroll-top="scrollTop" scroll-y="true" class="all_b" :style="'height:'+windowHeight+'px'" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
              <div v-for="(opt,optIndex) in widget.searchOptions.advancedForms" :key="optIndex" class="search-item">
                <h2 v-if="opt.label!=='序号'">{{opt.label}}</h2>
                <view class="list_content">
                  <view class="content_b">
                    <div v-if="opt.type==='TextBox'" class="input_t">
                      <input type="text" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop]" />
                    </div>
                    <div v-if="opt.type==='NumberRang'" class="input_t">
                      <div class="t-input">
                        <input class="uni-input" type="number" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop+'_Start']" />
                      </div>
                      <div class="t-icon">
                        <x-icon name=" icon-zk-minus" size="18"></x-icon>
                      </div>
                      <div class="t-input">
                        <input class="uni-input" type="number" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop+'_End']" />
                      </div>
                    </div>
                    <div v-if="opt.type==='DropdownList'" style="width:100%;">
                      <x-radio v-model="searchPar[opt.prop]" :modelValue="opt.modelValue"></x-radio>
                    </div>
                    <div v-if="opt.type==='DateTimeRang'" style="width:100%;">
                      <x-tiem-picker v-model="searchPar[opt.prop]"></x-tiem-picker>
                    </div>
                  </view>
                </view>
              </div>

            </scroll-view>
            <!-- <view class="all_b" style="overflow:auto;" :style="'height:'+windowHeight+'px'">
              <div v-for="(opt,optIndex) in widget.searchOptions.advancedForms" :key="optIndex" class="search-item">
                <h2>{{opt.label}}</h2>
                <view class="list_content">
                  <view class="content_b">
                    <div v-if="opt.type==='TextBox'" class="input_t">
                      <input type="text" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop]" />
                    </div>
                    <div v-if="opt.type==='NumberRang'" class="input_t">
                      <div class="t-input">
                        <input class="uni-input" type="number" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop+'_Start']" />
                      </div>
                      <div class="t-icon">
                        <x-icon name=" icon-zk-minus" size="18"></x-icon>
                      </div>
                      <div class="t-input">
                        <input class="uni-input" type="number" :placeholder="'请输入'+opt.label" v-model="searchPar[opt.prop+'_End']" />
                      </div>
                    </div>
                    <div v-if="opt.type==='DropdownList'" style="width:100%;">
                      <x-radio v-model="searchPar[opt.prop]" :modelValue="opt.modelValue"></x-radio>
                    </div>
                    <div v-if="opt.type==='DateTimeRang'" style="width:100%;">
                      <x-tiem-picker v-model="searchPar[opt.prop]"></x-tiem-picker>
                    </div>
                  </view>
                </view>
              </div>

            </view> -->
          </view>
          <div class="content_bottom-pla"></div>
          <view class="content_bottom">
            <!-- <span>重置</span> -->
            <span @click="sumbit">确定</span>
          </view>
        </view>
      </view>
      <view>
      </view>
    </view>
  </div>
</template>

<script>
  import UniDrawer from './uni-drawer.vue'
  import uniIcon from '../../order/zk-order-rate/stars/uni-icon.vue'
  export default {
    data () {
      // let searchPar = {}
      return {
        async: false,
        viewModel: {},
        windowHeight: 0,
        showRigth: false,
        searchPar: {},
        catchtouchmove: false,
        scrollTop: 0,
        txt: 'aaaaaaaa',
        fixedTop: 44
      }
    },
    props: {
      widget: {}
    },
    components: {
      UniDrawer,

      uniIcon
    },
    created () {
      // #ifdef MP-WEIXIN
      this.catchtouchmove = true
      // #endif
    },
    mounted () {
      this.init()
    },
    methods: {
      upper: function (e) {
      },
      lower: function (e) {
      },
      scroll: function (e) {
      },
      async init () {
        this.windowHeight = this.$api.getSystemInfoSync().windowHeight - 44
        this.async = true
      },
      sumbit () {
        // this.showRigth = false
        // this.$emit('searchPar', this.searchPar)
      },
      show (e) {
        if (e === 'left') {
          this.showLeft = true
        } else {
          this.showRigth = true
        }
      },
      hide () {
        this.showLeft = false
        this.showRigth = false
      },
      closeDrawer (e) {
        if (e === 'left') {
          this.showLeft = false
        } else {
          this.showRigth = false
        }
      }
    },
    onNavigationBarButtonTap (e) {
      this.showRigth = !this.showRigth
    }
  }
</script>

<style lang="scss"  >
  .scroll-Y {
    height: 300upx;
  }

  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
  }

  .scroll-view-item {
    height: 300upx;
    line-height: 300upx;
    text-align: center;
    font-size: 36upx;
  }

  .scroll-view-item_H {
    display: inline-block;
    width: 100%;
    height: 300upx;
    line-height: 300upx;
    text-align: center;
    font-size: 36upx;
  }

  .list-search {
    view {
      font-size: 28upx;
      line-height: inherit;
    }

    .example {
      padding: 0 30upx 30upx;
    }

    .example-title {
      font-size: 32upx;
      line-height: 32upx;
      color: #777;
      margin: 40upx 25upx;
      position: relative;
    }

    .example .example-title {
      margin: 40upx 0;
    }

    .example-body {
      padding: 0 40upx;
    }

    .header {
      display: flex;
      flex-direction: row;
      padding: 10px 15px;
      align-items: center;
    }

    .input-view {
      display: flex;
      align-items: center;
      flex-direction: row;
      background-color: #e7e7e7;
      height: 30px;
      border-radius: 15px;
      padding: 0 10px;
      flex: 1;
    }

    .uni-padding-wrap {
      padding: 0 15px;
      line-height: 1.8;
    }

    .input {
      flex: 1;
      padding: 0 5px;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
    }

    .close {
      padding: 30upx;
    }
    .drawer_content {
      .container_all_box {
        width: 100%;
        overflow: auto;
        // padding-bottom: 44px;
      }
      .all_b {
        width: 100%;
        // box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
        // overflow: auto;
        .search-item {
          padding: 0 0.5rem;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 14px;
        }
      }
      .list_content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .content_b {
          width: 100%;
          .input_t {
            width: 100%;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            justify-content: center;
            .t-input {
              flex: 1;
              padding: 0 5px;
            }
            .t-icon {
              width: 30px;
              height: 30px;
            }
          }
          .uni-list-cell {
            display: flex;
            justify-content: center;
            .uni-input {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        span {
          display: block;
          width: 28%;
          height: 26px;
          line-height: 26px;
          background: #f7f7f7;
          color: #666;
          margin-right: 10px;
          margin-top: 10px;
          border-radius: 20px;
          text-align: center;
          font-size: 13px;
          &.active {
            display: block;
            color: #e93b3d;
            border: 1px solid #e93b3d;
            background: #fdf0f0;
          }
        }
      }
      .price_content {
        display: flex;
        input {
          background: #f7f7f7;
          border-radius: 20px;
          // margin: 0 10px;
          overflow: hidden;
          text-align: center;
          width: 88%;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
        }
      }
      .type_all {
        padding: 20px;
        margin-top: 10px;
        box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
        h2 {
          font-size: 14px;
        }
      }
    }
    .content_bottom-pla {
      height: 44px;
    }
    .content_bottom {
      position: fixed;
      bottom: 0;
      display: flex;
      height: 44px;
      line-height: 44px;
      display: flex;
      border-top: 1px solid #e5e5e5;
      justify-content: space-between;
      width: 100%;
      z-index: 999;

      span {
        display: block;
        height: 44px;
        line-height: 44px;
        text-align: center;
        width: 100%;
        // background: #fff;
        background: #c81432;
        color: #fff;
      }
      span:nth-of-type(2) {
      }
    }
    .content {
      width: 100%;
      display: flex;
    }

    .uni-list-cell-pd {
      padding: 0;
    }
  }
  .uni-drawer {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    visibility: hidden;
    z-index: 998;
    height: 100%;
  }

  .uni-drawer > .uni-drawer-mask {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .uni-drawer > .uni-drawer-content {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 61.8%;
    height: 100%;
    background: #ffffff;
    transition: all 0.3s ease-out;
    transform: translatex(-100%);
  }

  .uni-drawer.uni-drawer-right > .uni-drawer-content {
    left: auto;
    right: 0;
    transform: translatex(100%);
  }

  .uni-drawer.uni-drawer-visible {
    visibility: visible;
  }

  .uni-drawer.uni-drawer-visible > .uni-drawer-mask {
    display: block;
  }

  .uni-drawer.uni-drawer-visible > .uni-drawer-content {
    transform: translatex(0);
  }
</style>


