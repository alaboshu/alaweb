import convert from './convert.js'
import api from '@/service/api'
// 重要重要非常非常重要提示，次页面不要通过URl来做判断
export default {
  async init (jsThis) {
    var option
    if (api.client() === 'WapH5' || api.client() === 'WeChat') {
      option = jsThis.$route
    } else {
      option = jsThis.widget.route
    }
    if (jsThis.widget && jsThis.widget.key) {
      // 通过手动传进来
      jsThis.type = jsThis.widget.key
      jsThis.widget.apiUrl = ''
      var config = await this.getFromByType(jsThis)
      jsThis.config = await convert.toConfig(config, jsThis.widget)
    } else {
      var type = jsThis.$crud.getType(option)
      if (type !== null) {
        jsThis.apiUrl = jsThis.widget.apiUrl
        jsThis.type = type
        var config = await this.getFromByType(jsThis)
        jsThis.config = await convert.toConfig(config, jsThis.widget)
      } else if (
        jsThis.widget.apiUrl &&
        jsThis.widget.apiUrl.indexOf('Type') !== -1
      ) {
        jsThis.type = jsThis.widget.apiUrl.substring(
          jsThis.widget.apiUrl.indexOf('Type') + 5
        )
        var config = await this.getFromByType(jsThis, true)
        jsThis.config = await convert.toConfig(config, jsThis.widget)
      } else {
        // 通过diy获取自动表单信息，表单信息直接从diy系统中返回
        jsThis.config = jsThis.widget.value
      }
    }

    if (jsThis.config === undefined || jsThis.config === null) {
      api.toastWarn('表单配置不存在')
    }
    if (jsThis.config.list) {
      jsThis.config.list.forEach(element => {
        if (element.type === 'tab') {
          element.columns.forEach(columns => {
            columns.list.forEach(list => {
              jsThis.formModel[list.model] = list.value
            })
          })
        } else {
          if (api.isEmpty(element.value)) {
            jsThis.formModel[element.model] = ''
          } else {
            jsThis.formModel[element.model] = element.value
          }
        }
      })
    }
    this.beforeInitForm(jsThis)
    console.log('  jsThis.formModel', jsThis.formModel)
  },
  // 根据type来获取表单信息，成功和失败状态会不一样
  async getFromByType (jsThis, isApiUrl) {
    var response
    var para = {}
    if (isApiUrl) {
      var id = jsThis.widget.route.id
      if (id !== undefined) {
        response = await api.httpGet(jsThis.widget.apiUrl + '&id=' + id, para)
      } else {
        response = await api.httpGet(jsThis.widget.apiUrl, para)
        console.info('服务器表单信息', response.result)
      }
    } else {
      para.type = jsThis.type
      console.info('配置信息', para.type)
      response = await api.httpGet('/Api/Auto/Form', para)
      console.info('服务器表单信息', response.result)
    }
    if (response.status === 1) {
      jsThis.key = response.result.key
      return response.result
    } else {
      api.toastWarn(response.message)
    }
  },
  // 重要重要非常非常重要提示，
  async save (jsThis) {
    console.log('jsThis.formModel', jsThis.formModel)
    var apiUrl = '/api/auto/save'
    if (jsThis.type === null) {
      apiUrl = jsThis.widget.apiUrl
    }
    // 登录单独处理
    if (apiUrl.indexOf('/user/login') !== -1) {
      await jsThis.$user.login(jsThis.formModel)
      jsThis.$bus.$emit('pages_loginUser') // 此代码后期需删掉
    } else if (apiUrl.indexOf('/user/reg') !== -1) {
      await jsThis.$user.reg(jsThis.formModel)
    } else {
      // 安全设置处理
      if (apiUrl.indexOf('/api/user/changepassword') !== -1) {
        jsThis.formModel.userId = jsThis.$user.loginUser().id
        if (jsThis.widget.route.path === 'user_password_login') {
          jsThis.formModel.type = 1
        }
        if (jsThis.widget.route.path === 'user_password_safe') {
          jsThis.formModel.type = 2
        }
      }
      if (!api.isEmpty(jsThis.$user.loginUser())) {
        jsThis.formModel.userId = jsThis.$user.loginUser().id
      }
      if (!api.isEmpty(jsThis.widget.route.id)) {
        jsThis.formModel.id = jsThis.widget.route.id
      }
      if (jsThis.type === null) {
      }
      var para = {
        ...jsThis.formModel
        // type: jsThis.type
      }
      if (jsThis.type !== null) {
        para = {
          type: jsThis.type,
          key: jsThis.key,
          model: JSON.stringify(jsThis.formModel)
        }
        if (jsThis.$user.isLogin()) {
          para = {
            ...para,
            userId: jsThis.$user.id()
          }
        }
      }
      var response = await api.httpPost(apiUrl, para)
      console.info('服务器表单信息', response.result)
      if (response === undefined || response.status !== 1) {
        api.toastWarn(response.message)
      } else {
        if (apiUrl.indexOf('/api/user/changepassword') !== -1) {
          if (response.status !== 1) return
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/index?path=user_password_index'
            })
          }, 500)
        }
        // 忘记密码处理
        if (apiUrl.indexOf('/api/user/findpassword') !== -1) {
          api.toastSuccess(response.message)
          setTimeout(() => {
            if (response.status === 1) {
              uni.redirectTo({
                url: '/pages/user/login'
              })
            }
          }, 1000)
          return null
        }
        api.toastSuccess(response.message)
        jsThis.operationTips = true
        // jsThis.$bus.$emit('strikeView')
        // var time = setTimeout(() => {
        //   clearTimeout(time)
        //   api.back()
        // }, 1000)
      }
    }
  },
  // 表单渲染前操作
  async beforeInitForm (jsThis) {
    if (
      jsThis.$user.isLogin() &&
      jsThis.widget &&
      jsThis.widget.apiUrl.indexOf('/user/login') !== -1
    ) {
      uni.reLaunch({
        url: '/pages/tabbar/user_index'
      })
      jsThis.async = false
    }
    if (jsThis.widget && jsThis.widget.apiUrl.indexOf('/user/reg') !== -1) {
      if (!api.isEmpty(jsThis.widget.route.usercode)) {
        jsThis.formModel.code = jsThis.widget.route.usercode
      }
    }
    if (jsThis.widget && jsThis.widget.apiUrl.indexOf('/user/login') !== -1) {
      jsThis.loginPage = true
      // if (!api.isEmpty(await api.localGet('user_info'))) {
      //   var userInfo = JSON.parse(
      //     crypto.decrypt(
      //       crypto.utf8(crypto.base64(await api.localGet('user_info')))
      //     )
      //   )
      //   jsThis.formModel.username = userInfo.userName
      //   jsThis.formModel.password = userInfo.password
      // }
    }
    if (api.client() === 'WapH5' || api.client() === 'WeChat') {
      if (jsThis.widget && jsThis.widget.apiUrl.indexOf('/user/login') !== -1) {
        jsThis.returnButtom = true
      }
    }
    jsThis.async = true
  }
}
