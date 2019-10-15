import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    user: '',
    phoneVerification: null,
    showPrice: false,
    getSystemInfoSync: null,
    inDefault: 0
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.hasLogin = true
    },
    logout (state) {
      state.user = ''
      state.hasLogin = false
    }
  }
})

export default store
