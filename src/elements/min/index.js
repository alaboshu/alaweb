import Vue from 'vue'

import XButton from '@/element/min/x-button' // 按钮
import XPicker from '@/element/min/x-picker' // 选择器

Vue.component('x-button', XButton)
Vue.component('x-picker', XPicker)

const element = {
  XButton,
  XPicker
}

export default element
