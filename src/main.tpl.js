import Vue from 'vue'
import store from '@/service/store/index'
import App from './App'
import api from '@/service/api.js'
import user from '@/service/user.js'
import base from '@/service/base.js'
import crud from '@/service/crud.js'
import weixin from '@/service/core/weixin'

// #ifdef H5
import '@/assets/style/h5/index.scss'
// #endif

/* #ifndef H5 */
import '@/assets/style/mp/index.scss'
// #endif

/* 5ug auto-import */
Vue.config.productionTip = false

// #ifdef H5
Vue.prototype.$client = 'WapH5'
// #endif

// #ifndef H5
Vue.prototype.$client = 'WeChatLite'
// #endif

Vue.directive('lazy', {
  inserted: el => {
    el.onerror = () => {
      el.src = 'http://retail_v13.api.5ug.com/wwwroot/static/images/nopic.jpg'
    }
  }
})




Vue.prototype.$api = api
Vue.prototype.$user = user
Vue.prototype.$base = base
Vue.prototype.$crud = crud
Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
weixin.login().then()
const app = new Vue({
  store,
  ...App
})
app.$mount()
