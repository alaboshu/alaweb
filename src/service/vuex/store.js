import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    stock: {
      code: '',
      name: ''
    },
    news: {
      title: '',
      auth: '',
      date: '',
      detail: ''
    }
  },
  mutations: {
    stockDetail (state, stock) {
      state.stock.code = stock.code.split('.')[0]
      state.stock.name = stock.name
      setStorage('code', stock.code.split('.')[0])
      setStorage('name', stock.name)
    },
    newsDetail (state, news, type) {
      state.news.title = news.title
      state.news.auth = news.auth
      state.news.date = news.dt
      state.news.detail = news.sum
      state.news.url = news.url
      state.news.type = type
    }
  }
})

function setStorage (key, value) {
  if (window) {
    window.localStorage.setItem(key, value)
  } else {
    wx.setStorage({
      key: key,
      data: value
    })
  }
}
export default store
