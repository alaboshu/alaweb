import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

if (process.env.MODE === 'pc') {
  routes.push({ path: '/', redirect: '/views/index' })
} else {
  routes.push({ path: '/', redirect: '/pages/index' })
}

export default new Router({
  routes,
  mode: 'history'
})
