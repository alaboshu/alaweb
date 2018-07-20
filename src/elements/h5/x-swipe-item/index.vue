<template>
  <div class="wv-swipe-item" :style="style">
    <slot />
  </div>
</template>

<script>
// import { create } from '../../utils'

export default {
  name: 'wv-swipe-item',
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    style () {
      return {
        width: this.$parent.width + 'px',
        transform: `translate3d(${this.offset}px, 0, 0)`
      }
    }
  },

  beforeCreate () {
    this.$parent && this.$parent.swipes.push(this)
  },

  destroyed () {
    this.$parent && this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1)
  }
}
</script>

<style scoped lang="less">
  .wv-swipe-item {
    float: left;
    height: 100%;
  }
</style>
