import convert from './convert.js'
import api from '@/service/api'
import crud from '@/service/crud'
// 所有的表单数据只从api/auto/form中获取，api/auto/save保存,统一
export default {
  async getForm (type, widget, route) {
    var para = {}
    if (type) {
      para.type = type
    } else if (route) {
      para.type = crud.getType(route)
    }
    if (!type) {
      api.toastWarn('表单type不存在,请传入')
    }
    var id = route.id
    if (id) {
      para = {
        ...para,
        id: id
      }
    }
    var response = await api.httpGet('/Api/Auto/Form', para)
    if (response.status === 1) {
      var config = response.result
      api.info('服务器返回信息', response.result)
      var result = convert.toConfig(config)
      return result
    } else {
      api.toastWarn(response.message)
    }
  },
  // 视图数据赋值
  getModel (autoFormConfig) {
    var formModel = {}
    if (autoFormConfig && autoFormConfig.groups) {
      autoFormConfig.groups.forEach(group => {
        group.items.forEach(element => {
          if (!api.isEmpty(element.value)) {
            formModel[element.field] = element.value
          }
        })
      })
    }
    return formModel
  },
  async init (jsThis) {
    if (jsThis.autoForm.list) {
      jsThis.autoForm.list.forEach(element => {
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
  }
}
