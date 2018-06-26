import Vue from 'vue'
import Router from 'vue-router'
import Chat from '../pages/chat/index.vue'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Chat,
  }, {
    path: '/test',
    name: 'test',
    component: '../pages/test1.vue'
  }]
})
