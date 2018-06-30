// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Toast from 'vue2-toast'
import 'vue2-toast/lib/toast.css'
import App from './App'
import router from '@/router'
import global from '@/service/core/global' // 公共函数,全局函数

import XHeader from '@/elements/common/x-header'
import XTabbar from '@/elements/common/x-tabbar'
import XTabbarItem from '@/elements/common/x-tabbar-item'
import XGrid from '@/elements/common/x-grid'
import XGridItem from '@/elements/common/x-grid-item'
import XCell from '@/elements/common/x-cell'
import XGroup from '@/elements/common/x-group'
import XSearch from '@/elements/common/x-search'
import XSwitch from '@/elements/common/x-switch'
import XPopup from '@/elements/common/x-popup'
import XDivider from '@/elements/common/x-divider'
import XNodata from '@/elements/common/x-nodata'
import XButton from '@/elements/common/x-button'
import XFrom from '@/elements/common/x-from'
import XIcon from '@/elements/common/x-icon'
import ZkGrid from '@/components/core/zk-grid/index.vue'

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
Vue.component('x-icon', XIcon)
Vue.component('zk-grid', ZkGrid)

Vue.use(global)
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
