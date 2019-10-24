import api from '@/service/api'

export default {
  // 根据Url中的参数Id，获取视图
  // 使用动态 动态网址 Api/{{表名}}/ViewById
  async getView (intance, apiUrl) {
    var para = {
      id: intance.$route.query.id !== undefined ? intance.$route.query.id : 0
    }
    var response = await intance.$api.httpGet(apiUrl, para)
    if (response.status === 1) {
      return response.result
    }
  },
  // 从widget中获取数据
  async widget (intance, type, object) {
    var para = {
      type: type,
      json: JSON.stringify(object)
    }
    var response = await api.httpGet('/Api/Widget/Get', para)
    if (response.status !== 1) {
      intance.$api.toastWarn(response.message)
    } else {
      return response.result
    }
  },

  // 保存
  // 动态保存接口： Api/{{表名}}/QuerySave
  async save (intance, apiUrl, viewModel) {
    var para = {
      ...viewModel
    }
    var response = await intance.$api.httpPost(apiUrl, para)
    // 继续或返回上一页
    if (response.status === 1) {
      // intance.$confirm('保存成功 是否继续?', '提示', {
      //     confirmButtonText: '继续',
      //     cancelButtonText: '返回上一页',
      //     type: 'success'
      //   })
      //   .then(() => {
      //     intance.$bus.$emit('empty')
      //   })
      //   .catch(() => {
      //     window.history.back(-1)
      //   })
    }
  },
  // 将url参数解析为一个对象
  routeToObject (route) {
    if (api.client() === 'WapH5' || api.client() === 'WeChat') {
      var str = route.fullPath
      var index = str.indexOf('?', 0)
      str = str.substring(index + 1, str.length)
      var result = {}
      var temp = str.split('&')
      for (var i = 0; i < temp.length; i++) {
        var temp2 = temp[i].split('=')
        result[temp2[0]] = temp2[1]
      }
    } else {
      var result = {}
      for (var i in route) {
        result[i] = route[i]
      }
    }
    return result
  },
  // 根据路由获取类型
  getType (route) {
    if (route.query !== undefined && route.query.Type !== undefined) {
      return route.query.Type
    }
    if (route.query !== undefined && route.query.type !== undefined) {
      return route.query.type
    }
    if (route.query !== undefined && route.query.key !== undefined) {
      return route.query.key
    }
    if (route.query !== undefined && route.query.Key !== undefined) {
      return route.query.Key
    }
    if (route.meta !== undefined && route.meta.type !== undefined) {
      return route.meta.type
    }
  },
  // 获取URL中的ID
  id (route) {
    if (route.query !== undefined && route.query.id !== undefined) {
      return route.query.id
    } else {
      return 0
    }
  },
  // 提示，成功提示正确信息，获取显示错误信息
  message (response) {
    if (response.status === 1) {
      api.to('/pages/message')
    } else {
      api.to('/pages/message')
    }
  }
}
