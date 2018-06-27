import Vue from 'vue'
import App from './AppH5'
import router from './service/router'

import weui from './assets/style/h5/weui.less'
Vue.config.productionTip = false
Vue.use(weui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  }
})
