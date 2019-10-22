export default {
  async getData (jsThis, widget) {
    // var option
    // if (jsThis.$api.client() === 'WapH5' || jsThis.$api.client() === 'WeChat') {
    //   option = jsThis.$route
    // } else {
    //   option = jsThis.option
    // }
    // var type = jsThis.$crud.getType(option)
    jsThis.para = {
      ...jsThis.para
    }
    jsThis.para.userId = jsThis.$user.id()
    // var response = await jsThis.$api.httpGet('/Api/Auto/List', jsThis.para)
    var response = await jsThis.$api.httpGet(widget.apiUrl, jsThis.para)
    if (response.status === 1) {
      if (jsThis.viewModel.length !== 0) {
        jsThis.viewModel = [
          ...jsThis.viewModel,
          ...response.result.result.result
        ]
      } else {
        if (response.result.result !== undefined) {
          jsThis.viewModel = response.result.result.result
        } else {
          jsThis.viewModel = response.result.apiDataList
        }
      }
      if (response.result.result !== undefined) {
        jsThis.newViewModel = response.result.result.result
        if (jsThis.newViewModel.length < 15) {
          jsThis.loadingTxt = '暂无更多数据...'
        }
      }
      // jsThis.viewModel = jsThis.convertTo(type, jsThis.viewModel)
      jsThis.data = response.result
      jsThis.title = jsThis.viewModel.name
      jsThis.async = true
    } else {
      jsThis.$api.toastWarn(response.message)
    }
  }
}
