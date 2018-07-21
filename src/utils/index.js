import Vue from 'vue'
import create from './create'
import { setTitle } from './title'
import { getTouch } from './touches'

const isServer = Vue.prototype.$isServer

export {
  isServer,
  create,
  setTitle,
  getTouch
}
