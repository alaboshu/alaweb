import Vue from 'vue'
import create from './create'
import { getTouch } from './touches'

const isServer = Vue.prototype.$isServer

export {
  isServer,
  create,
  getTouch
}
