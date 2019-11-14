export default {
  onLoad (option) {
    this.option = option
    console.info('aaaaaaaaaaaa', this.option)
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
        var color = data.tabbarForm.color ? data.tabbarForm.color : '#a2a2a2'
        var selectColor = data.tabbarForm.selectColor ? data.tabbarForm.selectColor : '#FF8C85'
        uni.setTabBarStyle({
          color: color,
          selectedColor: selectColor
        })
        if (data.tabbarForm.links) {
          data.tabbarForm.links.forEach((element, index) => {
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
