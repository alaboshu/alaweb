import Vue from 'vue'
import App from './AppH5'
import router from './service/router'
import weui from './assets/style/h5/weui.less'

import XHeader from '@/element/common/x-header'
import XTabbar from '@/element/common/x-tabbar'
import XTabbarItem from '@/element/common/x-tabbar-item'
import XGrid from '@/element/common/x-grid'
import XGridItem from '@/element/common/x-grid-item'
import XCell from '@/element/common/x-cell'
import XGroup from '@/element/common/x-group'
import XSearch from '@/element/common/x-search'
import XSwitch from '@/element/common/x-switch'
import XPopup from '@/element/common/x-popup'
import XDivider from '@/element/common/x-divider'
import XNodata from '@/element/common/x-nodata'
import XButton from '@/element/common/x-button'
import XFrom from '@/element/common/x-from'

Vue.component('x-header', XHeader)
Vue.component('x-tabbar', XTabbar)
Vue.component('x-tabbar-item', XTabbarItem)
Vue.component('x-grid', XGrid)
Vue.component('x-grid-item', XGridItem)
Vue.component('x-cell', XCell)
Vue.component('x-group', XGroup)
Vue.component('x-search', XSearch)
Vue.component('x-switch', XSwitch)
Vue.component('x-popup', XPopup)
Vue.component('x-divider', XDivider)
Vue.component('x-nodata', XNodata)
Vue.component('x-button', XButton)
Vue.component('x-from', XFrom)

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
