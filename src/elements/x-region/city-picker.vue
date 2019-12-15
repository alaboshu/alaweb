<template>
  <div>
    <div @click="show" v-if="showMessage" class="city-picker-cell">
      <div class="picker-title">
        {{ title }}
      </div>
      <div class="city-text">
        {{ cityText }}
      </div>
    </div>
    <div class="mpvue-picker">
      <div :class="{ pickerMask: showPicker }" @click="pickerCancel" catchtouchmove="true"></div>
      <div class="mpvue-picker-content " :class="{ 'mpvue-picker-view-show': showPicker }">
        <div class="mpvue-picker__hd" catchtouchmove="true">
          <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
          <div class="mpvue-picker__action" :style="{ color: themeColor }" @click="pickerConfirm">
            确定
          </div>
        </div>
        <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
          <block>
            <picker-view-column>
              <div class="picker-item" v-for="(item, index) in provinceDataList" :key="index">
                {{ item.label }}
              </div>
            </picker-view-column>
            <picker-view-column>
              <div class="picker-item" v-for="(item, index) in cityDataList" :key="index">
                {{ item.label }}
              </div>
            </picker-view-column>
            <picker-view-column>
              <div class="picker-item" v-for="(item, index) in areaDataList" :key="index">
                {{ item.label }}
              </div>
            </picker-view-column>
          </block>
        </picker-view>
      </div>
    </div>
  </div>
</template>

<script>
  import service from './service'
  export default {
    data () {
      return {
        pickerValue: this.value,
        provinceDataList: [], // 全国省份列表
        cityDataList: [], // 当前省份中的城市列表
        areaDataList: [], // 当前城市的区域列表
        showPicker: false, // 是否显示控件
        addressModel: {}, // 存储系列化后的地址列表
        cityText: ''
      }
    },
    created () {
      this.init()
    },
    props: {
      /* 默认值 */
      pickerValueDefault: {
        type: Array,
        default () {
          return [0, 0, 0]
        }
      },
      title: {
        // default: '区域选择'
      },
      value: {
        default () {
          return [0, 0, 0]
        }
      },
      /* 主题色 */
      themeColor: String,
      showMessage: {
        default: false
      },
      model: {}
    },
    watch: {
      pickerValueDefault () {
        this.init()
      },
      pickerValue (val) {
        this.$emit('input', val)
      }
    },
    mounted () { },
    methods: {
      // 初始化
      async init () {
        service.initAddress(this)
      },
      // 控制显示隐藏
      show () {
        this.showPicker = !this.showPicker
      },
      // 取消按钮
      pickerCancel () {
        this.showPicker = false
        service._$emit(this, 'onCancel')
      },
      // 点击确认按钮
      pickerConfirm (e) {
        this.cityText =
          this.provinceDataList[this.pickerValue[0]].label +
          ' ' +
          this.cityDataList[this.pickerValue[1]].label +
          ' ' +
          this.areaDataList[this.pickerValue[2]].label
        this.showPicker = false
        service._$emit(this, 'onConfirm', e)
      },
      showPickerView () {
        this.showPicker = true
      },
      pickerChange (e) {
        service.pickerChange(this, e)
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/variable.scss";

  .city-picker-cell {
    display: flex;
    align-items: center;
    .city-text {
      flex: 1;
      text-align: right;
      color: $gl-text3;
    }
  }
  .pickerMask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .mpvue-picker-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    transform: translateY(100%);
    z-index: 3000;
  }
  .mpvue-picker-view-show {
    transform: translateY(0);
  }
  .mpvue-picker__hd {
    display: flex;
    padding: 9px 15px;
    background-color: #fff;
    position: relative;
    text-align: center;
    font-size: 17px;
  }
  .mpvue-picker__hd:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .mpvue-picker__action {
    display: block;
    flex: 1;
    color: #1aad19;
  }
  .mpvue-picker__action:first-child {
    text-align: left;
    color: #888;
  }
  .mpvue-picker__action:last-child {
    text-align: right;
  }
  .picker-item {
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
  }
  .mpvue-picker-view {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 238px;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
