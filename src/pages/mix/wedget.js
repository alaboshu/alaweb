import theme from '@/service/all/theme'
export default {
  onLoad (option) {
    this.option = option
    console.info('options', option)
  },
  methods: {
    async init () {
      this.viewModel = await this.$api.themePage(this.option)
      var response = await theme.getAllPageList()
      if (response) {
        this.getTabbar(response.theme.tabBarSetting)
      }
    },
    getTabbar (data) {
      if (data) {
        // 动态修改底部tabbar
        if (data.tabbarForm.links) {
          data.tabbarForm.links.forEach((element, index) => {
            console.info('element', element.imageGroup)
            uni.setTabBarItem({
              index: index,
              text: element.link.name,
              iconPath: `static/tabbar/${element.imageGroup.image}.png`,
              selectedIconPath: `static/tabbar/${element.imageGroup.selectImage}.png`
            })
          })
        }
      }
    }
  }
}
