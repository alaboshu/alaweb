import theme from '@/service/all/theme'
export default {
  onLoad (option) {
    this.option = option
    console.info('options', option)
  },
  methods: {
    async init () {
      this.viewModel = await this.$api.themePage(this.option)
      console.info('this.viewMode;l', this.viewModel)
    }
  }
}
