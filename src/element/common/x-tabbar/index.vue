<template>
  <div class="weui-tabbar" :style="{ position: fixed ? 'fixed' : 'absolute' }">
    <slot />
  </div>
</template>

<script>
  export default ({
    name: 'x-tabbar',
    props: {
      props: {
        fixed: Boolean
      }
    }
  })
</script>

<style scoped lang="less">
</style>
