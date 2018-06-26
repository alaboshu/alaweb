import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../pages/chat/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Chat
    },
    {
      path: '/test',
      meta: {
        title: '会员中心',
        login: true
      },
      name: 'default',
      component: function(resolve) {
        require(['../pages/test1.vue'], resolve)
      }
    }
  ]
})
