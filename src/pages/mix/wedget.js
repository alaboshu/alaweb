export default {
  onLoad (option) {
    this.option = option
    console.info('options', option)
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.info('哈哈哈')
    }
  }
}
