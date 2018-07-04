/**
 * add vue-router support
 */
export default {
  props: {
    url: String,
    replace: Boolean,
    to: [String, Object]
  },

  methods: {
    routerLink () {
      const {
        to,
        url,
        $router,
        replace
      } = this
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (url) {
        replace ? this.location.replace(url) : this.location.href = url
      }
      console.log('to' + to)
      console.log('url' + url)
      console.log('$router' + $router)
      console.log('$replace' + replace)
    }
  }
}
