// 封装下拉刷新,无限加载

export default ({
  getPage,
  list = 'list',
  page = 'page',
  isNot = 'isNot'
}) => {
  return {
    data () {
      return {
        [list]: [],
        [page]: 1,
        [isNot]: false
      }
    },
    onPullDownRefresh () {
      this.Refresh()
    },
    onReachBottom () {
      getPage.call(this, this[page], this.__pulldone)
    },
    mounted () {
      this.Refresh()
    },
    methods: {
      Refresh () {
        this[page] = 1
        getPage.call(this, this[page], this.__pulldone)
      },
      __pulldone (data) {
        var db = data || []
        if (this[page] === 1) {
          this[list] = db
        } else {
          this[list] = (this[list] || []).concat(db)
        }
        uni.stopPullDownRefresh()
        this[page]++
      }
    }
  }
}
