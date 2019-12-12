export default {
  methods: {
    init () {
      if (this.swiperModel) {
        this.swiperModel.forEach(element => {
          if (element.isEnable) {
            this.swiperList.push(element)
          }
        })
      }
      this.swiperBgColor = this.swiperList[0].colors
    }
  }

}
