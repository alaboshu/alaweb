<template>
  <view>这是首页</view>
  <!-- <x-widget :option="option" ref="xWidget"></x-widget> -->
</template>

<script>
export default {
  data () {
    return {
      option: {},
      viewModel: '',
      statusBarHeight: 0,
      isNotIosApp: true
    }
  },
  onLoad (option) {
    if (option.path !== undefined) {
      this.option = option
    } else {
      this.option = option[0]
    }
    if (this.$api.isEmpty(this.option.path)) {
      uni.reLaunch({
        url: '/pages/default'
      })
    }
  },
  onShow () {
    // if (this.$refs.xWidget !== undefined) {
    //   this.$refs.xWidget.$emit('xWidget', 'show')
    // }
  },
  onPageScroll (e) {
    // if (this.isNotIosApp === true) {
    //   if (e.scrollTop === 0) {
    //     this.$refs.xWidget.$emit('controlHead', true)
    //   } else if (e.scrollTop > 1) {
    //     this.$refs.xWidget.$emit('controlHead', false)
    //   } else if (e.scrollTop < 1) {
    //     this.$refs.xWidget.$emit('controlHead', 'negative')
    //   }
    // }
  },
  onPullDownRefresh () {
    this.$refs.xWidget.$emit('downRefresh')
    uni.stopPullDownRefresh()
    // _this.$refs.xWidget.notDownRefresh = true
    // setTimeout(() => {
    //   _this.$refs.xWidget.notDownRefresh = true
    // }, 1000)
  },
  async onReachBottom () {
    this.$bus.$emit('zkIndexTypeList')
    this.$bus.$emit('onBottomBurst', true)
    this.$bus.$emit('onBottom', true)
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
      this.$bus.$off('stopPullDownRefresh').$on('stopPullDownRefresh', () => {
        uni.stopPullDownRefresh()
      })
    })
  },
  methods: {
    init () {
      if (this.$api.client() === 'AppPlus') {
        this.statusBarHeight = this.$api.getSystemInfoSync().statusBarHeight
        if (this.$api.payType() === 3) {
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#c81432'
          })
          this.isNotIosApp = false
        }
      }
    }
  }
}
</script>
