<template>
  <view> </view>
</template>

<script>
import pathJsonf from '../pages.json';
export default {
  data () {
    return {}
  },
  mounted () {
    uni.setTabBarItem({
      index: 0,
      text: 'text'
    })
    uni.setTabBarItem({
      index: 1,
      text: 'aaaa'
    })
    uni.setTabBarItem({
      idnex: 4,
      text: '为什么'
    })
    console.info('就是了', pathJsonf)
  },
  onTabItemTap (ev) {
    console.info('ev', ev)
  }
}
</script>
