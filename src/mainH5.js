// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './AppH5'
import router from './router'
import wxService from './api/wxService'
import httpService from './api/httpService'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      service: '',
      router: '',
      imgSrc: ''
    }
  },
  created() {
    if (window) {
      console.log('chrome')
      this.service = httpService
      this.router = '/#'
      this.imgSrc = '../..'
    } else {
      console.log('wx')
      this.service = wxService
      this.imgSrc = '/static'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
})
