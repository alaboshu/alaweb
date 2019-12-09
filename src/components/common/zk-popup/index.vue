<template>
  <!-- <x-popup :elementData="widgetModel.value"></x-popup> -->
  <view class="zk-popup">
    <view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
    <view :class="['uni-popup','uni-popup-'+type]" v-show="show" :style="'min-height:'+height">
      <slot></slot>
    </view>
  </view>
</template>

<script>
 
  export default {
    
    data () {
      let offsetTop = 0
      // #ifdef H5
      offsetTop = 44
      // #endif
      return {
        widgetModel: '',
        offsetTop: offsetTop
      }
    },
    props: {
      widget: {},
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        // top - 顶部， middle - 居中, bottom - 底部
        default: 'bottom'
      },
      msg: {
        type: String,
        default: ''
      },
      top: {
        type: Number,
        default: 0
      },
      height: {
        default: '200px'
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      hide: function () {
        this.$emit('hidePopup')
      },
      async init () {
        // this.widgetModel = await this.$api.themeWidget(
        //   this.widget,
        //   editSetting
        // )
        if (this.top !== undefined) {
          this.offsetTop = this.top
        }
      }
    }
  }
</script>


<style lang="scss">
  @import "@/assets/style/variable.scss";

  .zk-popup {
    .uni-mask {
      position: fixed;
      z-index: 998;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .uni-popup {
      position: fixed;
      z-index: 999;
      background-color: #ffffff;
      box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
    }

    .uni-popup-middle {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 380upx;
      height: 380upx;
      border-radius: 10upx;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      justify-content: center;
      padding: 30upx;
    }

    .uni-popup-top {
      top: 0;
      left: 0;
      width: 100%;
      height: 100upx;
      line-height: 100upx;
    }

    .uni-popup-bottom {
      left: 0;
      bottom: 0;
      width: 100%;
      /* height: 100upx;
            line-height: 100upx; */
    }
  }
</style>
