<template>
  <router-link class="weui-tabbar__item" :class="{ 'weui-bar__item_on': isOn }" :to="to">
    <slot name="icon" />
    <p class="weui-tabbar__label">
      <slot />
    </p>
  </router-link>
</template>

<script>
  export default ({
    name: 'x-tabbar-item',
    props: {
      isOn: Boolean,
      to: {
        type: String,
        default: '/'
      }
    }
  })
</script>

<style scoped lang="less">
  .weui-tabbar__item {
    text-decoration: none;
  }
  .weui-tabbar__item:visited {
    color: #2c3e50;
  }
  .weui-tabbar {
    height: 53px;
    .weui-tabbar__label {
      margin: 0;
    }
  }
</style>
