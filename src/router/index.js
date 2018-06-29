import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  routes: routes.map(route => {
    // 若多级目录嵌套，可通过 paths.length 判断后做不同处理
    const paths = route.path.replace(/^\//, '').split('/')
    if (paths.length === 2) {
      route.component = () => import(`@/${paths[0]}/${paths[1]}`)
    } else {
      route.component = () => import(`@/${paths[0]}/${paths[1]}/${paths[2]}`)
    }
    return route
  }),
  mode: 'history'
})
