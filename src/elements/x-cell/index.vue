<template>
  <view v-if="async">
    <view class="x-cell_uni-list" v-if="isArray">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="onClick(item.link.url)" v-for="(item,index) in viewModel" :key="index">
        <view class="uni-list-cell-navigate" :class="{'uni-navigate-right':item.link.url!==''}">
          <view class="uni-navigate-left conter_ly">
            <view class="box1">
              <x-icon :src="item.icon.name" :name="item.icon.name" :size="16"></x-icon>
            </view>
            <view class="box2">{{item.link.name}}</view>
            <view v-if="item.remark" class="remark">{{item.remark}}</view>
          </view>
        </view>
        <view v-if="item.switch" class="switch"></view>
      </view>
    </view>
    <view class="x-cell_uni-list" v-if="!isArray">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="onClick(link)">
        <view class="uni-list-cell-navigate" :class="{'uni-navigate-right':isLink}">
          <view class="uni-navigate-left">
            {{icon}}
            <x-icon :name="icon" v-if="icon" :size="16"></x-icon>
            {{title}}
          </view>
          <view class="uni-navigate-value">{{value}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'x-cell',
    props: {
      widget: {},
      icon: {},
      elementData: {},
      value: {},
      title: {},
      XClass: {},
      isLink: {
        type: Boolean,
        default: false
      },
      link: {}
    },
    data () {
      return {
        async: false,
        viewModel: '',
        isArray: false,
        delestu: false
      }
    },
    onLoad () {
      this.init()
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.async = false
        if (this.elementData !== undefined) {
          this.isArray = true
          this.viewModel = this.elementData
        }
        this.async = true
      },
      onClick (url) {
        this.$emit('click')
        if (url !== undefined) {
          this.$base.to(url)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";
  .x-cell_uni-list {
    .uni-list-cell {
      display: block !important;
    }
  }

  .h5-x-cell {
    font-size: $gl-size-base;
  }
  .wewui_isArray {
    margin-top: 15px;
  }
  .wewui_padding {
    padding: 5px 15px !important;
  }
  .weui-cell_title {
    font-size: $gl-h4-size;
    font-weight: $gl-h1-weight;
    color: $gl-brand;
    margin-left: -10px;
    opacity: 0.7;
  }
  .weui-cell_cont {
    margin-left: 8px;
  }
  .tuchunone::before {
    border-top: none;
  }
  .weui-cell {
    padding: 12px 15px;
  }
  .bianwith {
    width: 70%;
  }
  .zklogincolor {
    color: $gl-themeColor;
    font-size: 18px !important;
    font-weight: 600;
    margin: 0px;
  }
  .zklogpadding {
    padding: 14px 15px;
  }
  .xqingstyle {
    width: 4rem;
  }
  .withestyle {
    width: 18rem;
    text-align: left;
  }
  .weui-cell__bd_p {
    font-size: 12px;
    margin: 0px;
  }
  .weui-cell__ft {
    font-size: 12px;
  }
  .zhuimama::before {
    border-top: none;
  }
  .zhuimama::after {
    left: 15px;
  }
  .tuichu {
    margin-bottom: 15px;
  }
  .uni-navigate-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 12px;
    color: #606266;
    padding-left: 10px;
  }
  .uni-list-cell-navigate {
    padding: 10px 15px;
  }
  .uni-list-cell::after {
    left: 15px;
  }
  .uni-view {
    line-height: 0px !important;
  }
  .conter_ly {
    display: flex;
    align-items: center;
  }
  .box2 {
    flex: 1;
    margin-left: 10px;
    margin-top: 2px;
  }
  .switch {
    width: 97%;
    height: 10px;
    padding-left: 10px;
    border-top: 1px solid #eee;
    margin-left: 14px;
    margin-top: -10px;
  }
  .remark {
    margin-left: 100px;
    position: absolute;
    right: 30px;
    color: #888;
  }
  .zk-cell_box:nth-of-type(1) {
    display: none !important;
  }
</style>
