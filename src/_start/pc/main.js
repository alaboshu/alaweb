// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Toast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from '@/router'
import global from '@/service/core/global' // 公共函数,全局函数
import '@/service/core/rem'
import {
  api,
  apiUrl,
  config
} from '@/service/api'

Vue.use(global)
Vue.use(Toast)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$apiUrl = apiUrl
Vue.prototype.$url = config.url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
