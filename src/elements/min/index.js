// 小程序的组件通过此文件完成全局注册
import Vue from 'vue'

import XButton from '@/elements/min/x-button' // 按钮
import XPicker from '@/elements/min/x-picker' // 选择器

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)

const element = {
  XButton,
  XPicker
}

export default element
