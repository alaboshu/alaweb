import globalConfig from '@/service/config'
import api from '@/service/api'
import base from '@/service/base'
import user from '../user'
export default {
  async page (option) {
    var path = base.path(option)
    var pageInfo = await this.getPageInfo(path)
    var widgets = []
    if (pageInfo !== undefined && pageInfo !== null && pageInfo.widgets) {
      for (var i = 0; i < pageInfo.widgets.length; i++) {
        var widgetItem = pageInfo.widgets[i]
        widgetItem.route = option
        widgets.push(widgetItem)
      }
      pageInfo.widgets = widgets
    }
    pageInfo = this.filerPageInfo(pageInfo)
    return pageInfo
  },

  // 过滤页面信息
  filerPageInfo (pageInfo) {
    if (pageInfo) {
      pageInfo.widgets = this.filterWidgets(pageInfo.widgets)
      var setting = pageInfo.setting
      // 登录信息判断
      if (setting.isLogin !== false) {
        if (!user.isLogin()) {
          user.checkLogin(setting.isLogin)
          return false
        } else {
          user.checkLogin(setting.isLogin)
        }
      }
      return pageInfo
    }
  },

  // 模块信息
  async widget (widget) {
    var parameter = {
      apiUrl: '',
      value: null
    }
    if (widget !== null && widget !== undefined) {
      parameter.apiUrl = widget.apiUrl
      parameter.value = widget.value
    }
    return parameter
  },
  // 处理widgets
  filterWidgets (widgets) {
    if (widgets === null) {
      return null
    }
    widgets.forEach(element => {
      element.border = null
      element.borderClass = null
      if (!api.isEmpty(element.style)) {
        if (!api.isEmpty(element.style.border)) {
          var styleBorder = JSON.parse(element.style.border)
          element.border = styleBorder
          element.borderClass = 'widget_border ' + styleBorder.name + ' '
          if (!api.isEmpty(styleBorder.colorName)) {
            element.borderClass += styleBorder.colorName + ' '
          }
        }
      }
      if (api.isEmpty(element.layout)) {
        element.layout = null
      } else {
        if (!api.isEmpty(element.value)) {
          var layout = JSON.parse(element.value)
          if (!api.isEmpty(layout.options)) {
            element.options = JSON.parse(layout.options)
          }
          element.options = JSON.parse(layout.options)
          element.columns = layout.columns
          if (!api.isEmpty(element.columns)) {
            element.columns.forEach(col => {
              col.option = JSON.parse(col.option)
              col.widgets = this.filterWidgets(col.widgets)
            })
          } else {
            element.columns = []
          }
          element.value = null
        }
      }
      if (element.value !== null) {
        try {
          element.value = JSON.parse(element.value)
        } catch (err) {}
      }
    })
    return widgets
  },
  // 当前访问的页面
  async getPageInfo (path) {
    var allPageInfo = await this.getAllPageList()
    var findPageInfo = null
    if (allPageInfo !== undefined && allPageInfo != null) {
      for (var i = 0; i < allPageInfo.pageList.length; i++) {
        var element = allPageInfo.pageList[i]
        if (element.path === path) {
          findPageInfo = element
          break
        }
      }
    }
    return findPageInfo
  },
  // 所有页面
  async getAllPageList () {
    var para = {
      clientType: 'WapH5',
      path: '/index'
    }
    var allPageCacheKey = 'allPageInfo_' + globalConfig.version
    var allPageInfo = api.localGet(allPageCacheKey)
    var isRequest = true // 是否请求
    if (!api.isEmpty(allPageInfo)) {
      let timestamp = Math.round(new Date().getTime() / 1000)
      if (allPageInfo.lastUpdate > timestamp) {
        isRequest = false
      }
    }
    if (isRequest) {
      var response = await api.httpGet('Api/Theme/GetAllClientPages', para)
      allPageInfo = response.result
      api.vuexSet(allPageCacheKey, allPageInfo)
      api.localSet(allPageCacheKey, allPageInfo)
    }
    return allPageInfo
  }
}
