import api from '@/service/api'
export default {
  async getData (widget, parmenter) {
    var widgetModel = await api.isApiReqGet(widget, parmenter)
    return widgetModel
  },
  async scrolltolower (widget, parmenter, viewModel) {
    var response = await this.getData(widget, parmenter)
    if (viewModel.length === 0) {
      viewModel = response.productItems
    } else {
      viewModel = [...viewModel, ...response.productItems]
    }
    return viewModel
  }
}
