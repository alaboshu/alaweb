<template>
  <span class="weui-badge" :class="{ 'weui-badge_dot': isDot }" :style="{ 'background-color': color }">
    <slot v-if="!isDot" />
  </span>
</template>

<script>
  export default {
    name: 'x-badge',

    props: {
      color: String,
      isDot: Boolean
    }
  }
</script>

<style scoped lang="less">
</style>
