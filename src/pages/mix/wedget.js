import theme from '@/service/all/theme'
export default {
  methods: {
    async init () {
      var response = await theme.getAllPageList()
      if (response) {
        this.getTabbar(response.theme.tabBarSetting)
      }
    },
    getTabbar (data) {
      if (data) {
        // 动态修改底部tabbar
        var color = data.tabbarForm && data.tabbarForm.color ? data.tabbarForm.color : '#a2a2a2'
        var selectColor = data.tabbarForm && data.tabbarForm.selectColor ? data.tabbarForm.selectColor : '#FF8C85'
        uni.setTabBarStyle({
          color: color,
          selectedColor: selectColor
        })
        if (data.tabbarForm && data.tabbarForm.links) {
          data.tabbarForm.links.forEach((element, index) => {
            // static/tabbar/${element.imageGroup.image}.png
            uni.setTabBarItem({
              index: index,
              text: element.link.name,
              iconPath: `static/tabbar/${element.imageGroup.image}.webp`,
              selectedIconPath: `static/tabbar/${element.imageGroup.selectImage}.webp`
            })
          })
        }
      }
    }
  }
}
