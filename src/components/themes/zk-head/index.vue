<template>
  <view class="zk-head">
    <view class="h5" v-if="h5Show && showHead">
      <view class="zk-head-show-h5">
        <view class="icon" @click="$api.back()" v-if="isShowBack">
          <x-icon name="icon-black" size="18" class="show-icon" color="#fff"></x-icon>
        </view>
        <view class="test">{{title}}</view>
      </view>
    </view>
    <view class="wx" v-if="wxShow">
      <view class="wx-show" v-if="showHead">
        <view class="zk-head-show-wx">
          <view class="icon" @click="$api.back()" v-if="isShowBack">
            <x-icon name="icon-black" size="14" class="show-icon" color="#fff"></x-icon>
          </view>
          <view class="test">{{title}}</view>
        </view>
      </view>
      <view v-else class="wx-show-2"></view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {},
      widget: {},
      showHead: {
        default: true
      } // 是否显示头部， 默认为显示
    },
    data () {
      return {
        h5Show: false,
        wxShow: false,
        isShowBack: true // 是否显示返回按钮
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        // WeChatLite
        this.isBack()
        if (this.$api.client() === 'WapH5') {
          this.h5Show = true
        } else if (this.$api.client() === 'WeChatLite') {
          this.wxShow = true
        }
      },
      // 判断是否显示返回按钮
      isBack () {
        console.info('widget', this.widget)
        if (this.widget.url.indexOf('/tabbar') > -1) {
          this.isShowBack = false
        }
      }
    }
  }
</script>



<style lang="scss" scoped>
  .zk-head {
    .h5 {
      width: 100%;
      height: 40px;
      position: relative;
      .zk-head-show-h5 {
        position: fixed;
        top: 0;
        left: 0;
        height: 40px;
        width: 100%;
        z-index: 9999999;
        background: #c70f2c;
        .test {
          text-align: center;
          line-height: 40px;
          color: #ffffff;
          font-size: 16px;
        }
        .icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translate(0, -50%);
          width: 20px;
          height: 20px;
          .show-icon {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .wx {
      .wx-show {
        width: 100%;
        height: 65px;
        position: relative;
        .zk-head-show-wx {
          width: 100%;
          height: 65px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          padding-bottom: 3px;

          z-index: 9999999;
          background: #c70f2c;
          display: flex;
          align-items: flex-end;
          .icon {
            width: 20px;
            height: 25px;
            margin-left: 10px;
            .show-icon {
              width: 100%;
              height: 100%;
            }
          }
          .test {
            color: #ffffff;
            font-size: 14px;
            height: 25px;
            line-height: 25px;
          }
        }
      }
      .wx-show-2 {
        width: 100%;
        height: 30px;
        background: #c70f2c;
      }
    }
  }
</style>
