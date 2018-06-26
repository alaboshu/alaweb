import Vue from 'vue'
import App from './App'
import wxService from './api/wxService'
import httpService from './api/httpService'

Vue.config.productionTip = false
App.mpType = 'app'
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

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/chat/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
