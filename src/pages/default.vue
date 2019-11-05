<template>
  <view>为什么不显示啊 </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    uni.setTabBarItem({
      index: 0,
      text: 'text'
    })
  },
  onTabItemTap (ev) {
    console.info('ev', ev)
  }
}
</script>
