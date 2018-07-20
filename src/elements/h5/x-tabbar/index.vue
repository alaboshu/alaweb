<template>
  <div class="weui-tabbar" style="position:fixed">
    <slot />
  </div>
</template>

<script>
  export default ({
    name: 'x-tabbar',
    props: {
      props: {
        fixed: Boolean,
        default: true
      }
    }
  })
</script>

<style scoped lang="less">
</style>
