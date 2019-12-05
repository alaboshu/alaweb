export default {
  setTabbar (jsThis, viewModel) {
    if (viewModel.name) {
      uni.setNavigationBarTitle({
        title: viewModel.name
      })
    }
    if (viewModel.setting.background) {
      // uni.setNavigationBarColor({
      //   frontColor: '#ffffff',
      //   backgroundColor: viewModel.setting.background
      // })
    }
  }
}
