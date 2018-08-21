import Vue from 'vue'
import Router from 'vue-router'
import Common from './routers'
import local from '@/service/core/local'
Vue.use(Router)

const router = new Router({
  routes: [
    ...Common
  ],
  mode: 'history', // 路由模式
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  //  微信公众号登录
  // weixin.WechatLogin().then()
  window.document.title = to.meta.title
  var isLogin = local.hasValue('user')
  console.log('to', to)
  if (to.meta.login) {
    if (!isLogin) {
      //   helper.alertError('请先登录')
      return next({
        path: '/pages/user/login'
      })
    }
  }
  //  如果访问的是登陆页面或者注册页面，登陆成功后跳转到登陆会员中心
  if (
    isLogin &&
    (to.path === '/pages/user/login' ||
      to.path === '/pages/user/reg' ||
      to.path === '/user/findpassword')
  ) {
    //  helper.alertSucess('您已成功登陆')
    return next({
      path: '/pages/user/index'
    })
  }
  next()
})

router.afterEach((toRoute, fromRoute) => {
  //  const to = toRoute.path
  //  const h = sess.get(to)
  //  if (h && h.scrollTop >= 0) {
  //    Vue.nextTick(() => {
  //      window.scroll(0, h.scrollTop)
  //    })
  //  }
  //  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
