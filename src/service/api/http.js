// 'use strict'

// import axios from 'axios'
// import store from 'src/store/index'
// import helper from 'src/service/common/helper'
// // import qs from 'qs'
// import {
//   baseUrl,
//   key,
//   projectId
// } from 'src/service/config/env'
// import {
//   md5
// } from 'zkui' // md5 函数
// const timestamp = Math.round(new Date().getTime() / 1000)

// axios.interceptors.request.use(
//   config => {
//     //  loading
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     return Promise.resolve(error.response)
//   }
// )

// function getSign (url) {
//   var sign =
//     timestamp +
//     url.toLowerCase() +
//     key +
//     projectId +
//     document.domain.toLowerCase()
//   // console.info('sign', sign)
//   return md5(sign)
// }

// function checkStatus (response) {
//   // console.dir(response)
//   //  loading
//   //  如果http状态码正常，则直接返回数据
//   if (
//     response &&
//     (response.status === 200 ||
//       response.status === 304 ||
//       response.status === 400)
//   ) {
//     //  if(response.data.status !== 1){
//     //    helper.alertError("授权失败:" + response.data.message)
//     //  }
//     return response
//     //  如果不需要除了data之外的数据，可以直接 return response.data
//   }
//   //  异常状态下，把错误信息返回去
//   helper.alertError('网络异常' + response.status)
//   return {
//     status: -404,
//     msg: '网络异常'
//   }
// }

// export default {
//   // post数据接口，一般用于数据增加 对应增删改查 中的增加
//   post (url, data) {
//     let apiUrl = url
//     axios.default.timeout = 10000
//     axios.defaults.headers.post['Content-Type'] = 'application/json'
//     const instance = axios.create()
//     instance.defaults.headers.post['Content-Type'] = 'application/json'
//     instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var sign = getSign(url)
//     url = baseUrl + '/api/' + url
//     url = url + '?sign=' + sign + '&timestamp=' + timestamp

//     var result = instance.post(url, data).then(response => {
//       return checkStatus(response)
//     })
//     console.info(result, 'post接口:' + apiUrl, 'URL:' + url)
//     return result
//   },
//   // post数据接口，一般用于数据增加 对应增删改查 中的增加 , 需要用户登录才能够操作
//   postLogin (url, data) {
//     let apiUrl = url
//     var loginUser = store.state.userStore.loginUser
//     if (loginUser === null) {
//       helper.alertError('您未登陆')
//       return
//     }
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var userId = loginUser.id
//     var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
//     token = md5(token)
//     axios.default.timeout = 10000
//     axios.defaults.headers.post['Content-Type'] = 'application/json'
//     const instance = axios.create()
//     instance.defaults.headers.post['Content-Type'] = 'application/json'
//     var sign = getSign(url)
//     url = baseUrl + '/api/' + url

//     var loginUserId = userId
//     url =
//       url +
//       '?sign=' +
//       sign +
//       '&timestamp=' +
//       timestamp +
//       '&token=' +
//       token +
//       '&loginuserid=' +
//       userId
//     data = {
//       ...data,
//       loginUserId
//     }
//     var result = instance.post(url, data).then(response => {
//       return checkStatus(response)
//     })
//     console.info(result, 'postLogin接口:' + apiUrl, 'URL:' + url)
//     return result
//   },
//   // get数据接口，一般用于数据获取 对应增删改查 中的查 , 需要用户登录才能够操作
//   getLogin (url, params) {
//     var loginUser = store.state.userStore.loginUser
//     if (loginUser === null) {
//       // helper.alertError('您未登陆')
//       return
//     }
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var loginuserid = loginUser.id
//     var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
//     // console.info('前台taoken', token)
//     token = md5(token)
//     params = {
//       ...params,
//       token,
//       loginuserid
//     }
//     return this.get(url, params)
//   },

//   // get数据接口，一般用于数据获取 对应增删改查 中的查
//   get (url, params) {
//     // let apiUrl = url
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var sign = getSign(url)
//     params = {
//       ...params,
//       sign,
//       timestamp
//     }
//     var result = axios({
//       method: 'get',
//       baseURL: baseUrl + '/api/',
//       url,
//       params, // get 请求时带的参数
//       timeout: 10000,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Access-Control-Allow-Origin': '*'
//       }
//     }).then(response => {
//       return checkStatus(response)
//     })
//     // console.info(result, 'URL:' + baseUrl + '/api/' + url)
//     return result
//   },

//   // put数据接口，一般用于数据更新 对应增删改查 中的改
//   put (url, data) {
//     let apiUrl = url
//     axios.default.timeout = 10000
//     axios.defaults.headers.post['Content-Type'] = 'application/json'
//     const instance = axios.create()
//     instance.defaults.headers.post['Content-Type'] = 'application/json'
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var sign = getSign(url)
//     url = baseUrl + '/api/' + url
//     url = url + '?sign=' + sign + '&timestamp=' + timestamp
//     console.dir(data)
//     var result = instance.put(url, data).then(response => {
//       return checkStatus(response)
//     })
//     console.info(result, 'put接口:' + apiUrl, 'URL:' + url)
//     return result
//   },

//   // put数据接口，一般用户数据更新，对应增删改查 中的改 . 需要会员登录才可以操作
//   putLogin (url, data) {
//     var loginUser = store.state.userStore.loginUser
//     if (loginUser === null) {
//       // helper.alertError('您未登陆')
//       return
//     }
//     var userId = loginUser.id
//     var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
//     token = md5(token)

//     let apiUrl = url
//     axios.default.timeout = 10000
//     axios.defaults.headers.post['Content-Type'] = 'application/json'
//     const instance = axios.create()
//     instance.defaults.headers.post['Content-Type'] = 'application/json'
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var sign = getSign(url)
//     url = baseUrl + '/api/' + url

//     url =
//       url +
//       '?sign=' +
//       sign +
//       '&timestamp=' +
//       timestamp +
//       '&token=' +
//       token +
//       '&loginuserid=' +
//       userId
//     var loginuserid = loginUser.id
//     data = {
//       ...data,
//       loginuserid
//     }
//     var result = instance.put(url, data).then(response => {
//       return checkStatus(response)
//     })
//     console.info(result, 'putLogin接口:' + apiUrl, 'URL:' + url)
//     return result
//   },
//   // delete数据接口，一般用于数据删除 对应增删改查 中的删
//   delete (url, params) {
//     let apiUrl = url
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var sign = getSign(url)
//     params = {
//       ...params,
//       sign,
//       timestamp
//     }
//     var result = axios({
//       method: 'delete',
//       baseURL: baseUrl + '/api/',
//       url,
//       params, // get 请求时带的参数
//       timeout: 10000,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest'
//       }
//     }).then(response => {
//       return checkStatus(response)
//     })
//     console.info(
//       result,
//       'delete接口:' + apiUrl,
//       'URL:' + baseUrl + '/api/' + url
//     )
//     return result
//   },
//   // delete数据接口，一般用于数据删除 对应增删改查 中的删 , 需要用户登录才能够操作
//   deleteLogin (url, params) {
//     var loginUser = store.state.userStore.loginUser
//     if (loginUser === null) {
//       // helper.alertError('您未登陆')
//       return
//     }
//     if (url.substring(0, 1) !== '/') {
//       url = '/' + url
//     }
//     var loginuserid = loginUser.id
//     var token = url.toLowerCase() + timestamp + loginUser.userName.toLowerCase()
//     token = md5(token)
//     params = {
//       ...params,
//       token,
//       loginuserid
//     }
//     return this.delete(url, params)
//   }
// }
