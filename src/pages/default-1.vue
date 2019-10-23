<template>
  <view>
    <zk-boot-up v-if="showBootUp" @showDefault="showDefault"></zk-boot-up>
    <view style=" background: #f2f2f2;width:100%;overflow: hidden" v-if="!showBootUp">
      <zk-index-swiper ref="zkIndexSwiper" v-if="showIndexSwiper===false" @newPath="newPath"></zk-index-swiper>
      <x-widget :option="option" ref="xWidget"></x-widget>
    </view>
  </view>

</template>

<script>
  import config from '@/service/config.js'
  export default {
    data () {
      return {
        async: false,
        option: {},
        viewModel: '',
        showIndexSwiper: false,
        showBootUp: false
      }
    },
    onLoad (option) {
      this.option = option
      if (this.$api.client() === 'AppPlus' && this.$api.localGet('isFirstEntry') === undefined) {
        this.$api.localSet('isFirstEntry', true)
        this.showBootUp = true
        uni.hideTabBar()
      }
    },
    onShow () {
      if (this.$user.loginUser() === null) {
        this.$store.state.showPrice = false
      } else {
        if (this.$user.loginUser().gradeName !== '免费会员') {
          this.$store.state.showPrice = true
        } else {
          this.$store.state.showPrice = false
        }
      }
    },
    mounted () {
      this.$api.historys('/')
      if (config.themeId === '5cc1bfbe23eb301328298b41' || config.themeId === '5d26e11a064c25053c9b3def') {
        this.showIndexSwiper = true
      }
      // this.async = true
    },
    methods: {
      newPath (viewModel) {
        this.$refs.xWidget.$emit('newPath', viewModel)
      },
      showDefault () {
        this.showBootUp = false
      }
    },
    onPullDownRefresh () {
      uni.stopPullDownRefresh()
    },
    async onReachBottom () {
      this.$bus.$emit('zkIndexTypeLists')
      this.$bus.$emit('zkIndexTypeList')
      this.$bus.$emit('onBottomBurst', true)
      this.$bus.$emit('onBottom', true)
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/style/variable.scss";
  .zk-head-statusbar-deafult {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    background: #dcd3cf;
  }
</style>

