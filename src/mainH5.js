// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './AppH5'
// import router from './router'
// import wxService from './js/api/wxService'
// import httpService from './js/api/httpService'
// import weui from './assets/weui/weui.less'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  }
})
