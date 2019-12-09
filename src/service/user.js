// 接口说明
// isLogin() 判断是否登录
// id()
// userName()
// loginUser()
// toLogin()
// checkLogin()
// login()
// reg()
// loginOut()

import api from '@/service/api'
import helper from '@/service/core/helper'
import crypto from '@/utils/crypto'
import base from './base'
// import base from './base'

export default {
  // 登录
  async login (model) {
    if (model.username === '' || model.username === undefined) {
      uni.showToast({
        icon: 'none',
        title: '账号不能为空'
      })
      return
    }
    if (model.password === '' || model.password === undefined) {
      uni.showToast({
        icon: 'none',
        title: '密码不能为空'
      })
      return
    }
    if (model.username.length < 3) {
      uni.showToast({
        icon: 'none',
        title: '账号最短为 3 个字符'
      })
      return
    }
    if (model.password.length < 6) {
      uni.showToast({
        icon: 'none',
        title: '密码最短为六位数'
      })
      return
    }
    api.localRemove(this.userKey())
    if (api.localGet('wechat_openId') !== undefined) {
      model.openId = api.localGet('wechat_openId')
    }
    var response = await api.httpPost('Api/Member/Login', model)
    if (response.status === 1) {
      var userInfo = crypto.encrypt(
        JSON.stringify({
          userName: model.username,
          password: model.password
        })
      )
      api.localSet('user_info', userInfo)
      if (response.result !== undefined) {
        this.setUser(response.result)
        api.toastSuccess('登录成功')
        // window.location.href = '/pages/index'
        // this.$store.dispatch('UserLogin', loginUser.result)
        var openId = response.result.openId
        if (helper.length(openId) >= 12) {
          // api.localSet('wechat_openId', openId)
        }
        this.loginTo()
      }
    } else {
      api.toastWarn(response.message)
    }
    api.localRemove('wechat_logincount')
  },
  // 注册
  async reg (model) {
    if (!api.isEmpty(model.password) && model.password.length < 6) {
      uni.showToast({
        icon: 'none',
        title: '密码最短为六位数'
      })
    }
    if (api.localGet('wechat_openId') !== undefined) {
      model.openId = api.localGet('wechat_openId')
    }
    uni.showLoading({
      title: '加载中..'
    })
    var response = await api.httpPost('/Api/Member/Reg', model)
    if (response.status === 1) {
      api.toastSuccess('注册成功')
      this.setUser(response.result)
      uni.hideLoading()
      api.to('/pages/user/index')
    } else {
      api.toastWarn(response.message)
    }
  },
  // 退出登录
  async loginOut (warnMsg) {
    var msg = '确认退出登录？'
    if (!api.isEmpty(warnMsg)) {
      msg = warnMsg
    }
    var _this = this
    uni.showModal({
      title: '提示',
      showCancel: true,
      content: msg,
      success: function (res) {
        if (res.confirm) {
          uni.showLoading({
            title: '加载中..'
          })
          api.localRemove(_this.userKey())
          api.localRemove('default_address')
          api.vuexSet('loginUser', null)
          // this_.$api.localRemove('wechat_openId')
          var itemOut = setTimeout(() => {
            api.localRemove(_this.userKey())
            api.localRemove('default_address')
            api.vuexSet('loginUser', null)
            uni.hideLoading()
            clearTimeout(itemOut)
            if (api.client() === 'WapH5') {
              location.href = '/'
            } else {
              api.to('/', true)
            }
          }, 1500)
        }
      }
    })
  },
  // 是否登录
  isLogin () {
    var user = this.loginUser()
    if (api.isEmpty(user)) {
      return false
    } else {
      return true
    }
  },
  // 用户Id
  id () {
    var loginUser = this.loginUser()
    if (loginUser === undefined || loginUser === null) {
      return 0
    }
    return loginUser.id
  },
  // 用户名
  userName () {
    if (this.loginUser() === null) {
      return ''
    }
    return this.loginUser().userName
  },
  // 当前登录用户
  loginUser () {
    if (!api.isEmpty(api.vuexGet('loginUser'))) {
      return api.vuexGet('loginUser')
    } else {
      var user = api.localGet(this.userKey())
      if (!api.isEmpty(user)) {
        var loginUser = JSON.parse(
          crypto.decrypt(user, api.localGet('user_token'))
        )
        api.vuexSet('loginUser', loginUser)
      } else {
        return
      }
    }
    if (!api.isEmpty(user)) {
      // 对加密数据进行base64处理,
      // 将数据先base64还原，再转为utf8数据,再解密数据
      return JSON.parse(
        crypto.decrypt(
          crypto.utf8(crypto.base64(user)),
          api.localGet('user_token')
        )
      )
    }
    if (api.isEmpty(user)) {
      return null
    }
    return user
  },
  // 将用户信息写入缓存
  setUser (user) {
    if (api.isEmpty(user)) {
      api.toastWarn('用户登录失败')
      return null
    }
    if (api.isEmpty(user.token)) {
      api.toastWarn('用户登录失败')
      return null
    }
    if (user.token < 12) {
      api.toastWarn('用户登录失败')
      return null
    }
    var userToken
    userToken = user.token
    // api.localSet('user_token', user.token)
    uni.setStorageSync('user_token', user.token)
    api.vuexSet('loginUser', user)
    var userText = crypto.encrypt(JSON.stringify(user), userToken)
    uni.setStorageSync(this.userKey(), userText)
  },
  userKey () {
    return crypto.userKey()
  },
  // 跳转到登录页面
  toLogin () {
    api.toastWarn('请先登录')
    api.to('/user/login')
  },
  loginTo () {
    var userIndex = '/pages/user/index'
    var isApp = true
    if (this.isLogin()) {
      api.toastWarn('已成功登录')
      // 跳转到上一级页面
      if (getCurrentPages().length === 1) {
        // 如果直接进入登录页面，跳转到会员中心
        api.to(userIndex, isApp)
      } else {
        api.back()
      }
    }
  },
  // 检查是否需要登录，如果需要登录则跳转到登录页面，登录成功以后，返回到上一级页面
  checkLogin (option) {
    if (!this.isLogin()) {
      var usercode = option.usercode
      if (!api.isEmpty(usercode)) {
        // url 包含推荐码时跳转
        api.to('/pages/user/reg')
      }
      uni.showModal({
        title: '未登录',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            base.to('/user/login')
            // uni.navigateTo({
            //   url: '/pages/user/login'
            // })
          } else if (res.cancel) {
            uni.reLaunch({
              url: '/pages/tabbar/index'
            })
          }
        }
      })
    }
  },
  // 微信公众号登录
  weixinPublogin (data) {
    if (data !== undefined) {
      var session = data.session
      if (session !== undefined) {
        var openId = data.session.openid
        if (openId !== undefined) {
          api.localSet('wechat_openId', openId)
          // 登录
          if (data.user !== undefined) {
            // this.setUser(data.user)
            //  api.toastSuccess('登录成功')
            // api.log(data.user.username + '通过微信公众号号登录成功,openId' + openId)
          }
        }
      }
    }
  }
}
