// // 常用帮助函数
// 'use strict'
// import store from 'src/store/index'
// // import weui from 'weui.js'
// export default {
//   // 操作成功提示函数
//   alertSucess (data) {
//     // weui.toast(data, 3000)
//     //  alert(data)
//   },
//   // 操作失败提示函数
//   alertError (data) {
//     //  weui.toast(data, 3000)
//     //  alert(data)
//   },
//   // 判断用户是否登录，如果没有登陆则跳转到登录页面，或者不执行操作
//   checkLogin (isPush = false) {
//     var loginUser = store.state.userStore.loginUser
//     if (loginUser === null) {
//       if (isPush === true) {
//         // alert('请先登录')
//         // weui.toast('请先登录', 3000)
//         location.href = '/user/login'
//       }
//       return false
//     }
//     return true
//   },
//   // 判断字符串是否为空或null,undefined
//   isNullOrEmpty (str) {
//     if (str === undefined) {
//       return true
//     }
//     if (str === null) {
//       return true
//     }
//     if (str === 'null') {
//       return true
//     }
//     if (str === 'undefined') {
//       return true
//     }
//     if (str === '') {
//       return true
//     }
//     var regu = '^[ ]+$'
//     var re = new RegExp(regu)
//     return re.test(str)
//   },
//   // 判断字符串长度
//   length (str) {
//     if (this.isNullOrEmpty(str)) {
//       return 0
//     } else {
//       try {
//         var len = str.length
//         return len
//       } catch (err) {
//         console.info(err)
//         return 0
//       }
//     }
//   }
// }
