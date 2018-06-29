<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{ color: titleColor }" v-html="title" />
    <div class="weui-cells">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-group',
    props: {
      title: String,
      titleColor: String
    }
  }
</script>
<style lang="less">
</style>
